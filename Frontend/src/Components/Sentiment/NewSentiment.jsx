import React, { useState } from "react";
import "./NewSentiment.css";
import api from "../../apiClient"; // ✅ use same axios instance

const NewSentiment = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({
    text: "",
    sentiment: "",
    date: "",
  });

  const [customSentiment, setCustomSentiment] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSentimentChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setShowCustom(true);
      setForm({ ...form, sentiment: "" });
    } else {
      setShowCustom(false);
      setForm({ ...form, sentiment: value });
    }
  };

  const handleCustomSentimentChange = (e) => {
    setCustomSentiment(e.target.value);
    setForm({ ...form, sentiment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ backend create route: POST /sentra
      // backend khud user = req.user.username, owner = req.user._id set karega
      await api.post("/sentra", {
        text: form.text,
        sentiment: form.sentiment,
        date: form.date,
      });

      if (onSaved) onSaved(); // list refresh
      onClose();
    } catch (err) {
      console.error("Create sentiment error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to save sentiment");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <form onSubmit={handleSubmit} className="sentiment-form">
          <h2>Mental Health Journal</h2>
          <p className="subtitle">Share your current thoughts and feelings</p>

          <textarea
            name="text"
            placeholder="Write your thoughts..."
            value={form.text}
            onChange={handleChange}
            required
          />

          <label className="sentiment-label">How are you feeling?</label>
          <div className="sentiment-options">
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Happy"
                checked={form.sentiment === "Happy"}
                onChange={handleSentimentChange}
              />
              Happy
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Sad"
                checked={form.sentiment === "Sad"}
                onChange={handleSentimentChange}
              />
              Sad
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Neutral"
                checked={form.sentiment === "Neutral"}
                onChange={handleSentimentChange}
              />
              Neutral
            </label>
            <label>
              <input
                type="radio"
                name="sentiment"
                value="Other"
                checked={showCustom}
                onChange={handleSentimentChange}
              />
              Other
            </label>
          </div>

          {showCustom && (
            <input
              type="text"
              placeholder="Enter your own sentiment"
              value={customSentiment}
              onChange={handleCustomSentimentChange}
              required
            />
          )}

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
          />

          <div className="buttons">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewSentiment;
