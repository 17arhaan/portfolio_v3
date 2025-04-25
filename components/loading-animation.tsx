"use client";

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

export default function LoadingAnimation({ onLoadingComplete }: LoadingAnimationProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setLoading(false)
            onLoadingComplete()
          }, 500)
          return 100
        }
        return prev + 1
      })
    }, 20)

    return () => clearInterval(interval)
  }, [onLoadingComplete])

  const generateBinary = (index: number) => {
    // Create a deterministic pattern based on the index
    const patterns = [
      "10101010101010101010",
      "11001100110011001100",
      "11110000111100001111",
      "00001111000011110000",
      "10011001100110011001",
      "11111000001111100000",
      "10101011110000111100",
      "11001010101010101010",
      "00110011001100110011",
      "11110011001100110011",
      "10101010101111000000",
      "11001100110000111111",
      "10101011001100110011",
      "11110000110011001100",
      "10011001111100001111",
      "11111000001100110011",
      "10101011110011001100",
      "11001010101111000011",
      "00110011001010101010",
      "11110011000011110000"
    ];
    return patterns[index % patterns.length];
  }

  const generateParticles = () => {
    // Fixed positions and sizes for particles
    return [
      { size: 2, left: 55, top: 26, delay: 0 },
      { size: 2.3, left: 92, top: 78, delay: 0.2 },
      { size: 2, left: 86, top: 51, delay: 0.4 },
      { size: 3, left: 64, top: 11, delay: 0.6 },
      { size: 1, left: 0, top: 14, delay: 0.8 },
      { size: 3.2, left: 80, top: 58, delay: 1 },
      { size: 1.9, left: 0, top: 16, delay: 1.2 },
      { size: 3.9, left: 70, top: 72, delay: 1.4 },
      { size: 2.9, left: 32, top: 90, delay: 1.6 },
      { size: 1.5, left: 9, top: 55, delay: 1.8 },
      { size: 1.8, left: 5, top: 99, delay: 2 },
      { size: 3.2, left: 4, top: 2, delay: 2.2 },
      { size: 1.5, left: 43, top: 95, delay: 2.4 },
      { size: 1.3, left: 68, top: 15, delay: 2.6 },
      { size: 3.6, left: 7, top: 47, delay: 2.8 },
      { size: 3, left: 94, top: 92, delay: 3 },
      { size: 1.7, left: 0, top: 3, delay: 3.2 },
      { size: 1, left: 84, top: 38, delay: 3.4 },
      { size: 3.3, left: 17, top: 76, delay: 3.6 },
      { size: 1.4, left: 47, top: 39, delay: 3.8 },
      { size: 1.3, left: 31, top: 11, delay: 4 },
      { size: 1.3, left: 98, top: 97, delay: 4.2 },
      { size: 1.2, left: 58, top: 42, delay: 4.4 },
      { size: 2, left: 79, top: 9, delay: 4.6 },
      { size: 1.2, left: 67, top: 92, delay: 4.8 },
      { size: 3.2, left: 7, top: 47, delay: 5 },
      { size: 1.8, left: 2, top: 14, delay: 5.2 },
      { size: 3, left: 84, top: 65, delay: 5.4 },
      { size: 3.3, left: 24, top: 48, delay: 5.6 },
      { size: 2.4, left: 94, top: 37, delay: 5.8 },
      { size: 2.4, left: 76, top: 83, delay: 6 },
      { size: 3.9, left: 88, top: 63, delay: 6.2 },
      { size: 1.1, left: 12, top: 7, delay: 6.4 },
      { size: 1.3, left: 91, top: 5, delay: 6.6 },
      { size: 2.5, left: 23, top: 15, delay: 6.8 },
      { size: 2, left: 20, top: 38, delay: 7 },
      { size: 3.1, left: 56, top: 61, delay: 7.2 },
      { size: 3.8, left: 61, top: 8, delay: 7.4 },
      { size: 1.7, left: 73, top: 97, delay: 7.6 },
      { size: 2.8, left: 0, top: 89, delay: 7.8 },
      { size: 3.6, left: 59, top: 60, delay: 8 },
      { size: 3.1, left: 26, top: 29, delay: 8.2 },
      { size: 1.8, left: 48, top: 44, delay: 8.4 },
      { size: 3, left: 84, top: 65, delay: 8.6 },
      { size: 2.4, left: 94, top: 37, delay: 8.8 },
      { size: 2.4, left: 76, top: 83, delay: 9 },
      { size: 3.9, left: 88, top: 63, delay: 9.2 },
      { size: 1.1, left: 12, top: 7, delay: 9.4 },
      { size: 1.3, left: 91, top: 5, delay: 9.6 },
      { size: 2.5, left: 23, top: 15, delay: 9.8 }
    ]
  }

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* Background particles */}
          <div className="absolute inset-0">
            {generateParticles().map((particle, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full bg-[#720455] opacity-30"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Glitch effect lines */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-[#3C0753] opacity-30"
                style={{ top: `${i * 10}%` }}
                animate={{
                  x: [0, 10, -10, 0],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 1 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          <div className="relative w-full max-w-2xl h-64 overflow-hidden">
            {/* Matrix-style binary rain */}
            <div className="absolute inset-0 flex flex-col gap-2">
              {Array.from({ length: 20 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-[#720455] font-mono text-sm"
                >
                  {generateBinary(i)}
                </motion.div>
              ))}
            </div>
            
            {/* Loading text and progress bar */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-white text-2xl font-mono mb-4"
              >
                Loading Portfolio...
              </motion.div>
              
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                  className="h-full bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67]"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-gray-400 text-sm font-mono mt-2"
              >
                {progress}%
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 