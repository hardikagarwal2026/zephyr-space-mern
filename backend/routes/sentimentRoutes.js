const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GOOGLE_API_KEY = "AIzaSyB7zN_GFklC2F09mqxTiwf3gsBpK-MsYdw";

// Ensure API key is available
if (!GOOGLE_API_KEY) {
  console.error("❌ GOOGLE_API_KEY is missing in .env file!");
}

router.post("/analyze", async (req, res) => {
  try {
    const { review } = req.body;
    if (!review) return res.status(400).json({ error: "Review is required." });

    console.log(`🔹 Analyzing Review: "${review}"`);

    const prompt = `Analyze the sentiment of this book review:\n\n"${review}"\n\nSentiment:`;

    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GOOGLE_API_KEY },
      }
    );

    console.log("🔹 AI API Response:", JSON.stringify(response.data, null, 2));

    const sentiment =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to analyze sentiment.";

    res.json({ sentiment });

  } catch (error) {
    console.error("❌ Sentiment Analysis Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to analyze sentiment.", details: error.response?.data || "Unknown error" });
  }
});

module.exports = router;
