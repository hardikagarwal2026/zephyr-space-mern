const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GOOGLE_API_KEY = "AIzaSyB7zN_GFklC2F09mqxTiwf3gsBpK-MsYdw";
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

// Ensure API key exists before processing requests
if (!GOOGLE_API_KEY) {
  console.error("❌ GOOGLE_API_KEY is missing in .env file!");
}

router.post("/ask", async (req, res) => {
  try {
    const { bookTitle, question } = req.body;

    // Validate request data
    if (!bookTitle || !question) {
      return res.status(400).json({ error: "Both book title and question are required." });
    }

    console.log(`🔹 Received Question: "${question}" about "${bookTitle}"`);

    const prompt = `Book Title: ${bookTitle}\n\nQuestion: ${question}\nAnswer:`;

    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GOOGLE_API_KEY },
      }
    );

    console.log("🔹 AI API Response:", JSON.stringify(response.data, null, 2));

    // Extract answer from API response
    const answer =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't find an answer.";

    res.json({ answer });

  } catch (error) {
    console.error("❌ AI API Error:", error.response?.data || error.message);

    res.status(500).json({
      error: "Failed to fetch AI response.",
      details: error.response?.data || "Unknown error",
    });
  }
});

module.exports = router;
