import Groq from "groq-sdk";

/*
  generateUXReview:
  - Receives structured content
  - Performs grounded UX analysis
  - Returns strict JSON
*/

export async function generateUXReview(content) {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  });

  const prompt = `
You are a senior UX auditor.

IMPORTANT RULES:
- Only analyze based on provided content.
- Do NOT assume anything not present.
- Avoid generic advice.
- Reference actual headings, buttons, links, or text in "proof".

Return STRICT JSON only.

Required format:

{
  "score": number,
  "issues": {
    "clarity": [],
    "layout": [],
    "navigation": [],
    "accessibility": [],
    "trust": []
  },
  "top_improvements": []
}

Each issue must include:
{
  "title": "",
  "why": "",
  "proof": ""
}

Website data:
${JSON.stringify(content)}
`;

  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3
  });

  return response.choices[0].message.content;
}