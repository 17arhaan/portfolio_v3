"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TypeWriterProps {
  text: string
  delay?: number
  className?: string
  onComplete?: () => void
}

const TypeWriter: React.FC<TypeWriterProps> = ({ 
  text, 
  delay = 50,
  className = "",
  onComplete
}) => {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let currentIndex = 0
    let timeout: NodeJS.Timeout

    const typeNextCharacter = () => {
      if (currentIndex < text.length) {
        // Find the next word boundary
        let nextSpaceIndex = text.indexOf(' ', currentIndex)
        if (nextSpaceIndex === -1) nextSpaceIndex = text.length

        // Type the whole word
        setDisplayedText(text.slice(0, nextSpaceIndex))
        currentIndex = nextSpaceIndex + 1

        timeout = setTimeout(typeNextCharacter, delay * 2)
      } else {
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }

    timeout = setTimeout(typeNextCharacter, delay)

    return () => clearTimeout(timeout)
  }, [text, delay, onComplete])

  return (
    <motion.span
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`relative inline-block italic ${className}`}
      style={{
        textShadow: isComplete 
          ? "0 0 8px rgba(255, 255, 255, 0.4), 0 0 16px rgba(114, 4, 85, 0.4)"
          : "0 0 6px rgba(255, 255, 255, 0.3), 0 0 12px rgba(114, 4, 85, 0.3)"
      }}
    >
      {/* Main text */}
      <span className="text-white relative z-10 whitespace-pre-wrap break-words">
        <AnimatePresence mode="sync">
          {displayedText.split(/(\s+)/).map((segment, index) => (
            <motion.span
              key={index}
              initial={{ 
                opacity: 0,
                y: -10,
                filter: "blur(4px)",
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
              }}
              animate={{ 
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                textShadow: "none"
              }}
              transition={{
                duration: 0.2,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.15 }
              }}
              className="inline-block"
              style={{ 
                marginRight: /\s+/.test(segment) ? '0.25em' : '0.02em',
                letterSpacing: '0.02em'
              }}
            >
              {segment}
            </motion.span>
          ))}
        </AnimatePresence>
      </span>

      {/* Optimized glow effect */}
      <motion.span
        className="absolute inset-0 pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0, 0.2, 0],
          scale: [0.99, 1.01, 0.99]
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), rgba(114, 4, 85, 0.15), transparent)",
          filter: "blur(6px)",
          mixBlendMode: "overlay"
        }}
      />

      {/* Completion effect */}
      {isComplete && (
        <motion.span
          className="absolute inset-0 pointer-events-none z-0"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ 
            opacity: [0, 0.3, 0],
            scale: [0.98, 1.02, 0.98]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(114, 4, 85, 0.15), rgba(255, 255, 255, 0.1))",
            filter: "blur(8px)",
            mixBlendMode: "overlay"
          }}
        />
      )}
    </motion.span>
  )
}

export default TypeWriter 