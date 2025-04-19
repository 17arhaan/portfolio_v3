"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Linkedin, Github, Code, FileText, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import StarField from "./star-field"

interface LandingPageProps {
  experienceRef: React.RefObject<HTMLElement>
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function LandingPage({ experienceRef, videoRef }: LandingPageProps) {
  const [gradientPosition, setGradientPosition] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(0)

  // Animate gradient and glow effects with smoother transitions
  useEffect(() => {
    // Animate gradient position more slowly and smoothly
    const gradientInterval = setInterval(() => {
      setGradientPosition((prev) => (prev >= 100 ? 0 : prev + 0.2))
    }, 50)

    // Animate glow intensity with smoother sine wave
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => Math.sin(Date.now() * 0.0003) * 0.2 + 0.2)
    }, 16)

    return () => {
      clearInterval(gradientInterval)
      clearInterval(glowInterval)
    }
  }, [])

  // Scroll to experience section
  const scrollToExperience = () => {
    if (experienceRef.current) {
      experienceRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Continuous gradient style for the entire title - with enhanced subtle glow
  const titleGradientStyle = {
    background: `linear-gradient(
      90deg, 
      #FFFFFF 0%, 
      #FFFFFF 15%,
      #DCB4FF 30%, 
      #910A67 50%, 
      #3C0753 70%, 
      #FFFFFF 100%
    )`,
    backgroundSize: "300% 100%",
    backgroundPosition: `${gradientPosition}% 0`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
    textShadow: `0 0 ${2 + glowIntensity * 2}px rgba(255, 255, 255, ${0.4 + glowIntensity * 0.2}), 
               0 0 ${5 + glowIntensity * 5}px rgba(255, 255, 255, ${0.2 + glowIntensity * 0.1})`,
    transition: "text-shadow 0.5s ease-out",
  }

  // Make tagline glow more subtle
  const taglineStyle = {
    color: "white",
    textShadow: `
      0 0 ${2 + glowIntensity * 3}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.1}),
      0 0 ${4 + glowIntensity * 5}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.1})
    `,
    transition: "text-shadow 0.5s ease-out",
  }

  // Make description glow more subtle
  const descriptionStyle = {
    color: "white",
    textShadow: `
      0 0 ${1 + glowIntensity * 2}px rgba(255, 255, 255, ${0.2 + glowIntensity * 0.1}),
      0 0 ${2 + glowIntensity * 3}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05})
    `,
    transition: "text-shadow 0.5s ease-out",
  }

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Star field with parallax effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <StarField />
      </div>

      {/* Content */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          style={titleGradientStyle}
        >
          <>
            Hi, I'm <br /> Arhaan Girdhar
          </>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl mb-4"
          style={taglineStyle}
        >
          Turning Vision into Reality
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="text-base mb-10 max-w-2xl mx-auto italic"
          style={descriptionStyle}
        >
          Aspiring Software Engineer currently in 3rd year, pursuing Computer Science with a Minor Specialization in AI
          & ML at MIT, Manipal.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <motion.div
            whileHover={{ 
              scale: 1.03, 
              transition: { type: "spring", stiffness: 400, damping: 10 } 
            }}
          >
            <Button
              variant="outline"
              className="px-6 py-5 bg-black/30 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm group hover:border-white/50 hover:bg-white/5 overflow-hidden relative"
              onClick={scrollToExperience}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></span>
              <span
                className="relative z-2 group-hover:text-white transition-colors duration-300"
                style={{
                  textShadow: `0 0 4px rgba(255, 255, 255, 0.3)`,
                  transition: "text-shadow 0.3s ease-out, color 0.3s ease-out",
                }}
              >
                View My Work
              </span>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ 
              scale: 1.03, 
              transition: { type: "spring", stiffness: 400, damping: 10 } 
            }}
          >
            <Button
              variant="outline"
              className="px-6 py-5 bg-black/30 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm group hover:border-white/50 hover:bg-white/5 overflow-hidden relative"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></span>
              <span
                className="relative z-2 group-hover:text-white transition-colors duration-300"
                style={{
                  textShadow: `0 0 4px rgba(255, 255, 255, 0.3)`,
                  transition: "text-shadow 0.3s ease-out, color 0.3s ease-out",
                }}
              >
                Contact Me
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center space-x-6 mb-16"
        >
          <motion.a
            href="https://www.linkedin.com/in/arhaan17/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            style={{
              color: `rgba(255, 255, 255, ${0.6 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease",
            }}
          >
            <Linkedin className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://github.com/17arhaan"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            style={{
              color: `rgba(255, 255, 255, ${0.6 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease",
            }}
          >
            <Github className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="https://leetcode.com/u/arhaan17/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.2,
              filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            style={{
              color: `rgba(255, 255, 255, ${0.6 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease",
            }}
          >
            <Code className="w-5 h-5" />
          </motion.a>
          <motion.a
            href="mailto:17arhaan.connect@gmail.com"
            whileHover={{
              scale: 1.2,
              filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`,
              transition: { type: "spring", stiffness: 400, damping: 10 },
            }}
            style={{
              color: `rgba(255, 255, 255, ${0.6 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease",
            }}
          >
            <Mail className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span
            className="text-sm mb-2 text-white/50"
            style={{
              textShadow: `0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05})`,
              transition: "text-shadow 0.5s ease-out",
            }}
          >
            Scroll Down
          </span>
          <ChevronDown
            className="w-5 h-5"
            style={{
              color: `rgba(255, 255, 255, ${0.4 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease",
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
