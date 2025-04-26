"use client";

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoadingAnimationProps {
  onLoadingComplete: () => void;
}

export default function LoadingAnimation({ onLoadingComplete }: LoadingAnimationProps) {
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing')
  const [glitchEffect, setGlitchEffect] = useState(false)

  useEffect(() => {
    const loadingPhrases = [
      'Initializing Systems',
      'Loading Neural Networks',
      'Compiling Projects',
      'Optimizing Experience',
      'Calibrating Skills',
      'Synchronizing Data',
      'Finalizing Portfolio'
    ];

    // Glitch effect interval
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 150);
    }, 3000);

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 1;
        const textIndex = Math.floor((newProgress / 100) * (loadingPhrases.length - 1));
        setLoadingText(loadingPhrases[textIndex]);

        if (newProgress >= 100) {
          clearInterval(interval);
          clearInterval(glitchInterval);
          setTimeout(() => {
            setLoading(false);
            onLoadingComplete();
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 30);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
    };
  }, [onLoadingComplete]);

  const generateBinary = (index: number) => {
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
  };

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
          {/* Animated background gradient */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-black via-[#3C0753] to-black opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Binary rain with enhanced effects - Now in two columns */}
          <div className="absolute inset-0 flex justify-between overflow-hidden pointer-events-none">
            {/* Left column */}
            <div className="w-1/4 h-full flex flex-col justify-between py-4">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`left-${i}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: [0.3, 0.7, 0.3],
                    filter: glitchEffect ? "blur(2px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-[#720455] font-mono text-sm tracking-wider transform-gpu"
                  style={{
                    textShadow: "0 0 5px #720455",
                  }}
                >
                  {generateBinary(i)}
                </motion.div>
              ))}
            </div>
            
            {/* Right column */}
            <div className="w-1/4 h-full flex flex-col justify-between py-4">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`right-${i}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: [0.3, 0.7, 0.3],
                    filter: glitchEffect ? "blur(2px)" : "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1 + 0.25,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-[#720455] font-mono text-sm tracking-wider text-right transform-gpu"
                  style={{
                    textShadow: "0 0 5px #720455",
                  }}
                >
                  {generateBinary(i + 25)}
                </motion.div>
              ))}
            </div>

            {/* Middle column for additional effect */}
            <div className="absolute left-1/2 -translate-x-1/2 w-1/4 h-full flex flex-col justify-between py-4 opacity-30">
              {Array.from({ length: 25 }).map((_, i) => (
                <motion.div
                  key={`middle-${i}`}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ 
                    y: 0, 
                    opacity: [0.2, 0.5, 0.2],
                    filter: glitchEffect ? "blur(3px)" : "blur(1px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.1 + 0.5,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                  className="text-[#720455] font-mono text-sm tracking-wider text-center transform-gpu"
                  style={{
                    textShadow: "0 0 5px #720455",
                  }}
                >
                  {generateBinary(i + 50)}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Background particles with enhanced effects */}
          <div className="absolute inset-0 pointer-events-none">
            {generateParticles().map((particle, index) => (
              <motion.div
                key={index}
                className="absolute rounded-full bg-gradient-to-r from-[#720455] to-[#910A67] opacity-30"
                style={{
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 0.6, 0.3],
                  scale: [1, 1.2, 1],
                  filter: ["blur(0px)", "blur(2px)", "blur(0px)"],
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

          {/* Enhanced glitch effect lines */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#3C0753] to-transparent opacity-30"
                style={{ top: `${i * 5}%` }}
                animate={{
                  x: [0, 10, -10, 0],
                  opacity: [0.3, 0.1, 0.3],
                  scaleX: [1, 1.2, 0.8, 1],
                  filter: glitchEffect ? "blur(1px)" : "blur(0px)",
                }}
                transition={{
                  duration: 2 + Math.random(),
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>

          {/* Central content container */}
          <div className="relative w-full max-w-md mx-auto px-4 h-64 flex flex-col items-center justify-center backdrop-blur-sm z-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                filter: glitchEffect ? "blur(3px)" : "blur(0px)",
              }}
              transition={{ duration: 0.5 }}
              className="text-white text-2xl font-mono mb-8 relative text-center"
            >
              <span className="relative z-10">{loadingText}</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67] opacity-20 blur-lg"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Enhanced progress bar */}
            <div className="w-full max-w-xs h-2 bg-gray-800 rounded-full overflow-hidden relative">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
                className="h-full bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67] relative"
              >
                <motion.div
                  className="absolute inset-0 bg-white"
                  animate={{
                    opacity: [0.3, 0, 0.3],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                filter: glitchEffect ? "blur(2px)" : "blur(0px)",
              }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-400 text-sm font-mono mt-4 relative"
            >
              <span className="relative z-10">{progress}%</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67] opacity-20 blur-sm"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </motion.div>
          </div>

          {/* Enhanced corner decorations */}
          <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
            <motion.div
              className="absolute w-full h-full border-l-2 border-t-2 border-[#720455]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                filter: glitchEffect ? "blur(2px)" : "blur(0px)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
          <div className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none">
            <motion.div
              className="absolute w-full h-full border-r-2 border-b-2 border-[#720455]"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
                filter: glitchEffect ? "blur(2px)" : "blur(0px)",
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: 1,
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 