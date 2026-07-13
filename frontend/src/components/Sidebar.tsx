import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Brain,
  ScanLine,
  NotebookPen,
  FileText,
  ChartColumn,
  Settings,
  BookOpen,
} from "lucide-react";

const links = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={22} />,
    path: "/",
  },
  {
    title: "AI Tutor",
    icon: <Brain size={22} />,
    path: "/tutor",
  },
  {
    title: "Scanner",
    icon: <ScanLine size={22} />,
    path: "/scanner",
  },
  {
    title: "Quiz",
    icon: <NotebookPen size={22} />,
    path: "/quiz",
  },
  {
    title: "PDF Learning",
    icon: <FileText size={22} />,
    path: "/pdf",
  },
  {
    title: "Progress",
    icon: <ChartColumn size={22} />,
    path: "/progress",
  },
  {
    title: "Settings",
    icon: <Settings size={22} />,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      <div className="border-b border-slate-800 p-8">

        <div className="flex items-center gap-4">

          <div className="rounded-2xl bg-cyan-600 p-3">
            <BookOpen size={30} />
          </div>

          <div>

            <h1 className="text-2xl font-black text-white">
              ShikshaMitra
            </h1>

            <p className="text-sm text-slate-400">
              AI Learning Platform
            </p>

          </div>

        </div>

      </div>

      <nav className="flex-1 space-y-2 p-6">

        {links.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 transition ${
                isActive
                  ? "bg-cyan-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`
            }
          >

            {item.icon}

            <span className="font-medium">
              {item.title}
            </span>

          </NavLink>

        ))}

      </nav>

      <div className="border-t border-slate-800 p-6">

        <div className="rounded-2xl bg-slate-900 p-5">

          <h3 className="font-bold text-white">
            🚀 Version 3.0
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            AI Tutor • PDF Learning • OCR • Quiz • Flashcards
          </p>

        </div>

      </div>

    </aside>
  );
}