import React, { useState } from "react";
import "./NewSentiment.css";
import api from "../../apiClient";

const NewSentiment = ({ onClose, onSaved }) => {
  const [form, setForm] = useState({
    text: "",
    sentiment: "",
  });

  const [customSentiment, setCustomSentiment] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  // =========================
  // TEXT CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // =========================
  // SENTIMENT CHANGE
  // =========================
  const handleSentimentChange = (e) => {
    const value = e.target.value;

    if (value === "Other") {
      setShowCustom(true);

      setForm({
        ...form,
        sentiment: "",
      });
    } else {
      setShowCustom(false);

      setForm({
        ...form,
        sentiment: value,
      });
    }
  };

  // =========================
  // CUSTOM SENTIMENT
  // =========================
  const handleCustomSentimentChange = (e) => {
    setCustomSentiment(e.target.value);

    setForm({
      ...form,
      sentiment: e.target.value,
    });
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/sentra", {
        text: form.text,
        sentiment: form.sentiment,
      });

      if (onSaved) onSaved();

      onClose();
    } catch (err) {
      console.error(
        "Create sentiment error:",
        err.response?.data || err.message
      );

      alert(
        err.response?.data?.error ||
          "Failed to save sentiment"
      );
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <form
          onSubmit={handleSubmit}
          className="sentiment-form"
        >
          <h2>Mental Health Journal</h2>

          <p className="subtitle">
            Share your current thoughts and feelings
          </p>

          {/* TEXT */}
          <textarea
            name="text"
            placeholder="Write your thoughts..."
            value={form.text}
            onChange={handleChange}
            required
          />

          {/* SENTIMENT */}
          <label className="sentiment-label">
            How are you feeling?
          </label>

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

          {/* CUSTOM */}
          {showCustom && (
            <input
              type="text"
              placeholder="Enter your own sentiment"
              value={customSentiment}
              onChange={handleCustomSentimentChange}
              required
            />
          )}

          {/* BUTTONS */}
          <div className="buttons">
            <button
              type="submit"
              className="btn btn-primary"
            >
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