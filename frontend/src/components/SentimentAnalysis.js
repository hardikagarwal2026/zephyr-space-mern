import React, { useState } from "react";
import axios from "axios";

const SentimentAnalysis = () => {
  const [review, setReview] = useState("");
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeSentiment = async () => {
    if (!review.trim()) {
      setError("Please enter a book review.");
      return;
    }

    setLoading(true);
    setError("");
    setSentiment("");

    try {
      const response = await axios.post("http://localhost:5000/api/sentiment/analyze", {
        review,
      });
      setSentiment(response.data.sentiment);
    } catch (error) {
      setError("Failed to analyze sentiment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Analyze Book Review Sentiment</h2>

      <textarea
        placeholder="Enter your book review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        style={styles.textarea}
      />
      <button onClick={analyzeSentiment} style={styles.button} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {sentiment && <p style={styles.result}><strong>Sentiment:</strong> {sentiment}</p>}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  textarea: {
    width: "80%",
    height: "100px",
    fontSize: "16px",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    cursor: "pointer",
    backgroundColor: "orange",
    border: "none",
    borderRadius: "5px",
    color: "white",
  },
  result: {
    marginTop: "20px",
    fontSize: "18px",
    color: "green",
  },
  error: {
    marginTop: "20px",
    fontSize: "16px",
    color: "red",
  },
};

export default SentimentAnalysis;
