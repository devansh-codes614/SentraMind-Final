const express = require("express");
const Thread = require("../models/thread");
const Mood = require("../models/mood");
const Sleep = require("../models/sleep");
const Data = require("../models/data");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });

    const moods = await Mood.find({})
      .sort({ createdAt: -1 })
      .limit(7);

    const latestMood = await Mood.findOne().sort({ createdAt: -1 });

    const latestSleep = await Sleep.findOne().sort({ createdAt: -1 });

    const posts = await Data.find({})
      .sort({ _id: -1 })
      .limit(10);

    // =========================
    // TOTAL JOURNAL ENTRIES
    // =========================
    const totalThreads = threads.length;
    const totalPosts = posts.length;

    // =========================
    // RECENT REFLECTIONS
    // =========================
    const recentReflections = [
      ...threads.map((t) => t.title || "Untitled reflection"),
      ...posts.map((p) => p.text || "Untitled post"),
    ].slice(0, 5);

    // =========================
    // SENTIMENT SCORE MAP
    // =========================
    const sentimentMap = {
      great: 95,
      happy: 88,
      excited: 90,
      good: 78,
      calm: 80,
      okay: 58,
      neutral: 50,
      tired: 42,
      low: 35,
      anxious: 28,
      stressed: 22,
      sad: 20,
      "very sad": 10,
    };

    // =========================
    // WEEKLY MOOD TREND
    // =========================
    let weeklyMood = [];

    if (moods.length > 0) {
      weeklyMood = moods.reverse().map((m) => ({
        day: new Date(m.createdAt).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        mood: m.score || 50,
      }));
    } else if (posts.length > 0) {
      weeklyMood = posts
        .slice(0, 7)
        .reverse()
        .map((p, index) => ({
          day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index],
          mood: sentimentMap[p.sentiment?.toLowerCase()] || 50,
        }));
    }

    // =========================
    // TODAY MOOD
    // =========================
    const latestPost = posts[0];

    const todayMood =
      latestMood?.mood ||
      latestPost?.sentiment ||
      "Balanced";

    // =========================
    // FINAL MOOD SCORE
    // =========================
    const finalMoodScore =
      latestMood?.score ||
      sentimentMap[latestPost?.sentiment?.toLowerCase()] ||
      50;

    // =========================
    // STRESS LEVEL
    // =========================
    let stressLevel = "Medium";

    if (finalMoodScore >= 75) {
      stressLevel = "Low";
    } else if (finalMoodScore <= 40) {
      stressLevel = "High";
    }

    // =========================
    // TODAY INSIGHT
    // =========================
    let insight =
      "You are gradually building emotional awareness through reflection.";

    if (finalMoodScore >= 80) {
      insight =
        "You’ve been emotionally balanced lately. Your recent reflections show positivity and stability.";
    } else if (finalMoodScore >= 50) {
      insight =
        "Your emotional state looks moderate today. Taking breaks and journaling may help.";
    } else {
      insight =
        "Your recent activity suggests emotional fatigue. Slow down and give yourself more care.";
    }

    // =========================
    // AI WELLNESS SUMMARY
    // =========================
    let aiSummary =
      "Your emotional wellness journey is improving steadily.";

    if (finalMoodScore >= 80) {
      aiSummary =
        "Your recent emotional patterns show confidence, stability, and better emotional control.";
    } else if (finalMoodScore >= 50) {
      aiSummary =
        "Your emotions appear balanced overall, though some stress patterns are visible.";
    } else {
      aiSummary =
        "You may be emotionally overwhelmed lately. Try sleeping well, journaling more, and taking mindful pauses.";
    }

    // =========================
    // MINDFUL REMINDER
    // =========================
    const reminders = [
      "Pause for 30 seconds. Relax your shoulders.",
      "Drink some water and take a deep breath.",
      "Your feelings are temporary. Give yourself kindness.",
      "Step away from the screen for a minute.",
      "Small progress is still progress.",
    ];

    const mindfulReminder =
      reminders[Math.floor(Math.random() * reminders.length)];

    // =========================
    // SLEEP SCORE
    // =========================
    let sleepScore = "7.2h";

    if (latestSleep?.hours) {
      sleepScore = `${latestSleep.hours}h`;
    }

    // =========================
    // RESPONSE
    // =========================
    res.json({
      todayMood,

      journalEntries: totalThreads + totalPosts,

      sleepScore,

      stressLevel,

      streak: Math.min(totalThreads + totalPosts, 365),

      weeklyMood,

      recentReflections,

      insight,

      aiSummary,

      mindfulReminder,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to load dashboard data",
    });
  }
});

module.exports = router;