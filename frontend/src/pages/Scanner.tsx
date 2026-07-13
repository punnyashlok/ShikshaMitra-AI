import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { scanImage } from "../services/scanner";

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export default function Scanner() {
  const [image, setImage] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [text, setText] = useState("");
  const [explanation, setExplanation] = useState("");

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);

  const [answers, setAnswers] = useState<Record<number, string>>({});

  const [submitted, setSubmitted] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setImage(acceptedFiles[0]);

      setText("");
      setExplanation("");

      setQuiz([]);
      setAnswers({});
      setSubmitted(false);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  async function handleExplain() {
    if (!image) return;

    setLoading(true);

    try {
      const result = await scanImage(image);

      setText(result.text);
      setExplanation(result.explanation);

      setQuiz(result.quiz || []);
    } catch (error) {
      console.error(error);
      alert("Failed to scan image.");
    }

    setLoading(false);
  }

  function chooseAnswer(index: number, option: string) {
    if (submitted) return;

    setAnswers({
      ...answers,
      [index]: option,
    });
  }

  const score = quiz.reduce((total, q, index) => {
    return total + (answers[index] === q.answer ? 1 : 0);
  }, 0);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="mb-10 text-5xl font-bold">
        📷 Scan Textbook
      </h1>

      <div
        {...getRootProps()}
        className="cursor-pointer rounded-3xl border-2 border-dashed border-blue-500 p-20 text-center transition hover:bg-slate-900"
      >
        <input {...getInputProps()} />

        <h2 className="text-3xl font-semibold">
          Drag & Drop your textbook image
        </h2>

        <p className="mt-4 text-slate-400">
          or click to browse
        </p>

      </div>

      {image && (

        <div className="mt-10">

          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            className="max-h-[400px] rounded-2xl"
          />

          <button
            onClick={handleExplain}
            className="mt-8 rounded-xl bg-blue-600 px-8 py-4"
          >
            Explain This Page
          </button>

        </div>

      )}

      {loading && (

        <h2 className="mt-10 text-2xl">
          🤖 Reading your textbook...
        </h2>

      )}

      {text && (

        <div className="mt-10 rounded-2xl bg-slate-900 p-8">

          <h2 className="mb-4 text-2xl font-bold">
            📄 Extracted Text
          </h2>

          <p className="whitespace-pre-wrap">
            {text}
          </p>

        </div>

      )}

      {explanation && (

        <div className="mt-10 rounded-2xl bg-slate-900 p-8">

          <h2 className="mb-4 text-2xl font-bold">
            🤖 AI Explanation
          </h2>

          <p className="whitespace-pre-wrap">
            {explanation}
          </p>

        </div>

      )}

      {quiz.length > 0 && (

        <div className="mt-12">

          <h2 className="mb-8 text-4xl font-bold">
            📝 Quiz
          </h2>

          {quiz.map((q, index) => (

            <div
              key={index}
              className="mb-8 rounded-2xl bg-slate-900 p-8"
            >

              <h3 className="mb-6 text-2xl font-semibold">
                {index + 1}. {q.question}
              </h3>

              <div className="space-y-3">

                {q.options.map((option) => {

                  let color = "bg-slate-800";

                  if (submitted) {

                    if (option === q.answer)
                      color = "bg-green-600";

                    else if (answers[index] === option)
                      color = "bg-red-600";

                  } else if (answers[index] === option) {

                    color = "bg-blue-600";

                  }

                  return (

                    <button
                      key={option}
                      onClick={() => chooseAnswer(index, option)}
                      className={`${color} block w-full rounded-xl p-4 text-left transition`}
                    >
                      {option}
                    </button>

                  );

                })}

              </div>

            </div>

          ))}

          {!submitted && (

            <button
              onClick={() => setSubmitted(true)}
              className="rounded-xl bg-emerald-600 px-8 py-4"
            >
              Submit Quiz
            </button>

          )}

          {submitted && (

            <div className="mt-10 rounded-2xl bg-purple-700 p-8">

              <h2 className="text-4xl font-bold">

                🎉 Your Score

              </h2>

              <p className="mt-4 text-3xl">

                {score} / {quiz.length}

              </p>

              <p className="mt-2 text-xl">

                {Math.round((score / quiz.length) * 100)}%

              </p>

            </div>

          )}

        </div>

      )}

    </main>
  );
}