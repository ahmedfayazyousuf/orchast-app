"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

type MyRevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function MyReveal({ children, className, delay = 0 }: MyRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
