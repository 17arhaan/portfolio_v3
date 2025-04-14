"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)
    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white z-50 hover:bg-white/20 transition-colors duration-300"
          style={{ boxShadow: "0 0 15px rgba(255, 255, 255, 0.1)" }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#3C0753]/30 via-[#720455]/30 to-[#910A67]/30 animate-spin-slow opacity-0 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
