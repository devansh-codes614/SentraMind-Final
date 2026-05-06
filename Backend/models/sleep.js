const mongoose = require("mongoose");

const sleepSchema = new mongoose.Schema(
  {
    hours: {
      type: Number,
      required: true,
      min: 0,
      max: 24,
    },
    quality: {
      type: String,
      enum: ["Poor", "Average", "Good", "Excellent"],
      default: "Average",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sleep", sleepSchema);