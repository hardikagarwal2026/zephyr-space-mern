const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bookRoutes = require("./routes/bookRoutes");
const qaRoutes = require("./routes/qaRoutes");
const recommendRoutes = require("./routes/recommendRoutes");
const sentimentRoutes = require("./routes/sentimentRoutes");
const authorRoutes = require("./routes/authorRoutes");
const quizRoutes = require("./routes/quizRoutes");

require("dotenv").config(); // Load environment variables

consolele.log("ok");

const app = express();
const PORT = process.env.PORT || 5000;
// const MONGO_URI = "mongodb+srv://ha0804:%23Ohmyfriend27@ha0804.slevl.mongodb.net/?retryWrites=true&w=majority&appName=ha0804";

// if (!MONGO_URI) {
//   console.error("❌ MONGO_URI is missing in .env file!");
//   process.exit(1); // Stop server if MONGO_URI is undefined
// }


app.use(express.json());
app.use(cors());


app.get("/", (req, res) => {
  res.send("✅ Zephyr Backend is Running!");
});


// mongoose
//   .connect(MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => {
//     console.error("❌ MongoDB Connection Error:", err);
//     process.exit(1); // Stop server on connection failure
//   });

app.use("/api/sentiment", sentimentRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/qa", qaRoutes);
app.use("/api/recommend", recommendRoutes);
app.use("/api/author", authorRoutes);
app.use("/api/quiz", quizRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
