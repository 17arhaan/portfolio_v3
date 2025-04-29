"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Star {
  x: number
  y: number
  size: number
  speed: number
}

const StarField: React.FC = () => {
  const [stars, setStars] = useState<Star[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Reduce number of stars for better performance
    const initialStars = Array.from({ length: 100 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      speed: Math.random() * 0.5 + 0.1,
    }))
    setStars(initialStars)

    const animate = () => {
      setStars((prevStars) =>
        prevStars.map((star) => ({
          ...star,
          y: (star.y + star.speed) % window.innerHeight,
        }))
      )
    }

    // Optimize animation frame rate
    const animationInterval = setInterval(animate, 32) // ~30fps instead of 60fps
    return () => clearInterval(animationInterval)
  }, [])

  if (!isClient) {
    return null // Return null during server-side rendering
  }

  return (
    <div className="fixed inset-0 pointer-events-none">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}px`,
            top: `${star.y}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.01,
          }}
        />
      ))}
    </div>
  )
}

export default StarField 