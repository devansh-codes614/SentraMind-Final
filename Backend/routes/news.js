const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const apiKey = process.env.NEWS_API_KEY;

    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=mental health OR therapy OR meditation OR emotional wellness OR psychology&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`
    );

    res.json(response.data.articles);
  } catch (err) {
    console.log("News API Error:", err.message);

    res.status(500).json({
      error: "Failed to fetch news",
    });
  }
});

module.exports = router;