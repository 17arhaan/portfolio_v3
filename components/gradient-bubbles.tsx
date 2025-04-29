"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"

export default function GradientBubbles() {
  const [showBubbles, setShowBubbles] = useState(false)
  const [morphState, setMorphState] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Initial delay to prevent flash of content
    const loadTimeout = setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Show bubbles after a short delay
    const bubbleTimeout = setTimeout(() => {
      setShowBubbles(true)
    }, 800)

    return () => {
      clearTimeout(loadTimeout)
      clearTimeout(bubbleTimeout)
    }
  }, [])

  useEffect(() => {
    if (showBubbles) {
      const interval = setInterval(() => {
        setMorphState((prev) => (prev + 0.05) % 1) // Slowed down the morphing speed
      }, 50)
      return () => clearInterval(interval)
    }
  }, [showBubbles])

  if (!isLoaded) return null

  return (
    <AnimatePresence>
      {showBubbles && (
        <motion.div 
          className="absolute inset-0 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
          
          {/* Main center bubble with morphing effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(60,7,83,0.5) 0%, rgba(145,10,103,0.4) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(150px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.7, 0.9, 0.7],
              x: ["0%", "30%", "-30%", "30%", "0%"],
              y: ["0%", "-20%", "20%", "-20%", "0%"],
              borderRadius: [
                "50%",
                `${50 + Math.sin(morphState * Math.PI * 2) * 20}%`,
                "50%"
              ],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Left side bubble with morphing effect */}
          <motion.div
            className="absolute top-1/3 left-0 w-[1000px] h-[1000px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(114,4,85,0.4) 0%, rgba(145,10,103,0.3) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(120px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6],
              x: ["0%", "20%", "-20%", "20%", "0%"],
              y: ["0%", "-25%", "25%", "-25%", "0%"],
              borderRadius: [
                "50%",
                `${50 + Math.sin(morphState * Math.PI * 2 + Math.PI/3) * 15}%`,
                "50%"
              ],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Right side bubble with morphing effect */}
          <motion.div
            className="absolute bottom-1/3 right-0 w-[1000px] h-[1000px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(60,7,83,0.4) 0%, rgba(114,4,85,0.3) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(120px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.5, 0.7, 0.5],
              x: ["0%", "-20%", "20%", "-20%", "0%"],
              y: ["0%", "25%", "-25%", "25%", "0%"],
              borderRadius: [
                "50%",
                `${50 + Math.sin(morphState * Math.PI * 2 + Math.PI/2) * 18}%`,
                "50%"
              ],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />

          {/* Additional floating bubbles with morphing effect */}
          <motion.div
            className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(145,10,103,0.3) 0%, rgba(114,4,85,0.2) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(100px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.4, 0.6, 0.4],
              x: ["0%", "30%", "-30%", "30%", "0%"],
              y: ["0%", "-30%", "30%", "-30%", "0%"],
              borderRadius: [
                "50%",
                `${50 + Math.sin(morphState * Math.PI * 2 + Math.PI/4) * 12}%`,
                "50%"
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(60,7,83,0.3) 0%, rgba(114,4,85,0.2) 50%, rgba(0,0,0,0) 100%)",
              filter: "blur(100px)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: ["0%", "-30%", "30%", "-30%", "0%"],
              y: ["0%", "30%", "-30%", "30%", "0%"],
              borderRadius: [
                "50%",
                `${50 + Math.sin(morphState * Math.PI * 2 + Math.PI/6) * 14}%`,
                "50%"
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
