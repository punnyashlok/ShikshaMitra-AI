import { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import { askAI } from "../services/api";

export default function Tutor() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setQuestion(transcript);
    }
  }, [transcript]);

  async function handleAsk() {
    if (!question.trim()) return;

    setLoading(true);

    try {
      const response = await askAI(question);

      setAnswer(response);

      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();

        const speech = new SpeechSynthesisUtterance(response);

        speech.rate = 1;
        speech.pitch = 1;

        window.speechSynthesis.speak(speech);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to get AI response.");
    }

    setLoading(false);
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <main className="min-h-screen bg-slate-950 p-10 text-white">
        <h1 className="text-4xl font-bold">
          Your browser doesn't support Speech Recognition.
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="mb-8 text-5xl font-bold">
        🎙 AI Voice Tutor
      </h1>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything..."
        className="h-40 w-full rounded-2xl bg-slate-800 p-5"
      />

      <div className="mt-6 flex flex-wrap gap-4">

        <button
          onClick={() => SpeechRecognition.startListening({
            continuous: true,
          })}
          className="rounded-xl bg-green-600 px-8 py-4"
        >
          🎤 Start Listening
        </button>

        <button
          onClick={() => SpeechRecognition.stopListening()}
          className="rounded-xl bg-red-600 px-8 py-4"
        >
          ⏹ Stop
        </button>

        <button
          onClick={resetTranscript}
          className="rounded-xl bg-gray-700 px-8 py-4"
        >
          🗑 Clear
        </button>

        <button
          onClick={handleAsk}
          className="rounded-xl bg-blue-600 px-8 py-4"
        >
          🤖 Ask AI
        </button>

      </div>

      <p className="mt-6 text-lg">
        Status:
        {" "}
        {listening ? "🎤 Listening..." : "Idle"}
      </p>

      {loading && (
        <h2 className="mt-8 text-2xl">
          Thinking...
        </h2>
      )}

      {answer && (
        <div className="mt-10 rounded-2xl bg-slate-900 p-8 whitespace-pre-wrap">

          <h2 className="mb-4 text-3xl font-bold">
            🤖 AI Response
          </h2>

          {answer}

        </div>
      )}

    </main>
  );
}