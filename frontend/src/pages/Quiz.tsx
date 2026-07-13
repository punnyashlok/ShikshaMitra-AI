import { useState } from "react";
import { generateQuiz } from "../services/quiz";
import { saveQuizResult } from "../utils/storage";

interface Question {
  question: string;
  options: string[];
  answer: string;
}

export default function Quiz() {
  const [topic, setTopic] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!topic.trim()) {
      alert("Please enter a topic.");
      return;
    }

    setLoading(true);

    try {
      const quiz = await generateQuiz(topic);
      console.log("Quiz:", quiz);

      setQuestions(quiz);
      setAnswers({});
      setSubmitted(false);
    } catch (error) {
      console.error(error);
      alert("Failed to generate quiz.");
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(index: number, option: string) {
    if (submitted) return;

    setAnswers((prev) => ({
      ...prev,
      [index]: option,
    }));
  }

  function scoreQuiz() {
    if (submitted) return;

    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting.");
      return;
    }

    console.log("Selected Answers:", answers);
    console.log("Correct Answers:", questions);

    const quizScore = questions.reduce((total, question, index) => {
      const selected = (answers[index] ?? "").trim().toLowerCase();
      const correct = question.answer.trim().toLowerCase();

      console.log(
        `Q${index + 1}`,
        "Selected:",
        selected,
        "Correct:",
        correct
      );

      return total + (selected === correct ? 1 : 0);
    }, 0);

    saveQuizResult({
      topic,
      score: quizScore,
      total: questions.length,
      percentage: Math.round((quizScore / questions.length) * 100),
      date: new Date().toLocaleString(),
    });

    setSubmitted(true);
  }

  const score = questions.reduce((total, question, index) => {
    const selected = (answers[index] ?? "").trim().toLowerCase();
    const correct = question.answer.trim().toLowerCase();

    return total + (selected === correct ? 1 : 0);
  }, 0);

  const percentage =
    questions.length === 0
      ? 0
      : Math.round((score / questions.length) * 100);

  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="mb-8 text-5xl font-bold">
        📝 AI Quiz Generator
      </h1>

      <div className="flex gap-4">

        <input
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic..."
          className="flex-1 rounded-xl bg-slate-800 p-4 outline-none"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-xl bg-blue-600 px-8 py-4"
        >
          {loading ? "Generating..." : "Generate"}
        </button>

      </div>

      {questions.map((question, index) => (

        <div
          key={index}
          className="mt-10 rounded-2xl bg-slate-900 p-8"
        >

          <h2 className="mb-6 text-2xl font-bold">
            {index + 1}. {question.question}
          </h2>

          <div className="space-y-4">

            {question.options.map((option) => {

              let bg = "bg-slate-800";

              if (submitted) {
                if (option === question.answer)
                  bg = "bg-green-600";
                else if (answers[index] === option)
                  bg = "bg-red-600";
              } else if (answers[index] === option) {
                bg = "bg-blue-600";
              }

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => selectAnswer(index, option)}
                  disabled={submitted}
                  className={`${bg} block w-full rounded-xl p-4 text-left`}
                >
                  {option}
                </button>
              );
            })}

          </div>

        </div>

      ))}

      {questions.length > 0 && !submitted && (

        <button
          onClick={scoreQuiz}
          className="mt-10 rounded-xl bg-emerald-600 px-8 py-4"
        >
          Submit Quiz
        </button>

      )}

      {submitted && (

        <div className="mt-12 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-8">

          <h2 className="text-4xl font-bold">
            🎉 Quiz Completed
          </h2>

          <p className="mt-4 text-3xl">
            Score: {score} / {questions.length}
          </p>

          <p className="mt-2 text-xl">
            Percentage: {percentage}%
          </p>

        </div>

      )}

    </main>
  );
}