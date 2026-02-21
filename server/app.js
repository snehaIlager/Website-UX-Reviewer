// Load environment variables
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import reviewRoutes from "./routes/review.js";
import statusRoutes from "./routes/status.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Database Connected"))
  .catch((err) => console.error(" DB Connection Error:", err));

// Root route
app.get("/", (req, res) => {
  res.json({ message: "UX Reviewer Backend Running" });
});

// Routes
app.use("/review", reviewRoutes);
app.use("/status", statusRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});