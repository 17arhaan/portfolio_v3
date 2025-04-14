"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

// Bubble interface
interface Bubble {
  id: number
  size: number
  x: number
  y: number
  duration: number
  delay: number
  color: string
}

export default function GradientBubbles() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      const colors = [
        "rgba(220, 38, 38, 0.12)", // Red-600
        "rgba(239, 68, 68, 0.12)", // Red-500
        "rgba(248, 113, 113, 0.12)", // Red-400
        "rgba(252, 165, 165, 0.12)", // Red-300
        "rgba(254, 202, 202, 0.12)", // Red-200
        "rgba(255, 255, 255, 0.08)", // White
        "rgba(255, 255, 255, 0.04)", // White (more transparent)
      ]

      const newBubbles: Bubble[] = []

      // Generate 15-20 bubbles (fewer bubbles for less movement)
      const bubbleCount = Math.floor(Math.random() * 5) + 15

      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          size: Math.floor(Math.random() * 150) + 50, // 50-200px
          x: Math.random() * 100, // 0-100%
          y: Math.random() * 100, // 0-100%
          duration: Math.floor(Math.random() * 20) + 40, // 40-60s (slower movement)
          delay: Math.random() * -20, // Start at different positions in the animation
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }

      setBubbles(newBubbles)
    }

    generateBubbles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full blur-xl opacity-70"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            background: bubble.color,
            willChange: "transform",
          }}
          animate={{
            x: [Math.random() * 50 - 25, Math.random() * 50 - 25],
            y: [Math.random() * 50 - 25, Math.random() * 50 - 25],
          }}
          transition={{
            duration: bubble.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: bubble.delay,
          }}
        />
      ))}
    </div>
  )
}
