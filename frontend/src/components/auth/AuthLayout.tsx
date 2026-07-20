import type { ReactNode } from "react";
import { GraduationCap } from "lucide-react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-6">

      {/* Background Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-cyan-500/20 blur-[150px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-blue-700/20 blur-[150px]" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-slate-700/60 bg-slate-900/80 p-10 shadow-2xl backdrop-blur-xl">

        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">

          <div className="mb-5 rounded-3xl bg-cyan-500/20 p-5">
            <GraduationCap
              size={46}
              className="text-cyan-400"
            />
          </div>

          <h1 className="text-4xl font-black tracking-tight text-white">
            ShikshaMitra AI
          </h1>

          <p className="mt-2 text-center text-sm text-slate-400">
            Your Intelligent Learning Companion
          </p>

        </div>

        {/* Heading */}
        <div className="mb-8">

          <h2 className="text-3xl font-bold text-white">
            {title}
          </h2>

          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>

        </div>

        {/* Content */}
        {children}

      </div>

    </main>
  );
}