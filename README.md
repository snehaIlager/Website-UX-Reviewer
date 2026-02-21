# Website UX Reviewer

A full-stack web application that analyzes a website’s user experience using automated scraping and LLM-based evaluation.

## 🚀 Features

- Paste any website URL
- Scrapes structured content (title, headings, buttons, links, forms, paragraphs)
- Generates UX review with:
  - Score (0–100)
  - Categorized issues (Clarity, Layout, Navigation, Accessibility, Trust)
  - Why explanation
  - Proof grounded in page content
  - Top improvements (Before / After)
- Stores all past reviews
- Reviews page to revisit previous reports
- Status page to verify:
  - Backend health
  - Database connection
  - LLM connectivity
- Export report (Print to PDF)

---

## 🏗 Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios

Backend:
- Node.js
- Express.js
- MongoDB Atlas
- Cheerio (HTML parsing)
- Groq LLM API (LLaMA model)

---

## 🧠 How It Works

1. User enters a website URL.
2. Backend validates the URL.
3. Website is scraped using Cheerio.
4. Structured data is sent to the LLM.
5. LLM returns structured UX issues.
6. Backend:
   - Parses JSON safely
   - Calculates UX score based on issue count
   - Generates top improvements
7. Review is stored in MongoDB.
8. Results are displayed in structured format.

---

## 🛠 How To Run Locally

### 1. Clone the repository

### 2. Setup backend

Create `.env` inside `/server`:

Add ur keys - 
MONGO_URI=your_mongodb_uri
GROQ_API_KEY=your_groq_api_key
PORT=5000

Run backend:
node app.js


---

### 3. Setup frontend
cd client
npm install
npm run dev


Frontend runs on: on local host 5173 an backend runs on 5000

## 🌍 Deployment

Frontend: Vercel  
Backend: Render  
Database: MongoDB Atlas