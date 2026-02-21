import axios from "axios";
import * as cheerio from "cheerio";

/*
  scrapeWebsite:
  - Fetches HTML
  - Extracts structured UX-related signals
  - Returns compact structured data for LLM
*/

export async function scrapeWebsite(url) {
  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent": "Mozilla/5.0"
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);

    const title = $("title").text().trim();

    // Headings
    const headings = [];
    $("h1, h2, h3").each((i, el) => {
      if (i < 15) headings.push($(el).text().trim());
    });

    // Buttons
    const buttons = [];
    $("button").each((i, el) => {
      if (i < 10) buttons.push($(el).text().trim());
    });

    // Links
    const links = [];
    $("a").each((i, el) => {
      const text = $(el).text().trim();
      if (text && i < 20) links.push(text);
    });

    // Forms
    const forms = $("form").length;

    // Main text (limited)
    const paragraphs = [];
    $("p").each((i, el) => {
      if (i < 10) paragraphs.push($(el).text().trim());
    });

    return {
      title,
      headings,
      buttons,
      links,
      forms,
      paragraphs
    };

  } catch (error) {
    throw new Error("Failed to scrape website");
  }
}