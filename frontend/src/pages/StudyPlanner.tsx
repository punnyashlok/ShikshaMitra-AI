import { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  BookOpen,
  Brain,
  Sparkles,
  Upload,
} from "lucide-react";

import GlassCard from "../components/GlassCard";

import {
  generateStudyPlan,
} from "../services/studyPlanner";

import type {
  StudyPlannerResponse,
} from "../services/studyPlanner";

export default function StudyPlanner() {

  const [subject, setSubject] =
    useState("");

  const [examDate, setExamDate] =
    useState("");

  const [studyHours, setStudyHours] =
    useState(2);

  const [difficulty, setDifficulty] =
    useState("Medium");

  const [syllabusFile, setSyllabusFile] =
    useState<File | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [plan, setPlan] =
    useState<StudyPlannerResponse | null>(null);

  async function handleGenerate() {

    if (
      !subject ||
      !examDate ||
      studyHours <= 0 ||
      !syllabusFile
    ) {
      alert(
        "Please complete all fields and upload your syllabus PDF."
      );
      return;
    }

    setLoading(true);

    try {

      const result =
        await generateStudyPlan(
          syllabusFile,
          subject,
          examDate,
          studyHours,
          difficulty
        );

      setPlan(result);

    } catch (error) {

      console.error(error);

      alert(
        "Failed to generate study plan."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <div className="mx-auto max-w-7xl">

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <h1 className="text-5xl font-black">
            📅 AI Study Planner
          </h1>

          <p className="mt-4 max-w-3xl text-lg text-slate-400">
            Upload your syllabus PDF and let AI create a personalized study
            schedule based on your exam date, available study hours and
            difficulty level.
          </p>

        </motion.div>

        <GlassCard className="mt-10">

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">
                <BookOpen size={18} />
                Subject
              </label>

              <input
                value={subject}
                onChange={(e) =>
                  setSubject(e.target.value)
                }
                placeholder="Example: Biology"
                className="w-full rounded-xl bg-slate-800 p-4 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Calendar size={18} />
                Exam Date
              </label>

              <input
                type="date"
                value={examDate}
                onChange={(e) =>
                  setExamDate(e.target.value)
                }
                className="w-full rounded-xl bg-slate-800 p-4 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Clock size={18} />
                Study Hours Per Day
              </label>

              <input
                type="number"
                min={1}
                max={12}
                value={studyHours}
                onChange={(e) =>
                  setStudyHours(
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-xl bg-slate-800 p-4 outline-none"
              />

            </div>

            <div>

              <label className="mb-2 flex items-center gap-2 font-semibold">
                <Brain size={18} />
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="w-full rounded-xl bg-slate-800 p-4 outline-none"
              >
                <option>Easy</option>
                <option>Medium</option>
                <option>Hard</option>
              </select>

            </div>

            <div className="md:col-span-2">

              <label className="mb-3 flex items-center gap-2 font-semibold">
                <Upload size={18} />
                Upload Syllabus PDF
              </label>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) => {

                  if (
                    e.target.files &&
                    e.target.files.length > 0
                  ) {

                    setSyllabusFile(
                      e.target.files[0]
                    );

                  }

                }}
                className="w-full rounded-xl border border-dashed border-cyan-500/30 bg-slate-800 p-4"
              />

              {syllabusFile && (

                <div className="mt-3 rounded-xl bg-cyan-500/10 p-3 text-cyan-300">

                  📄 {syllabusFile.name}

                </div>

              )}

            </div>

          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="mt-8 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 px-10 py-4 font-bold transition hover:scale-105 disabled:opacity-50"
          >

            <Sparkles size={20} />

            {loading
              ? "Generating Study Plan..."
              : "Generate AI Study Plan"}

          </button>

        </GlassCard>
                {plan && (

          <div className="mt-12 space-y-8">

            {/* ================= Overview ================= */}

            <GlassCard>

              <h2 className="text-3xl font-black">
                📖 Study Overview
              </h2>

              <p className="mt-6 whitespace-pre-wrap leading-8 text-slate-300">
                {plan.overview}
              </p>

            </GlassCard>

            {/* ================= Daily Plan ================= */}

            <GlassCard>

              <h2 className="text-3xl font-black">
                📅 Daily Study Schedule
              </h2>

              <div className="mt-8 grid gap-6">

                {plan.daily_plan.map((item, index) => (

                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6"
                  >

                    <div className="flex items-center justify-between">

                      <h3 className="text-2xl font-bold text-cyan-400">
                        {item.day}
                      </h3>

                      <span className="rounded-full bg-cyan-500/20 px-4 py-1 text-sm text-cyan-300">
                        Day {index + 1}
                      </span>

                    </div>

                    <div className="mt-6 space-y-3">

                      {item.topics.map((topic, i) => (

                        <div
                          key={i}
                          className="rounded-xl bg-slate-800 p-4 transition hover:bg-slate-700"
                        >
                          ✅ {topic}
                        </div>

                      ))}

                    </div>

                  </motion.div>

                ))}

              </div>

            </GlassCard>

            {/* ================= Revision Tips ================= */}

            <GlassCard>

              <h2 className="text-3xl font-black">
                💡 AI Revision Tips
              </h2>

              <div className="mt-8 grid gap-4">

                {plan.revision_tips.map((tip, index) => (

                  <div
                    key={index}
                    className="rounded-xl border-l-4 border-emerald-500 bg-emerald-950/30 p-5"
                  >
                    {tip}
                  </div>

                ))}

              </div>

            </GlassCard>

          </div>

        )}

      </div>

    </main>

  );

}