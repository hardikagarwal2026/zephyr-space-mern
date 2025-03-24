const express = require("express");
const axios = require("axios");

const router = express.Router();
const WIKIPEDIA_API_URL = "https://en.wikipedia.org/api/rest_v1/page/summary/";

// Fetch author details from Wikipedia
router.get("/search", async (req, res) => {
  try {
    const { author } = req.query;
    if (!author) return res.status(400).json({ error: "Author name is required." });

    const response = await axios.get(`${WIKIPEDIA_API_URL}${encodeURIComponent(author)}`);
    
    if (response.data.type === "https://mediawiki.org/wiki/HyperSwitch/errors/not_found") {
      return res.status(404).json({ error: "Author not found on Wikipedia." });
    }

    const { title, extract, content_urls, thumbnail } = response.data;
    
    res.json({
      title,
      summary: extract,
      link: content_urls.desktop.page,
      image: thumbnail?.source || null,
    });

  } catch (error) {
    console.error("❌ Wikipedia API Error:", error.message);
    res.status(500).json({ error: "Failed to fetch author details." });
  }
});

module.exports = router;
