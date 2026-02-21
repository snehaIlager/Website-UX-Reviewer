import express from "express";
import mongoose from "mongoose";
import Groq from "groq-sdk";

const router = express.Router();

router.get("/", async (req, res) => {

  let dbStatus = "connected";
  let llmStatus = "working";

  if (mongoose.connection.readyState !== 1) {
    dbStatus = "disconnected";
  }

  try {
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY
    });

    await groq.chat.completions.create({
     model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: "ping" }],
      max_tokens: 1
    });

  } catch {
    llmStatus = "not working";
  }

  res.json({
    backend: "running",
    database: dbStatus,
    llm: llmStatus
  });
});

export default router;