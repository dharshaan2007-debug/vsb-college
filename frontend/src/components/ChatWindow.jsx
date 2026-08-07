import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import axios from "axios";
import { Send, Loader2 } from "lucide-react";
import ChatBubble from "./ChatBubble.jsx";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL !== undefined && import.meta.env.VITE_API_BASE_URL !== ""
    ? import.meta.env.VITE_API_BASE_URL
    : import.meta.env.PROD
    ? ""
    : "http://localhost:5000";

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
      const { data } = await axios.post(`${API_BASE}/api/chat`, {
        message: content,
        history,
      });
      setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I'm having trouble reaching the server right now. Please make sure the backend is running and try again.",
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
