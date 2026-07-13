import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Brain,
  ScanLine,
  NotebookPen,
  ChartColumn,
  Sparkles,
  GraduationCap,
  FileText,
  ArrowRight,
  Flame,
  Trophy,
  Target,
  BookOpen,
} from "lucide-react";

import StatCard from "../components/StatCard";
import GlassCard from "../components/GlassCard";

const actions = [
  {
    title: "AI Tutor",
    description: "Ask questions using text or voice",
    icon: <Brain size={42} />,
    color: "from-blue-600 to-cyan-500",
    path: "/tutor",
  },
  {
    title: "Scan Textbook",
    description: "OCR + AI explanation",
    icon: <ScanLine size={42} />,
    color: "from-emerald-600 to-green-500",
    path: "/scanner",
  },
  {
    title: "Generate Quiz",
    description: "Practice with AI-generated MCQs",
    icon: <NotebookPen size={42} />,
    color: "from-orange-500 to-yellow-500",
    path: "/quiz",
  },
  {
    title: "Learn from PDF",
    description: "Upload chapters and study with AI",
    icon: <FileText size={42} />,
    color: "from-cyan-600 to-sky-500",
    path: "/pdf",
  },
  {
  title: "Study Planner",
  description: "Generate an AI study timetable",
  icon: <BookOpen size={42} />,
  color: "from-indigo-600 to-violet-600",
  path: "/planner",
  },
  {
    title: "My Progress",
    description: "Track quiz scores and learning",
    icon: <ChartColumn size={42} />,
    color: "from-purple-600 to-pink-500",
    path: "/progress",
  },
];

