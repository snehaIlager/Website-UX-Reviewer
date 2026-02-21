# AI Notes

## LLM Provider

This application uses:

- Provider: Groq
- Model: LLaMA 3.1 (8B instant)
- Reason: Fast inference, low latency, structured JSON output capability.

---

## What AI Was Used For

AI was used to:

- Generate structured UX issues from scraped website data.
- Categorize issues into UX domains.
- Provide reasoning and proof grounded in content.
- Suggest improvement recommendations.

AI was NOT used for:

- Business logic
- Score calculation
- Database structure
- API routing
- Scraping logic

---

## What I Verified Manually

- JSON structure consistency
- Safe JSON parsing with fallback extraction
- Score normalization logic
- Category mapping
- Issue count validation
- Error handling flow

I adjusted prompts to:

- Reduce hallucinated UX issues
- Enforce strict JSON-only responses
- Prevent generic advice not grounded in content

---

## Prompt Engineering Approach

- Structured instruction format
- Clear output schema
- Temperature reduction for stability
- Explicit grounding rules
- Strict JSON enforcement

---

## Limitations

- LLM does not visually interpret layout
- No screenshot-based analysis
- Depends on structured text extraction
- Heuristic scoring is rule-based, not ML-trained
