"use client"

import { motion } from "framer-motion"

export default function GradientBubbles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40" />
      
      {/* Main center bubble */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(60,7,83,0.4) 0%, rgba(145,10,103,0.3) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(100px)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
          x: ["0%", "20%", "-20%", "20%", "0%"],
          y: ["0%", "-20%", "20%", "-20%", "0%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top left bubble */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(114,4,85,0.3) 0%, rgba(145,10,103,0.2) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(80px)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: ["0%", "25%", "-25%", "25%", "0%"],
          y: ["0%", "-25%", "25%", "-25%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Bottom right bubble */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(60,7,83,0.3) 0%, rgba(114,4,85,0.2) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(70px)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
          x: ["0%", "-25%", "25%", "-25%", "0%"],
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
        className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(145,10,103,0.2) 0%, rgba(114,4,85,0.1) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(60px)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
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
        className="absolute bottom-1/3 left-1/3 w-[300px] h-[300px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(60,7,83,0.2) 0%, rgba(114,4,85,0.1) 50%, rgba(0,0,0,0) 100%)",
          filter: "blur(50px)",
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
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
