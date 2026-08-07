import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";
import ChatBubble from "./ChatBubble.jsx";

import collegeData from "../data/collegeData.json";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== ""
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.PROD
    ? ""
    : "http://localhost:5000";

const GEMINI_API_KEY =
  import.meta.env.VITE_GEMINI_API_KEY ||
  atob("QVEuQWI4Uk42SjlkaUswWXZFazFZbGhXY29XSHVkOEhCQWFUREktVFZ0YVJsYzRBMHRHS0E=");

const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

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

async function callDirectGemini(message, history) {
  const contents = [
    ...history.map((h) => ({
      role: h.role === "assistant" ? "model" : "user",
      parts: [{ text: h.text }],
    })),
    { role: "user", parts: [{ text: message }] },
  ];

  const response = await fetch(GEMINI_DIRECT_URL, {
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
    throw new Error(data?.error?.message || "Direct Gemini API call failed");
  }

  const replyParts = data?.candidates?.[0]?.content?.parts || [];
  const reply = replyParts
    .filter((p) => typeof p.text === "string" && p.text.trim().length > 0)
    .map((p) => p.text)
    .join("\n");

  if (!reply) {
    throw new Error("Empty reply from Gemini API");
  }
  return reply;
}

const ChatWindow = forwardRef(function ChatWindow(_, ref) {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Vanakkam! I'm the VSB Engineering College Assistant. Ask me about admissions, departments, fees, placements, scholarships, hostel, or campus facilities.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage(text) {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const history = messages.map((m) => ({ role: m.role, text: m.text }));
    setMessages((prev) => [...prev, { role: "user", text: content }]);
    setInput("");
    setLoading(true);

    try {
      let replyText = "";
      try {
        const { data } = await axios.post(`${API_BASE}/api/chat`, {
          message: content,
          history,
        });
        if (data && typeof data.reply === "string" && data.reply.trim().length > 0) {
          replyText = data.reply;
        } else {
          throw new Error("Invalid or empty reply from backend");
        }
      } catch (backendErr) {
        console.warn(
          "Backend /api/chat unavailable or failed. Falling back to direct Gemini API call...",
          backendErr
        );
        replyText = await callDirectGemini(content, history);
      }

      setMessages((prev) => [...prev, { role: "assistant", text: replyText }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I'm having trouble generating a response right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  // allow parent (QuickActions on Home) to trigger a message
  useImperativeHandle(ref, () => ({
    ask: (text) => sendMessage(text),
  }));

  return (
    <div className="flex flex-col h-[520px] rounded-2xl border border-circuit/10 bg-mist/60 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} text={m.text} />
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-steel text-sm pl-10">
            <Loader2 className="w-4 h-4 animate-spin" />
            Thinking...
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage();
        }}
        className="flex items-center gap-2 border-t border-circuit/10 bg-white p-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask in English, Tamil, or Tanglish..."
          className="flex-1 rounded-full border border-circuit/15 px-4 py-2 text-sm outline-none focus:border-volt focus:ring-2 focus:ring-volt/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-ink text-white hover:bg-circuit transition-colors disabled:opacity-50"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
});

export default ChatWindow;
