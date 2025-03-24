// import React, { useState } from "react";
// import axios from "axios";

// const BookQuiz = () => {
//   const [bookTitle, setBookTitle] = useState("");
//   const [quiz, setQuiz] = useState(null);
//   const [userAnswers, setUserAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

//   const generateQuiz = async () => {
//     if (!bookTitle.trim()) {
//       setError("Please enter a book title.");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setQuiz(null);
//     setUserAnswers({});
//     setScore(null);
//     setShowCorrectAnswers(false);

//     try {
//       const response = await axios.post("http://localhost:5000/api/quiz/generate", { bookTitle });
//       setQuiz(response.data.questions);
//     } catch (error) {
//       setError("Failed to generate quiz. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAnswerChange = (questionIndex, selectedOption) => {
//     setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
//   };

//   const submitQuiz = () => {
//     if (Object.keys(userAnswers).length !== quiz.length) {
//       setError("Please answer all questions before submitting.");
//       return;
//     }

//     let correctCount = 0;
//     quiz.forEach((q, index) => {
//       if (userAnswers[index] === q.correct_answer) {
//         correctCount++;
//       }
//     });

//     setScore(correctCount);
//     setShowCorrectAnswers(true);
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Take a Book Quiz</h2>

//       <input
//         type="text"
//         placeholder="Enter book title"
//         value={bookTitle}
//         onChange={(e) => setBookTitle(e.target.value)}
//         style={styles.input}
//       />
//       <button onClick={generateQuiz} style={styles.button} disabled={loading}>
//         {loading ? "Generating..." : "Generate Quiz"}
//       </button>

//       {error && <p style={styles.error}>{error}</p>}

//       {quiz && (
//         <div style={styles.quizContainer}>
//           {quiz.map((q, index) => (
//             <div key={index} style={styles.questionBlock}>
//               <p><strong>Question {index + 1}:</strong> {q.question}</p>
//               {q.options.map((option, optIndex) => (
//                 <label key={optIndex} style={styles.optionLabel}>
//                   <input
//                     type="radio"
//                     name={`question-${index}`}
//                     value={option}
//                     onChange={() => handleAnswerChange(index, option)}
//                     checked={userAnswers[index] === option}
//                   />
//                   {option}
//                 </label>
//               ))}

//               {showCorrectAnswers && (
//                 <p style={userAnswers[index] === q.correct_answer ? styles.correct : styles.incorrect}>
//                   {userAnswers[index] === q.correct_answer
//                     ? "✅ Correct!"
//                     : `❌ Incorrect! Correct Answer: ${q.correct_answer}`}
//                 </p>
//               )}
//             </div>
//           ))}
//           <button onClick={submitQuiz} style={styles.submitButton}>Submit Answers</button>
//           {score !== null && <p style={styles.score}>Your Score: {score} / {quiz.length}</p>}
//         </div>
//       )}
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   title: {
//     fontSize: "24px",
//     marginBottom: "10px",
//   },
//   input: {
//     padding: "10px",
//     fontSize: "16px",
//     width: "60%",
//     margin: "10px 0",
//     display: "block",
//     marginLeft: "auto",
//     marginRight: "auto",
//   },
//   button: {
//     padding: "10px 15px",
//     fontSize: "16px",
//     cursor: "pointer",
//     backgroundColor: "orange",
//     border: "none",
//     borderRadius: "5px",
//     color: "white",
//   },
//   quizContainer: {
//     marginTop: "20px",
//   },
//   questionBlock: {
//     textAlign: "left",
//     marginBottom: "15px",
//   },
//   optionLabel: {
//     display: "block",
//     cursor: "pointer",
//   },
//   submitButton: {
//     padding: "10px 15px",
//     fontSize: "16px",
//     backgroundColor: "#007BFF",
//     border: "none",
//     borderRadius: "5px",
//     color: "white",
//     cursor: "pointer",
//   },
//   score: {
//     marginTop: "10px",
//     fontSize: "18px",
//     color: "green",
//   },
//   error: {
//     color: "red",
//     fontSize: "16px",
//   },
//   correct: {
//     color: "green",
//     fontSize: "16px",
//   },
//   incorrect: {
//     color: "red",
//     fontSize: "16px",
//   },
// };

// export default BookQuiz;

import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BookQuiz = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [quiz, setQuiz] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);

  const generateQuiz = async () => {
    if (!bookTitle.trim()) {
      setError("Please enter a book title.");
      return;
    }

    setLoading(true);
    setError("");
    setQuiz(null);
    setUserAnswers({});
    setScore(null);
    setShowCorrectAnswers(false);

    try {
      const response = await axios.post("http://localhost:5000/api/quiz/generate", { bookTitle });
      setQuiz(response.data.questions);
    } catch (error) {
      setError("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setUserAnswers({ ...userAnswers, [questionIndex]: selectedOption });
  };

  const submitQuiz = () => {
    if (Object.keys(userAnswers).length !== quiz.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    let correctCount = 0;
    quiz.forEach((q, index) => {
      if (userAnswers[index] === q.correct_answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    setShowCorrectAnswers(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white p-6 relative">
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-20 blur-3xl"></div>

      {/* Title Animation */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-bold text-primary drop-shadow-glow"
      >
        Take a Book Quiz
      </motion.h2>

      <motion.input
        type="text"
        placeholder="Enter book title"
        value={bookTitle}
        onChange={(e) => setBookTitle(e.target.value)}
        className="mt-4 p-3 text-lg rounded-md bg-gray-800 text-white border border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
      />

      <motion.button
        onClick={generateQuiz}
        className="mt-4 px-6 py-2 bg-primary text-white text-lg rounded-md shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Generating..." : "Generate Quiz"}
      </motion.button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      {quiz && (
        <div className="mt-6 w-full max-w-2xl p-6 bg-gray-900 rounded-lg shadow-lg">
          {quiz.map((q, index) => (
            <div key={index} className="mb-4">
              <p className="text-lg font-semibold text-accent">Question {index + 1}: {q.question}</p>
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="block cursor-pointer mt-2 text-white">
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={option}
                    onChange={() => handleAnswerChange(index, option)}
                    checked={userAnswers[index] === option}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
              {showCorrectAnswers && (
                <p className={userAnswers[index] === q.correct_answer ? "text-green-500" : "text-red-500"}>
                  {userAnswers[index] === q.correct_answer ? "✅ Correct!" : `❌ Incorrect! Correct Answer: ${q.correct_answer}`}
                </p>
              )}
            </div>
          ))}
          <motion.button
            onClick={submitQuiz}
            className="mt-4 px-6 py-2 bg-secondary text-white text-lg rounded-md shadow-lg transition-transform duration-200 hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Answers
          </motion.button>
          {score !== null && <p className="mt-4 text-xl text-green-400">Your Score: {score} / {quiz.length}</p>}
        </div>
      )}
    </div>
  );
};

export default BookQuiz;