export default function Dashboard() {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 18
      ? "Good Afternoon 🌤️"
      : "Good Evening 🌙";

  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">

      {/* Background */}

      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,#06b6d420,transparent_30%),radial-gradient(circle_at_bottom_left,#7c3aed20,transparent_35%)]" />

      <section className="mx-auto max-w-7xl px-8 py-10">

        {/* ================= HERO ================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950 p-10"
        >

          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

          <div className="relative z-10">

            <div className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-300">
              ✨ AI Powered Learning Platform
            </div>

            <h1 className="mt-6 text-6xl font-black leading-tight">
              {greeting}
            </h1>

            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">
              Welcome to
              <span className="font-bold text-cyan-400">
                {" "}ShikshaMitra AI
              </span>.
              Learn faster using AI Tutor, OCR Scanner,
              PDF Learning, Flashcards, Quizzes,
              Voice Assistant and personalized learning analytics.
            </p>

          </div>

        </motion.div>

        {/* ================= STATS ================= */}

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <StatCard
            title="Subjects"
            value="12+"
            icon={<GraduationCap />}
            color="bg-gradient-to-r from-blue-600 to-cyan-500"
          />

          <StatCard
            title="AI Features"
            value="7"
            icon={<Sparkles />}
            color="bg-gradient-to-r from-purple-600 to-pink-500"
          />

          <StatCard
            title="Learning Mode"
            value="Smart"
            icon={<Brain />}
            color="bg-gradient-to-r from-emerald-600 to-green-500"
          />

          <StatCard
            title="PDF Learning"
            value="NEW"
            icon={<FileText />}
            color="bg-gradient-to-r from-cyan-600 to-sky-500"
          />

        </div>

        {/* ================= QUICK ACTIONS ================= */}

        <div className="mt-20 mb-8">

          <h2 className="text-4xl font-black">
            🚀 Quick Actions
          </h2>

          <p className="mt-2 text-slate-400">
            Everything you need for AI-powered learning.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-5">

          {actions.map((item) => (

            <motion.div
              key={item.title}
              whileHover={{
                y: -10,
              }}
              transition={{
                duration: 0.25,
              }}
            >

              <GlassCard className="flex h-full flex-col">

                <div
                  className={`inline-flex rounded-2xl bg-gradient-to-r ${item.color} p-4`}
                >
                  {item.icon}
                </div>

                <h2 className="mt-6 text-2xl font-bold">
                  {item.title}
                </h2>

                <p className="mt-3 flex-1 text-slate-400">
                  {item.description}
                </p>

                <button
                  onClick={() => navigate(item.path)}
                  className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 py-3 font-semibold transition hover:scale-105"
                >
                  Open
                  <ArrowRight size={18} />
                </button>

              </GlassCard>

            </motion.div>

          ))}

        </div>
                {/* ================= LEARNING ANALYTICS ================= */}

        <div className="mt-20">

          <h2 className="text-4xl font-black">
            📊 Learning Analytics
          </h2>

          <p className="mt-2 text-slate-400">
            Stay consistent and track your learning journey.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <GlassCard>

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-orange-500/20 p-4">
                  <Flame className="text-orange-400" size={32} />
                </div>

                <div>

                  <p className="text-slate-400">
                    Current Streak
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-orange-400">
                    12 Days
                  </h2>

                </div>

              </div>

            </GlassCard>

            <GlassCard>

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-yellow-500/20 p-4">
                  <Trophy className="text-yellow-400" size={32} />
                </div>

                <div>

                  <p className="text-slate-400">
                    XP Earned
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-yellow-400">
                    1850
                  </h2>

                </div>

              </div>

            </GlassCard>

            <GlassCard>

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-cyan-500/20 p-4">
                  <BookOpen className="text-cyan-400" size={32} />
                </div>

                <div>

                  <p className="text-slate-400">
                    PDFs Studied
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-cyan-400">
                    24
                  </h2>

                </div>

              </div>

            </GlassCard>

            <GlassCard>

              <div className="flex items-center gap-4">

                <div className="rounded-2xl bg-pink-500/20 p-4">
                  <Target className="text-pink-400" size={32} />
                </div>

                <div>

                  <p className="text-slate-400">
                    Quiz Accuracy
                  </p>

                  <h2 className="mt-2 text-4xl font-black text-pink-400">
                    94%
                  </h2>

                </div>

              </div>

            </GlassCard>

          </div>

        </div>

        {/* ================= DAILY GOALS ================= */}

        <div className="mt-20 grid gap-8 lg:grid-cols-2">

          <GlassCard>

            <h2 className="text-3xl font-black">
              🎯 Today's Goals
            </h2>

            <div className="mt-8 space-y-5">

              <div className="rounded-2xl bg-slate-800 p-5">
                ✅ Complete one AI Quiz
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                📄 Study one PDF Chapter
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                🃏 Revise 20 Flashcards
              </div>

              <div className="rounded-2xl bg-slate-800 p-5">
                💬 Ask AI Tutor 5 Questions
              </div>

            </div>

          </GlassCard>

          <GlassCard>

            <h2 className="text-3xl font-black">
              🏆 Achievements
            </h2>

            <div className="mt-8 grid grid-cols-2 gap-5">

              <div className="rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-center">

                <h3 className="text-4xl">
                  🥇
                </h3>

                <p className="mt-3 font-semibold">
                  First Quiz
                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-center">

                <h3 className="text-4xl">
                  📚
                </h3>

                <p className="mt-3 font-semibold">
                  PDF Master
                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-emerald-600 to-green-600 p-6 text-center">

                <h3 className="text-4xl">
                  🤖
                </h3>

                <p className="mt-3 font-semibold">
                  AI Explorer
                </p>

              </div>

              <div className="rounded-2xl bg-gradient-to-r from-orange-600 to-red-600 p-6 text-center">

                <h3 className="text-4xl">
                  🔥
                </h3>

                <p className="mt-3 font-semibold">
                  10 Day Streak
                </p>

              </div>

            </div>

          </GlassCard>

        </div>

        {/* ================= RECENT ACTIVITY ================= */}

        <div className="mt-20">

          <h2 className="text-4xl font-black">
            📚 Recent Activity
          </h2>

          <div className="mt-8">

            <GlassCard>

              <div className="space-y-6">

                <div className="flex items-center justify-between border-b border-slate-700 pb-4">

                  <div>

                    <h3 className="font-bold">
                      Biology Chapter 5
                    </h3>

                    <p className="text-slate-400">
                      AI Notes Generated
                    </p>

                  </div>

                  <span className="text-cyan-400">
                    Today
                  </span>

                </div>

                <div className="flex items-center justify-between border-b border-slate-700 pb-4">

                  <div>

                    <h3 className="font-bold">
                      Physics Quiz
                    </h3>

                    <p className="text-slate-400">
                      Score: 18 / 20
                    </p>

                  </div>

                  <span className="text-green-400">
                    Yesterday
                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="font-bold">
                      AI Tutor
                    </h3>

                    <p className="text-slate-400">
                      14 Questions Asked
                    </p>

                  </div>

                  <span className="text-purple-400">
                    This Week
                  </span>

                </div>

              </div>

            </GlassCard>

          </div>

        </div>

      </section>

    </main>
  );
}