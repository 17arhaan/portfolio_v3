"use client"

import { motion } from "framer-motion"

interface SectionDividerProps {
  light?: boolean
}

export default function SectionDivider({ light = false }: SectionDividerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="relative h-8 w-full overflow-hidden"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full max-w-5xl px-4 flex items-center">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className={`w-8 h-8 mx-4 rounded-full flex items-center justify-center ${
              light ? "bg-white/5" : "bg-black/30"
            } backdrop-blur-sm border border-white/10`}
          >
            <motion.div
              className="w-2 h-2 rounded-full"
              style={{
                background: "radial-gradient(circle, #3C0753 0%, #910A67 100%)",
                boxShadow: "0 0 10px rgba(145, 10, 103, 0.5)",
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </div>
      </div>
    </motion.div>
  )
}
