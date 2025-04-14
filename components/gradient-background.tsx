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
  moveDistance: number
  pulse: boolean
}

export default function GradientBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    // Generate random bubbles
    const generateBubbles = () => {
      // Subtle colors with slightly increased opacity
      const colors = [
        "rgba(3, 6, 55, 0.15)", // #030637 (deep blue)
        "rgba(60, 7, 83, 0.15)", // #3C0753 (deep purple)
        "rgba(114, 4, 85, 0.15)", // #720455 (magenta purple)
        "rgba(145, 10, 103, 0.15)", // #910A67 (bright magenta)
        "rgba(255, 255, 255, 0.03)", // White with very low opacity
        "rgba(3, 6, 55, 0.2)", // Slightly more visible versions
        "rgba(60, 7, 83, 0.2)",
        "rgba(114, 4, 85, 0.2)",
      ]

      const newBubbles: Bubble[] = []

      // Generate significantly more bubbles
      const bubbleCount = Math.floor(Math.random() * 10) + 25 // 25-35 bubbles

      for (let i = 0; i < bubbleCount; i++) {
        // More variety in bubble sizes
        const size =
          Math.random() < 0.7
            ? Math.floor(Math.random() * 200) + 100 // 70% chance of 100-300px (medium)
            : Math.random() < 0.5
              ? Math.floor(Math.random() * 100) + 50 // 15% chance of 50-150px (small)
              : Math.floor(Math.random() * 300) + 300 // 15% chance of 300-600px (large)

        // More variety in movement speed
        const duration = Math.floor(Math.random() * 40) + 60 // 60-100s

        // More variety in movement distance
        const moveDistance =
          Math.random() < 0.7
            ? Math.random() * 20 + 10 // 70% chance of 10-30px (medium movement)
            : Math.random() < 0.5
              ? Math.random() * 10 + 5 // 15% chance of 5-15px (small movement)
              : Math.random() * 40 + 30 // 15% chance of 30-70px (large movement)

        // Some bubbles will pulse
        const pulse = Math.random() < 0.3 // 30% chance of pulsing

        newBubbles.push({
          id: i,
          size,
          x: Math.random() * 100, // 0-100%
          y: Math.random() * 100, // 0-100%
          duration,
          delay: Math.random() * -30, // More variety in starting positions
          color: colors[Math.floor(Math.random() * colors.length)],
          moveDistance,
          pulse,
        })
      }

      setBubbles(newBubbles)
    }

    generateBubbles()
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none bg-black">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.01]">
        <div className="h-full w-full bg-grid-white/[0.1]" />
      </div>

      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            background: bubble.color,
            willChange: "transform, opacity",
          }}
          animate={
            bubble.pulse
              ? {
                  x: [
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                  ],
                  y: [
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                  ],
                  scale: [1, 1.1, 1],
                  opacity: [1, 0.8, 1],
                }
              : {
                  x: [
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                  ],
                  y: [
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                    Math.random() * bubble.moveDistance - bubble.moveDistance / 2,
                  ],
                }
          }
          transition={{
            duration: bubble.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: bubble.delay,
            scale: { duration: bubble.duration / 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
            opacity: { duration: bubble.duration / 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" },
          }}
        />
      ))}
    </div>
  )
}
