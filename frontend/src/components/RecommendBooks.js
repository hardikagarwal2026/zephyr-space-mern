import React, { useState } from "react";
import axios from "axios";

const RecommendBooks = () => {
  const [preferences, setPreferences] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRecommendations = async () => {
    if (!preferences.trim()) {
      setError("Please enter your book preferences.");
      return;
    }

    setLoading(true);
    setError("");
    setBooks([]);

    try {
      const response = await axios.get(`http://localhost:5000/api/recommend/recommend?preferences=${preferences}`);
      setBooks(response.data);
    } catch (error) {
      setError("Failed to fetch recommendations. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Get Customized Book Recommendations</h2>

      <input
        type="text"
        placeholder="Enter your book preferences"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        style={styles.input}
      />
      <button onClick={getRecommendations} style={styles.button} disabled={loading}>
        {loading ? "Fetching..." : "Get Recommendations"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.bookList}>
        {books.length === 0 && !loading && !error && <p>No recommendations found.</p>}

        {books.map((book, index) => (
          <div key={index} style={styles.bookCard}>
            {book.volumeInfo.imageLinks?.thumbnail && (
              <img src={book.volumeInfo.imageLinks.thumbnail} alt="Book cover" style={styles.thumbnail} />
            )}
            <div>
              <h3>{book.volumeInfo.title}</h3>
              <p>Author: {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
              <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer" style={styles.link}>
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
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
  input: {
    padding: "10px",
    fontSize: "16px",
    width: "60%",
    margin: "10px 0",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
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
  bookList: {
    marginTop: "20px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  bookCard: {
    width: "300px",
    padding: "10px",
    margin: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    textAlign: "left",
    backgroundColor: "#f9f9f9",
  },
  thumbnail: {
    width: "100px",
    height: "150px",
    marginRight: "10px",
  },
  link: {
    display: "block",
    marginTop: "10px",
    color: "#007BFF",
    textDecoration: "none",
  },
  error: {
    marginTop: "20px",
    fontSize: "16px",
    color: "red",
  },
};

export default RecommendBooks;
