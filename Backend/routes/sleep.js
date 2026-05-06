const express = require("express");
const router = express.Router();
const Sleep = require("../models/sleep");

// =====================
// ADD SLEEP
// =====================
router.post("/", async (req, res) => {
  try {
    const { hours, quality } = req.body;

    const newSleep = new Sleep({
      hours,
      quality,
    });

    await newSleep.save();

    res.json({ success: "Sleep logged!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save sleep" });
  }
});

// =====================
// GET ALL SLEEP DATA
// =====================
router.get("/", async (req, res) => {
  try {
    const sleepData = await Sleep.find({}).sort({ createdAt: -1 });
    res.json(sleepData);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sleep data" });
  }
});

module.exports = router;