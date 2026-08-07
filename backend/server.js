// server.js
// Simple Express backend that powers the VSB College chatbot.
// It sends the user's question + the college knowledge base to Gemini,
// with strict instructions to only answer from that data.

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

// Load the college knowledge base once at startup
const collegeData = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data", "collegeData.json"), "utf-8")
);

// Serve the raw knowledge base so the frontend info pages can render it
app.get("/api/info", (req, res) => {
  res.json(collegeData);
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Build the system instruction the model must follow on every request
function buildSystemPrompt() {
  return `You are the official AI assistant for ${collegeData.collegeName}.

RULES (follow strictly):
1. Only answer using the information given below in COLLEGE_DATA. Do not invent facts, numbers, or names that are not present in COLLEGE_DATA.
2. If the answer is not present in COLLEGE_DATA, politely say the information is not available right now and suggest contacting the college office, instead of guessing.
3. Detect the language style of the user's message (English, Tamil, or Tanglish/Tamil written in English letters) and reply naturally in that same style.
4. Keep answers clear, friendly, and professional, like a helpful college front-office assistant. Use short paragraphs or bullet points where useful.
5. Never mention that you are Gemini or any underlying AI provider; you are "the ${collegeData.collegeName} Assistant".

COLLEGE_DATA:
${JSON.stringify(collegeData, null, 2)}`;
}

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "message is required" });
    }
    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: "Server is missing GEMINI_API_KEY. Add it to backend/.env",
      });
    }

    // Gemini expects alternating user/model turns
    const contents = [
      ...history.map((h) => ({
        role: h.role === "assistant" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: buildSystemPrompt() }],
        },
        contents,
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 800,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return res.status(502).json({ error: "AI service error", details: data });
    }

    const replyParts = data?.candidates?.[0]?.content?.parts || [];
    const reply =
      replyParts
        .filter((p) => typeof p.text === "string" && p.text.trim().length > 0)
        .map((p) => p.text)
        .join("\n") || "Sorry, I couldn't generate a response. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Serve frontend static assets in production if available
const frontendDistPath = path.join(__dirname, "../frontend/dist");
if (fs.existsSync(frontendDistPath)) {
  app.use(express.static(frontendDistPath));
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api/")) return next();
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`VSB Chatbot backend running on http://localhost:${PORT}`);
});
