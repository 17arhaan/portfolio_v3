"use client"

import { motion } from "framer-motion"

export default function GradientBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
      
      {/* Main center bubble */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(60,7,83,0.5) 0%, rgba(145,10,103,0.4) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(150px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.7, 0.9, 0.7],
          x: ["0%", "30%", "-30%", "30%", "0%"],
          y: ["0%", "-20%", "20%", "-20%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Left side bubble */}
      <motion.div
        className="absolute top-1/3 left-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(114,4,85,0.4) 0%, rgba(145,10,103,0.3) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
          x: ["0%", "20%", "-20%", "20%", "0%"],
          y: ["0%", "-25%", "25%", "-25%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Right side bubble */}
      <motion.div
        className="absolute bottom-1/3 right-0 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(60,7,83,0.4) 0%, rgba(114,4,85,0.3) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.5, 0.7, 0.5],
          x: ["0%", "-20%", "20%", "-20%", "0%"],
          y: ["0%", "25%", "-25%", "25%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Additional floating bubbles */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(145,10,103,0.3) 0%, rgba(114,4,85,0.2) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
          x: ["0%", "30%", "-30%", "30%", "0%"],
          y: ["0%", "-30%", "30%", "-30%", "0%"],
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
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ["0%", "-30%", "30%", "-30%", "0%"],
          y: ["0%", "30%", "-30%", "30%", "0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />
    </div>
  )
}
