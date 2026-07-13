export default function Hero() {
  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-slate-950 px-6 text-white">
      <div className="max-w-5xl text-center">

        <span className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-400">
          🇮🇳 AI for Bharat
        </span>

        <h1 className="mt-8 text-6xl font-extrabold leading-tight md:text-7xl">
          Learn Smarter with
          <span className="block bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            ShikshaMitra AI
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-3xl text-xl text-slate-300">
          Your multilingual AI learning companion that explains concepts,
          answers doubts, scans textbooks, and creates personalized quizzes
          for every student.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button className="rounded-xl bg-blue-600 px-8 py-4 font-semibold transition hover:bg-blue-700">
            🚀 Get Started
          </button>

          <button className="rounded-xl border border-slate-700 px-8 py-4 transition hover:bg-slate-900">
            📽 Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
}