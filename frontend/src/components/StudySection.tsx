import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  title: string;
  icon: ReactNode;
  children: ReactNode;
}

export default function StudySection({
  title,
  icon,
  children,
}: Props) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      viewport={{
        once: true,
      }}
      className="mt-8 rounded-3xl bg-slate-900 p-8 shadow-xl"
    >
      <div className="mb-6 flex items-center gap-4">

        <div className="rounded-2xl bg-cyan-600 p-3">
          {icon}
        </div>

        <h2 className="text-3xl font-bold">
          {title}
        </h2>

      </div>

      {children}

    </motion.section>
  );
}