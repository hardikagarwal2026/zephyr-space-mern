// import React, { useState } from "react";
// import axios from "axios";

// const QABook = () => {
//   const [bookTitle, setBookTitle] = useState("");
//   const [question, setQuestion] = useState("");
//   const [answer, setAnswer] = useState("");

//   const askQuestion = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/qa/ask", {
//         bookTitle,
//         question,
//       });
//       setAnswer(response.data.answer);
//     } catch (error) {
//       setAnswer("Failed to fetch answer.");
//     }
//   };

//   return (
//     <div>
//       <h2>Ask a Question About a Book</h2>
//       <input
//         type="text"
//         placeholder="Enter book title"
//         value={bookTitle}
//         onChange={(e) => setBookTitle(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter your question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <button onClick={askQuestion}>Ask</button>
//       {answer && <p><strong>Answer:</strong> {answer}</p>}
//     </div>
//   );
// };

// export default QABook;
import React, { useState } from "react";
import axios from "axios";

const QABook = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async () => {
    if (!bookTitle.trim() || !question.trim()) {
      setError("Please enter both the book title and your question.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await axios.post("http://localhost:5000/api/qa/ask", {
        bookTitle,
        question,
      });
      setAnswer(response.data.answer);
    } catch (error) {
      setError("Failed to fetch answer. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ask a Question About a Book</h2>

      <input
        type="text"
        placeholder="Enter book title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        style={styles.input}
      />
      <input
        type="text"
        placeholder="Enter your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={styles.input}
      />
      <button onClick={askQuestion} style={styles.button} disabled={loading}>
        {loading ? "Fetching answer..." : "Ask"}
      </button>

      {error && <p style={styles.error}>{error}</p>}
      {answer && <p style={styles.answer}><strong>Answer:</strong> {answer}</p>}
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
  answer: {
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

export default QABook;
