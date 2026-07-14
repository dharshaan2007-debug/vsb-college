import { Bot, User } from "lucide-react";

export default function ChatBubble({ role, text }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-2.5 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-ink text-white" : "bg-volt/15 text-circuit"
        }`}
      >
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-ink text-white rounded-tr-sm"
            : "bg-white border border-circuit/10 text-ink rounded-tl-sm"
        }`}
      >
        {text}
      </div>
    </div>
  );
}
