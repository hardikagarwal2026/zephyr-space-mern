const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
const GOOGLE_API_KEY = "AIzaSyB7zN_GFklC2F09mqxTiwf3gsBpK-MsYdw";


// Function to extract JSON from AI response
function extractAndCleanJson(text) {
  const jsonMatch = text.match(/```json\s*(\{.*?\})\s*```/s);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return null;
}

// Generate Quiz API
router.post("/generate", async (req, res) => {
  try {
    const { bookTitle } = req.body;
    if (!bookTitle) return res.status(400).json({ error: "Book title is required." });

    console.log(`🔹 Generating Quiz for: "${bookTitle}"`);

    const prompt = `
      Generate 10 multiple-choice quiz questions based on the book titled "${bookTitle}".
      Each question should have 4 answer options. Ensure that the correct answer is randomly distributed among the options.
      Return the result as a JSON object with a "questions" array, where each question contains:
      - "question": The quiz question
      - "options": A list of 4 possible answers
      - "correct_answer": The correct answer from the options
    `;

    const response = await axios.post(
      GEMINI_API_URL,
      { contents: [{ parts: [{ text: prompt }] }] },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: GOOGLE_API_KEY },
      }
    );

    console.log("🔹 AI API Response:", JSON.stringify(response.data, null, 2));

    const responseText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const jsonStr = extractAndCleanJson(responseText);
    
    if (!jsonStr) {
      return res.status(500).json({ error: "Failed to parse quiz data." });
    }

    const quizData = JSON.parse(jsonStr);
    res.json({ questions: quizData.questions });

  } catch (error) {
    console.error("❌ Quiz Generation Error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate quiz.", details: error.response?.data || "Unknown error" });
  }
});

module.exports = router;
