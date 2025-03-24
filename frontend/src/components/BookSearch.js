// import React, { useState } from "react";
// import axios from "axios";

// const BookSearch = () => {
//   const [query, setQuery] = useState("");
//   const [books, setBooks] = useState([]);

//   const searchBooks = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
//       setBooks(response.data);
//     } catch (error) {
//       console.error("Error fetching books:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>Book Search</h2>
//       <input
//         type="text"
//         placeholder="Enter book title"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
//       <button onClick={searchBooks}>Search</button>

//       <div>
//         {books.map((book, index) => (
//           <div key={index}>
//             <h3>{book.volumeInfo.title}</h3>
//             <p>Author: {book.volumeInfo.authors?.join(", ") || "Unknown"}</p>
//             <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
//               Read More
//             </a>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default BookSearch;


import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const searchBooks = async () => {
    if (!query.trim()) {
      setError("Please enter a book title.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:5000/api/books/search?query=${query}`);
      setBooks(response.data);
    } catch (error) {
      setError("Error fetching books. Please try again.");
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Book Search</h2>
      
      <input
        type="text"
        placeholder="Enter book title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.input}
      />
      <button onClick={searchBooks} style={styles.button}>Search</button>

      {loading && <p style={styles.loading}>Loading...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.bookList}>
        {books.length === 0 && !loading && !error && <p>No books found.</p>}

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
    marginRight: "10px",
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
  qaButton: {
    marginTop: "20px",
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#007BFF",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
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
  loading: {
    color: "blue",
    fontSize: "18px",
  },
  error: {
    color: "red",
    fontSize: "16px",
  },
};

export default BookSearch;
