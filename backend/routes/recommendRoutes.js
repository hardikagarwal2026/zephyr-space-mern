const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
const BOOKS_API_KEY = "AIzaSyCkBsGITR_52hAYdE1zlH1QnaLsuP3W8gk";

// Get book recommendations based on user preferences
router.get("/recommend", async (req, res) => {
  try {
    const { preferences } = req.query;
    if (!preferences) return res.status(400).json({ error: "Preferences are required" });

    const response = await axios.get(`${BOOKS_API_URL}?q=${preferences}&key=${BOOKS_API_KEY}`);
    res.json(response.data.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});

module.exports = router;
