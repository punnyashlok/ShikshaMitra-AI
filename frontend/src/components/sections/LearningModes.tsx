import {
  Brain,
  ScanLine,
  NotebookPen,
  ChartColumn,
} from "lucide-react";

const modes = [
  {
    icon: <Brain size={40} />,
    title: "AI Tutor",
    description: "Ask doubts and get personalized explanations.",
  },
  {
    icon: <ScanLine size={40} />,
    title: "Scan Textbook",
    description: "Upload textbook pages for instant AI explanations.",
  },
  {
    icon: <NotebookPen size={40} />,
    title: "AI Quiz",
    description: "Generate quizzes from any topic instantly.",
  },
  {
    icon: <ChartColumn size={40} />,
    title: "Track Progress",
    description: "Monitor learning with AI-powered analytics.",
  },
];

export default function LearningModes() {
  return (
    <section className="bg-slate-950 px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">

        <h2 className="mb-4 text-center text-4xl font-bold">
          Choose Your Learning Mode
        </h2>

        <p className="mb-14 text-center text-slate-400">
          Learn the way that works best for you.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {modes.map((mode) => (
            <div
              key={mode.title}
              className="rounded-2xl border border-slate-800 bg-slate-900 p-8 transition duration-300 hover:-translate-y-2 hover:border-blue-500"
            >
              <div className="mb-6 text-blue-400">
                {mode.icon}
              </div>

              <h3 className="mb-3 text-2xl font-semibold">
                {mode.title}
              </h3>

              <p className="text-slate-400">
                {mode.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}