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
    // Generate bubbles with cross-browser compatible properties
    const newBubbles: Bubble[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 300 + 200,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      color: `radial-gradient(circle, rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.2) 0%, rgba(255,255,255,0) 100%)`,
      moveDistance: Math.random() * 20 + 10,
      pulse: Math.random() > 0.5,
    }))
    setBubbles(newBubbles)
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
            WebkitBackfaceVisibility: "hidden",
            backfaceVisibility: "hidden",
            WebkitTransform: "translateZ(0)",
            transform: "translateZ(0)",
            WebkitPerspective: "1000",
            perspective: "1000",
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
