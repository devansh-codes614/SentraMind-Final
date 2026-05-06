import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import api from "../apiClient";

const Dashboard = () => {
  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FOCUS TIMER
  // =========================
  const TIMER_SECONDS = 25 * 60;

  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);
      alert("Focus session completed 🎉");
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  };

  // =========================
  // FETCH DASHBOARD
  // =========================
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await api.get("/api/dashboard");
        setDashboardData(res.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  // =========================
  // QUICK ACTIONS
  // =========================
  const handleQuickAction = (action) => {
    if (action === "Start Reflection") {
      navigate("/chatbot");
    }

    if (action === "Log Mood") {
      navigate("/chatbot");
    }

    if (action === "Breathing Exercise") {
      alert(
        "🫁 Breathing Exercise\n\nInhale for 4s\nHold for 4s\nExhale for 6s"
      );
    }

    if (action === "Focus Timer") {
      setIsRunning(true);
    }
  };

  // =========================
  // LOADING
  // =========================
  if (loading) {
    return (
      <div className="dashboard loading-state">
        <h2>Loading dashboard...</h2>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (!dashboardData) {
    return (
      <div className="dashboard loading-state">
        <h2>Failed to load dashboard.</h2>
      </div>
    );
  }

  const {
    todayMood,
    journalEntries,
    sleepScore,
    stressLevel,
    streak,
    weeklyMood,
    recentReflections,
    insight,
    aiSummary,
  } = dashboardData;

  const quickActions = [
    "Start Reflection",
    "Log Mood",
    "Breathing Exercise",
    "Focus Timer",
  ];

  return (
    <div className="dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p>Your emotional wellness snapshot for today</p>
        </div>

        <div className="dashboard-badge">
          Day {streak || 1} Streak
        </div>
      </div>

      <div className="dashboard-grid">
        {/* LEFT */}
        <div className="dashboard-left">
          {/* STATS */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Today’s Mood</h3>
              <h2>{todayMood || "Balanced"}</h2>
              <span>Based on emotional activity</span>
            </div>

            <div className="stat-card">
              <h3>Journal Entries</h3>
              <h2>{journalEntries ?? 0}</h2>
              <span>Tracked from reflections</span>
            </div>

            <div className="stat-card">
              <h3>Sleep Score</h3>
              <h2>{sleepScore || "7.2h"}</h2>
              <span>Estimated wellness score</span>
            </div>

            <div className="stat-card">
              <h3>Stress Level</h3>
              <h2>{stressLevel || "Moderate"}</h2>
              <span>Derived from recent sentiment</span>
            </div>
          </div>

          {/* WEEKLY MOOD */}
          <div className="card large-card">
            <div className="card-header">
              <h3>Weekly Mood Trend</h3>
              <span>Last 7 days</span>
            </div>

            <div className="mood-chart">
              {weeklyMood?.length > 0 ? (
                weeklyMood.map((item, index) => (
                  <div key={index} className="bar-group">
                    <div
                      className="bar"
                      style={{ height: `${item.mood}%` }}
                    ></div>

                    <span>{item.day}</span>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  No weekly mood data yet.
                </div>
              )}
            </div>
          </div>

          {/* REFLECTIONS */}
          <div className="card large-card reflections-card">
            <div className="card-header">
              <h3>Recent Reflections</h3>
              <span>Latest notes</span>
            </div>

            <div className="reflection-list">
              {recentReflections?.length > 0 ? (
                recentReflections.map((item, index) => (
                  <div key={index} className="reflection-item">
                    {item}
                  </div>
                ))
              ) : (
                <div className="reflection-item">
                  No reflections yet.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="dashboard-right">
          {/* INSIGHT */}
          <div className="card profile-card">
            <h3>Today’s Insight</h3>

            <p>
              {insight ||
                "Your recent activity suggests growing self-awareness and emotional consistency."}
            </p>
          </div>

          {/* QUICK ACTIONS */}
          <div className="card quick-card">
            <div className="card-header">
              <h3>Quick Actions</h3>
            </div>

            <div className="quick-actions">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action)}
                >
                  {action}
                </button>
              ))}
            </div>
          </div>

          {/* TIMER CARD */}
          <div className="card timer-card">
            <h3>Focus Timer</h3>

            <div className="timer-display">
              {formatTime()}
            </div>

            <div className="timer-buttons">
              <button onClick={() => setIsRunning(true)}>
                Start
              </button>

              <button onClick={() => setIsRunning(false)}>
                Pause
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(TIMER_SECONDS);
                }}
              >
                Reset
              </button>
            </div>
          </div>

          {/* MINDFUL */}
          <div className="card mini-card">
            <h3>Mindful Reminder</h3>

            <p>
              Pause for 30 seconds. Unclench your jaw. Relax your shoulders.
            </p>
          </div>

          {/* AI SUMMARY */}
          <div className="card mini-card">
            <h3>AI Wellness Summary</h3>

            <p>
              {aiSummary ||
                "Your emotional patterns show improving awareness. Keep reflecting consistently to build stronger clarity and emotional balance."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;