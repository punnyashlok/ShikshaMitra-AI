import { motion } from "framer-motion";
import type { ReactNode } from "react";
import clsx from "clsx";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
      }}
      className={clsx(
        "rounded-3xl",
        "border",
        "border-white/10",
        "bg-white/5",
        "backdrop-blur-xl",
        "shadow-2xl",
        "shadow-cyan-500/10",
        "transition-all",
        "duration-300",
        "hover:border-cyan-400/40",
        "hover:shadow-cyan-500/25",
        "p-8",
        className
      )}
    >
      {children}
    </motion.div>
  );
}