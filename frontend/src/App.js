import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import BookSearch from "./components/BookSearch";
import QABook from "./components/QABook";
import RecommendBooks from "./components/RecommendBooks";
import SentimentAnalysis from "./components/SentimentAnalysis";
import AuthorSearch from "./components/AuthorSearch";
import BookQuiz from "./components/BookQuiz";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/search" element={<BookSearch />} />
        <Route path="/qa" element={<QABook />} />
        <Route path="/recommend" element={<RecommendBooks />} />
        <Route path="/sentiment" element={<SentimentAnalysis />} />
        <Route path="/author" element={<AuthorSearch />} />
        <Route path="/quiz" element={<BookQuiz />} />
      </Routes>
    </Router>
  );
};

export default App;
