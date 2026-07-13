import type { ReactNode } from "react";
import GlassCard from "./GlassCard";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

export default function StatCard({
  title,
  value,
  icon,
  color,
}: StatCardProps) {
  return (
    <GlassCard>

      <div className="flex items-center justify-between">

        <div>

          <p>{title}</p>

          <h2 className="text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className={color}>
          {icon}
        </div>

      </div>

    </GlassCard>
  );
}