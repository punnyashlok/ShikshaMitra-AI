import { ChartColumn, Target, Trophy } from "lucide-react";
import StatCard from "../components/StatCard";

export default function Progress() {
  return (
    <main className="min-h-screen bg-slate-950 p-10 text-white">

      <h1 className="text-5xl font-bold mb-10">
        📈 Learning Progress
      </h1>

      <div className="grid gap-6 md:grid-cols-3">

        <StatCard
          title="Quizzes"
          value={10}
          icon={<ChartColumn />}
          color="bg-blue-600"
        />

        <StatCard
          title="Average"
          value="82%"
          icon={<Target />}
          color="bg-green-600"
        />

        <StatCard
          title="Best Score"
          value="96%"
          icon={<Trophy />}
          color="bg-purple-600"
        />

      </div>

    </main>
  );
}