import { motion } from "framer-motion"

export function GradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {/* Base gradient with faster movement */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-black to-blue-900/40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />

      {/* Main center bubble with faster movement */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120,119,198,0.4) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(150px)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.6, 0.9, 0.6],
          x: ["0%", "30%", "-30%", "30%", "0%"],
          y: ["0%", "-30%", "30%", "-30%", "0%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Top left bubble with faster movement */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.35) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(120px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
          x: ["0%", "35%", "-35%", "35%", "0%"],
          y: ["0%", "-35%", "35%", "-35%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />

      {/* Bottom right bubble with faster movement */}
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[700px] h-[700px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120,119,198,0.35) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(110px)",
        }}
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.4, 0.7, 0.4],
          x: ["0%", "-35%", "35%", "-35%", "0%"],
          y: ["0%", "35%", "-35%", "35%", "0%"],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Additional floating bubbles with faster movement */}
      <motion.div
        className="absolute top-1/3 right-1/3 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.3) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(100px)",
        }}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.6, 0.3],
          x: ["0%", "40%", "-40%", "40%", "0%"],
          y: ["0%", "-40%", "40%", "-40%", "0%"],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/3 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120,119,198,0.3) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(90px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.5, 0.2],
          x: ["0%", "-40%", "40%", "-40%", "0%"],
          y: ["0%", "40%", "-40%", "40%", "0%"],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Additional corner bubbles */}
      <motion.div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.25) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ["0%", "45%", "-45%", "45%", "0%"],
          y: ["0%", "45%", "-45%", "45%", "0%"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      />

      <motion.div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(120,119,198,0.25) 0%, rgba(255,255,255,0) 100%)",
          filter: "blur(80px)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ["0%", "-45%", "45%", "-45%", "0%"],
          y: ["0%", "-45%", "45%", "-45%", "0%"],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />
    </div>
  )
} 