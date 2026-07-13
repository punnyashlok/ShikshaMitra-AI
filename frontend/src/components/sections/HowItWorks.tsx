import { CircleHelp, Brain, NotebookPen, Trophy } from "lucide-react";

const steps = [
  {
    icon: <CircleHelp size={36} />,
    title: "Ask a Question",
    desc: "Type or speak any doubt.",
  },
  {
    icon: <Brain size={36} />,
    title: "AI Explains",
    desc: "Simple explanations in your language.",
  },
  {
    icon: <NotebookPen size={36} />,
    title: "Practice Quiz",
    desc: "Generate instant MCQs.",
  },
  {
    icon: <Trophy size={36} />,
    title: "Track Progress",
    desc: "Improve every day with analytics.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-slate-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="mb-4 text-center text-4xl font-bold">
          How It Works
        </h2>

        <p className="mb-16 text-center text-slate-400">
          Learn in four simple steps.
        </p>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="rounded-2xl bg-slate-800 p-8 text-center transition hover:scale-105"
            >
              <div className="mb-5 flex justify-center text-blue-400">
                {step.icon}
              </div>

              <div className="mb-2 text-blue-500 font-bold">
                Step {index + 1}
              </div>

              <h3 className="text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 text-slate-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}