const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";

// Search for books using Google Books API
router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ error: "Query is required" });

    const response = await axios.get(`${BOOKS_API_URL}?q=${query}&key=${"AIzaSyCkBsGITR_52hAYdE1zlH1QnaLsuP3W8gk"}`);
    res.json(response.data.items || []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

module.exports = router;
