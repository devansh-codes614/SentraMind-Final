const express = require("express");
const router = express.Router();
const Mood = require("../models/mood");

// =====================
// ADD MOOD
// =====================
router.post("/", async (req, res) => {
  try {
    const { mood, note, score } = req.body;

    const newMood = new Mood({
      mood,
      note,
      score,
    });

    await newMood.save();

    res.json({ success: "Mood saved!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save mood" });
  }
});

// =====================
// GET ALL MOODS
// =====================
router.get("/", async (req, res) => {
  try {
    const moods = await Mood.find({}).sort({ createdAt: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch moods" });
  }
});

module.exports = router;