"use client";

import { motion } from "framer-motion";

export function LoadingAnimation() {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Working</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 bg-white rounded-full"
            animate={{
              y: [0, -4, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
} 