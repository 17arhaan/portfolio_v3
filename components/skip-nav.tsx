"use client"

import { motion } from "framer-motion"

export function SkipNav() {
  return (
    <motion.a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-0 left-0 right-0 z-50 bg-black text-white text-center py-2 px-4 transform -translate-y-full focus:translate-y-0 transition-transform duration-200"
      initial={{ y: -100 }}
      whileFocus={{ y: 0 }}
      exit={{ y: -100 }}
    >
      Skip to main content
    </motion.a>
  )
} 