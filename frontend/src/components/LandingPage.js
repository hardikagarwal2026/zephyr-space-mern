import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const features = [
  { title: "Book Search", path: "/search" },
  { title: "Author Search", path: "/author" },
  { title: "Book Quiz", path: "/quiz" },
  { title: "Q&A Books", path: "/qa" },
  { title: "Recommendations", path: "/recommend" },
  { title: "Sentiment Analysis", path: "/sentiment" },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-white relative">
      
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-20 blur-3xl"></div>

      {/* Title Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl font-extrabold text-primary drop-shadow-glow text-center"
      >
        Book Space
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        className="text-xl text-accent mt-4 text-center max-w-2xl"
      >
        Where words turn into worlds.  
        <br /> Explore, challenge, and fall in love with books like never before.
      </motion.p>

      {/* Feature Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="feature-grid"
      >
        {features.map((feature) => (
          <motion.div
            key={feature.title}
            onClick={() => navigate(feature.path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="feature-card"
          >
            {feature.title}
          </motion.div>
        ))}
      </motion.div>


      {/* Neon Bottom Border */}
      <div className="neon-border"></div>
      
    </div>
  );
};

export default LandingPage;
