const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    mood: {
      type: String,
      enum: ["Great", "Good", "Okay", "Low", "Stressed"],
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      min: 1,
      max: 100,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);