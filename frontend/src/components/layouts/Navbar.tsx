import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">

      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">

        <Link
          to="/"
          className="text-2xl font-bold text-cyan-400"
        >
          ShikshaMitra AI
        </Link>

        <div className="hidden items-center gap-8 text-slate-300 md:flex">

          <Link to="/">Dashboard</Link>

          <Link to="/tutor">Tutor</Link>

          <Link to="/scanner">Scanner</Link>

          <Link to="/pdf">PDF</Link>

          <Link to="/planner">Planner</Link>

        </div>

      </div>

    </nav>
  );
}