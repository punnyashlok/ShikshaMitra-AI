import { useRef, useState } from "react";
import { Bot, Send, User } from "lucide-react";

import { askPDF } from "../services/pdfChat";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function PDFChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Ask me anything about the uploaded PDF.",
    },
  ]);

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  async function sendMessage() {
    if (!question.trim()) return;

    const currentQuestion = question;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentQuestion,
      },
    ]);

    setQuestion("");
    setLoading(true);

    try {
      const response = await askPDF(currentQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.answer,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "❌ Unable to answer your question.",
        },
      ]);
    } finally {
      setLoading(false);

      setTimeout(() => {
        bottomRef.current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 100);
    }
  }

  return (
    <div className="mt-10 rounded-3xl bg-slate-900 p-6">

      <h2 className="mb-6 text-3xl font-bold">
        💬 Chat with your PDF
      </h2>

      <div className="h-[450px] overflow-y-auto rounded-2xl bg-slate-950 p-6">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`mb-6 flex ${
              message.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] rounded-2xl p-4 ${
                message.role === "user"
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >

              <div className="mb-2 flex items-center gap-2">

                {message.role === "assistant"
                  ? <Bot size={18} />
                  : <User size={18} />}

                <span className="font-semibold">
                  {message.role === "assistant"
                    ? "ShikshaMitra AI"
                    : "You"}
                </span>

              </div>

              <p className="whitespace-pre-wrap">
                {message.content}
              </p>

            </div>

          </div>

        ))}

        {loading && (
          <div className="rounded-xl bg-slate-800 p-4">
            🤖 Thinking...
          </div>
        )}

        <div ref={bottomRef} />

      </div>

      <div className="mt-6 flex gap-4">

        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl bg-slate-800 p-4 outline-none"
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="rounded-xl bg-cyan-600 px-6 hover:bg-cyan-700 disabled:opacity-50"
        >
          <Send />
        </button>

      </div>

    </div>
  );
}