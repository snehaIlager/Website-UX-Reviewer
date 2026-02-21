import express from "express";
import { scrapeWebsite } from "../services/scraper.js";
import { generateUXReview } from "../services/llm.js";
import { isValidUrl } from "../utils/validateUrl.js";
import Review from "../models/Review.js";

const router = express.Router();

/*
  Safely extract JSON from LLM response
*/
function extractJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      return JSON.parse(match[0]);
    }
    throw new Error("LLM did not return valid JSON");
  }
}

/*
  CREATE NEW REVIEW
*/
router.post("/", async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: "URL is required" });
    }

    if (!isValidUrl(url)) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    // 1️⃣ Scrape site
    const content = await scrapeWebsite(url);

    // 2️⃣ Generate UX review via LLM
    const rawReview = await generateUXReview(content);

    // 3️⃣ Parse JSON safely
    const parsedReview = extractJSON(rawReview);

    // Calculate total issues
const allIssues = Object.values(parsedReview.issues || {}).flat();
const totalIssues = allIssues.length;

// Score calculation
parsedReview.score = Math.max(0, 100 - totalIssues * 8);
parsedReview.score = Math.round(parsedReview.score);

// Generate top improvements automatically (first 2 issues)
parsedReview.top_improvements = allIssues.slice(0, 2).map(issue => ({
  before: issue.proof,
  after: issue.why
}));
    /*
      5️⃣ Save review
    */
    await Review.create({
      url,
      review: parsedReview
    });

    res.json(parsedReview);

  } catch (error) {
    console.error("DETAILED ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

/*
  GET ALL REVIEWS
*/
router.get("/all", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

export default router;