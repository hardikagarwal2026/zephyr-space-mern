import React, { useState } from "react";
import axios from "axios";

const AuthorSearch = () => {
  const [author, setAuthor] = useState("");
  const [authorData, setAuthorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchAuthor = async () => {
    if (!author.trim()) {
      setError("Please enter an author name.");
      return;
    }

    setLoading(true);
    setError("");
    setAuthorData(null);

    try {
      const response = await axios.get(`http://localhost:5000/api/author/search?author=${author}`);
      setAuthorData(response.data);
    } catch (error) {
      setError("Failed to fetch author details. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Search for an Author</h2>

      <input
        type="text"
        placeholder="Enter author name"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={styles.input}
      />
      <button onClick={searchAuthor} style={styles.button} disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>

      {error && <p style={styles.error}>{error}</p>}

      {authorData && (
        <div style={styles.result}>
          {authorData.image && <img src={authorData.image} alt={authorData.title} style={styles.image} />}
          <h3>{authorData.title}</h3>
          <p>{authorData.summary}</p>
          <a href={authorData.link} target="_blank" rel="noopener noreferrer" style={styles.link}>
            Read More on Wikipedia
          </a>
        </div>
      )}
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
  result: {
    marginTop: "20px",
    textAlign: "left",
    maxWidth: "600px",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "5px",
  },
  image: {
    width: "100px",
    borderRadius: "5px",
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

export default AuthorSearch;
