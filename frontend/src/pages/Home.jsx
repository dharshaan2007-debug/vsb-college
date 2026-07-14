import { useRef } from "react";
import ChatWindow from "../components/ChatWindow.jsx";
import QuickActions from "../components/QuickActions.jsx";

const promptFor = {
  Admissions: "Tell me about the admission process and eligibility.",
  Departments: "What departments and courses do you offer?",
  Placements: "What are the latest placement statistics?",
  Fees: "What is the fee structure?",
  Scholarships: "What scholarships are available and what is the eligibility?",
  Facilities: "Tell me about the campus facilities.",
  "Contact Us": "How can I contact the college?",
};

export default function Home() {
  const chatRef = useRef(null);

  function handleQuickAsk(label) {
    const prompt = promptFor[label] ?? label;
    chatRef.current?.ask(prompt);
  }

  return (
    <div className="bg-grid bg-grid">
      <section className="max-w-6xl mx-auto px-5 pt-14 pb-8 text-center">
        <p className="inline-block text-xs tracking-widest font-semibold text-volt bg-ink px-3 py-1 rounded-full mb-4">
          24/7 AI CAMPUS ASSISTANT
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-ink max-w-2xl mx-auto leading-tight">
          Every answer about VSB Engineering College, in one conversation.
        </h1>
        <p className="text-steel mt-3 max-w-xl mx-auto">
          Admissions, departments, fees, placements, scholarships, and campus
          life — ask in English, Tamil, or Tanglish.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-5 pb-6">
        <ChatWindow ref={chatRef} />
      </section>

      <section className="max-w-6xl mx-auto px-5 pb-16">
        <h2 className="font-display text-sm font-semibold text-steel tracking-widest mb-3">
          QUICK ACTIONS
        </h2>
        <QuickActions onAsk={handleQuickAsk} />
      </section>
    </div>
  );
}
