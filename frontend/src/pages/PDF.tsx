import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  BookOpen,
  Brain,
  Lightbulb,
  GraduationCap,
  FileQuestion,
  Sparkles,
} from "lucide-react";

import { uploadPDF } from "../services/pdf";

import type {
  StudyNotes,
  QuizQuestion,
  Flashcard,
} from "../services/pdf";

import PDFChat from "../components/PDFChat";
import StudySection from "../components/StudySection";
import FlashcardViewer from "../components/FlashcardViewer";

export default function PDF() {
  const [file, setFile] = useState<File | null>(null);

  const [notes, setNotes] =
    useState<StudyNotes | null>(null);

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {

    if (acceptedFiles.length === 0) return;

    setFile(acceptedFiles[0]);

    setNotes(null);

    setQuiz([]);
    setFlashcards([]);

  }, []);

  const {
    getRootProps,
    getInputProps,
  } = useDropzone({

    onDrop,

    multiple: false,

    accept: {
      "application/pdf": [],
    },

  });

  async function handleUpload() {

    if (!file) return;

    setLoading(true);

    try {

      const result = await uploadPDF(file);

      setNotes(result.notes);

      setFlashcards(result.flashcards);

      setQuiz(result.quiz);

    } catch (error) {

      console.error(error);

      alert("Failed to process PDF.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-5xl font-black">
          📄 AI Study Workspace
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-slate-400">
          Upload any textbook chapter and let
          ShikshaMitra AI generate notes,
          concepts, summaries, quizzes,
          flashcards and answer questions.
        </p>

        <div
          {...getRootProps()}
          className="mt-10 cursor-pointer rounded-3xl border-2 border-dashed border-cyan-500 p-20 text-center transition hover:bg-slate-900"
        >

          <input {...getInputProps()} />

          <BookOpen
            size={70}
            className="mx-auto mb-6 text-cyan-400"
          />

          <h2 className="text-3xl font-bold">
            Drag & Drop your PDF
          </h2>

          <p className="mt-3 text-slate-400">
            or click here to browse
          </p>

        </div>

        {file && (

          <div className="mt-8 rounded-3xl bg-slate-900 p-6">

            <p className="text-xl">
              📄 <strong>{file.name}</strong>
            </p>

            <button
              onClick={handleUpload}
              disabled={loading}
              className="mt-6 rounded-xl bg-cyan-600 px-8 py-4 font-semibold transition hover:bg-cyan-700 disabled:opacity-50"
            >
              {loading
                ? "Generating AI Notes..."
                : "Generate Study Material"}
            </button>

          </div>

        )}

        {loading && (

          <div className="mt-10 rounded-3xl bg-slate-900 p-8">

            <h2 className="text-3xl font-bold">
              🤖 AI is reading your PDF...
            </h2>

            <p className="mt-4 text-slate-400">
              Generating notes, concepts,
              quizzes and explanations...
            </p>

          </div>

        )}
                {/* ============================= */}
        {/* AI Study Notes */}
        {/* ============================= */}

        {notes && (

          <>

            <StudySection
              title="AI Summary"
              icon={<BookOpen />}
            >

              <p className="whitespace-pre-wrap leading-8 text-slate-300">
                {notes.summary}
              </p>

            </StudySection>

            <StudySection
              title="Key Concepts"
              icon={<Brain />}
            >

              <div className="space-y-4">

                {notes.key_concepts.map((concept, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-slate-800 p-5"
                  >

                    <span className="font-bold text-cyan-400">
                      {index + 1}.
                    </span>

                    <span className="ml-3">
                      {concept}
                    </span>

                  </div>

                ))}

              </div>

            </StudySection>

            <StudySection
              title="Important Points"
              icon={<Sparkles />}
            >

              <div className="space-y-4">

                {notes.important_points.map((point, index) => (

                  <div
                    key={index}
                    className="rounded-xl border-l-4 border-cyan-500 bg-slate-800 p-5"
                  >
                    {point}
                  </div>

                ))}

              </div>

            </StudySection>

            <StudySection
              title="Difficult Terms"
              icon={<GraduationCap />}
            >

              <div className="grid gap-5 md:grid-cols-2">

                {notes.difficult_terms.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-slate-800 p-6"
                  >

                    <h3 className="text-xl font-bold text-cyan-400">
                      {item.word}
                    </h3>

                    <p className="mt-3 text-slate-300">
                      {item.meaning}
                    </p>

                  </div>

                ))}

              </div>

            </StudySection>

            <StudySection
              title="Real Life Examples"
              icon={<Lightbulb />}
            >

              <div className="space-y-5">

                {notes.real_life_examples.map((example, index) => (

                  <div
                    key={index}
                    className="rounded-2xl bg-slate-800 p-6"
                  >
                    🌍 {example}
                  </div>

                ))}

              </div>

            </StudySection>

            <StudySection
              title="Exam Tips"
              icon={<FileQuestion />}
            >

              <div className="space-y-4">

                {notes.exam_tips.map((tip, index) => (

                  <div
                    key={index}
                    className="rounded-xl bg-emerald-900/40 p-5"
                  >
                    ✅ {tip}
                  </div>

                ))}

              </div>

            </StudySection>

          </>

        )}{/* ============================= */}
{/* AI Flashcards */}
{/* ============================= */}

{flashcards.length > 0 && (

  <FlashcardViewer
    flashcards={flashcards}
  />

)}
                {/* ============================= */}
        {/* AI Generated Quiz */}
        {/* ============================= */}

        {quiz.length > 0 && (

          <StudySection
            title="AI Generated Quiz"
            icon={<FileQuestion />}
          >

            <div className="space-y-8">

              {quiz.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-slate-800 p-6"
                >

                  <h3 className="mb-5 text-xl font-bold">
                    {index + 1}. {item.question}
                  </h3>

                  <div className="grid gap-3">

                    {item.options.map((option) => (

                      <div
                        key={option}
                        className="rounded-xl border border-slate-700 bg-slate-900 p-4 transition hover:border-cyan-500 hover:bg-slate-800"
                      >
                        {option}
                      </div>

                    ))}

                  </div>

                  <div className="mt-5 rounded-xl border border-emerald-700 bg-emerald-900/30 p-4">

                    <span className="font-semibold text-emerald-400">
                      Correct Answer:
                    </span>

                    <span className="ml-2">
                      {item.answer}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </StudySection>

        )}

        {/* ============================= */}
        {/* Chat with PDF */}
        {/* ============================= */}

        {notes && <PDFChat />}

      </div>

    </main>

  );

}