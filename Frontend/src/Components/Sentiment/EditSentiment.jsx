import React, { useEffect, useState } from "react";
import "./EditSentiment.css";
import api from "../../apiClient";

const EditSentiment = ({ id, onClose, onSaved }) => {
  const [formData, setFormData] = useState({
    user: "",
    text: "",
    sentiment: "",
    date: "",
  });

  const [customSentiment, setCustomSentiment] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get(`/sentra/${id}`);
        const data = res.data;
        setFormData({
          user: data.user || "",
          text: data.text || "",
          sentiment: data.sentiment || "",
          date: data.date || "",
        });

        if (!["Happy", "Sad", "Neutral"].includes(data.sentiment)) {
          setCustomSentiment(data.sentiment || "");
          setShowCustom(true);
        }
      } catch (err) {
        console.error("Fetch single sentiment error:", err);
      }
    })();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSentimentChange = (e) => {
    const value = e.target.value;
    if (value === "Other") {
      setShowCustom(true);
      setFormData({ ...formData, sentiment: "" });
    } else {
      setShowCustom(false);
      setFormData({ ...formData, sentiment: value });
    }
  };

  const handleCustomSentimentChange = (e) => {
    setCustomSentiment(e.target.value);
    setFormData({ ...formData, sentiment: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put(`/sentra/${id}`, formData); // PUT /sentra/:id

      alert("Updated successfully!");
      if (onSaved) onSaved(res.data);
      onClose();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.error || "Something went wrong while updating."
      );
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <form onSubmit={handleSubmit} className="sentiment-form">
          <h2>Edit Sentiment</h2>
          <p className="subtitle">Update your current thoughts and feelings</p>

          <input
            type="text"
            name="user"
            placeholder="Your Name"
            value={formData.user}
            onChange={handleChange}
            required
          />

          <textarea
            name="text"
            placeholder="Write your thoughts..."
            value={formData.text}
            onChange={handleChange}
            required
          />

          <label className="sentiment-label">How are you feeling?</label>
          <div className="sentiment-options">
            {["Happy", "Sad", "Neutral", "Other"].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name="sentiment"
                  value={s}
                  checked={
                    s === "Other" ? showCustom : formData.sentiment === s
                  }
                  onChange={handleSentimentChange}
                />
                {s}
              </label>
            ))}
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
            value={formData.date}
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

export default EditSentiment;
