"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Linkedin, Github, Code, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import StarField from "./star-field"

interface LandingPageProps {
  experienceRef: React.RefObject<HTMLElement>
}

export default function LandingPage({ experienceRef }: LandingPageProps) {
  const parallaxRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const [gradientPosition, setGradientPosition] = useState(0)
  const [glowIntensity, setGlowIntensity] = useState(0)

  // Handle parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current || !titleRef.current || !subtitleRef.current) return

      const scrollY = window.scrollY
      const parallaxSpeed = 0.5 // Adjust for more/less parallax effect
      const viewportHeight = window.innerHeight

      // More elegant fade and movement based on scroll percentage
      const scrollPercentage = Math.min(scrollY / (viewportHeight * 0.7), 1)

      // Smoother, more elegant transform with cubic-bezier easing
      titleRef.current.style.transform = `translateY(${scrollY * parallaxSpeed * 0.7}px) scale(${1 - scrollPercentage * 0.1})`
      subtitleRef.current.style.transform = `translateY(${scrollY * parallaxSpeed}px) scale(${1 - scrollPercentage * 0.05})`

      // Improved opacity transition with slight delay for title vs subtitle
      const titleOpacity = Math.max(1 - scrollPercentage * 1.3, 0)
      const subtitleOpacity = Math.max(1 - scrollPercentage * 1.5, 0)

      titleRef.current.style.opacity = titleOpacity.toString()
      subtitleRef.current.style.opacity = subtitleOpacity.toString()

      // Fade out entire section with slight delay
      parallaxRef.current.style.opacity = Math.max(1 - scrollPercentage * 1.2, 0).toString()
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Animate gradient and glow effects with smoother transitions
  useEffect(() => {
    // Animate gradient position more slowly and smoothly
    const gradientInterval = setInterval(() => {
      setGradientPosition((prev) => (prev >= 100 ? 0 : prev + 0.2)) // Reduced from 0.5 to 0.2 for smoother movement
    }, 50)

    // Animate glow intensity with smoother sine wave
    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => Math.sin(Date.now() * 0.0003) * 0.2 + 0.2) // Reduced frequency and amplitude
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
    backgroundSize: "300% 100%", // Increased from 200% to 300% for smoother movement
    backgroundPosition: `${gradientPosition}% 0`,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    display: "inline-block",
    // Enhanced glow effect - more visible but still elegant
    textShadow: `0 0 ${2 + glowIntensity * 2}px rgba(255, 255, 255, ${0.4 + glowIntensity * 0.2}), 
               0 0 ${5 + glowIntensity * 5}px rgba(255, 255, 255, ${0.2 + glowIntensity * 0.1})`,
    transition: "text-shadow 0.5s ease-out", // Smoother transition
  }

  // Make tagline glow more subtle
  const taglineStyle = {
    color: "white",
    textShadow: `
      0 0 ${2 + glowIntensity * 3}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.1}),
      0 0 ${4 + glowIntensity * 5}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.1})
    `,
    transition: "text-shadow 0.5s ease-out", // Smoother transition
  }

  // Make description glow more subtle
  const descriptionStyle = {
    color: "white",
    textShadow: `
      0 0 ${1 + glowIntensity * 2}px rgba(255, 255, 255, ${0.2 + glowIntensity * 0.1}),
      0 0 ${2 + glowIntensity * 3}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05})
    `,
    transition: "text-shadow 0.5s ease-out", // Smoother transition
  }

  // Button hover animation variants
  const buttonVariants = {
    initial: {
      scale: 1,
      boxShadow: `0 0 5px rgba(255, 255, 255, 0.1)`,
    },
    hover: {
      scale: 1.05,
      boxShadow: `0 0 15px rgba(255, 255, 255, 0.3)`,
      transition: {
        scale: { type: "spring", stiffness: 400, damping: 10 },
        boxShadow: { duration: 0.3 },
      },
    },
    tap: {
      scale: 0.98,
      boxShadow: `0 0 10px rgba(255, 255, 255, 0.2)`,
      transition: { duration: 0.1 },
    },
  }

  return (
    <section
      id="home"
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={parallaxRef}
    >
      {/* Star field with parallax effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <StarField />
      </div>

      {/* Content */}
      <div className="z-10 text-center px-4 max-w-3xl">
        <motion.h1
          ref={titleRef}
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
          ref={subtitleRef}
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
          <Button
            variant="outline"
            className="px-6 py-5 bg-black/30 hover:bg-white/10 text-white rounded-full border border-white/30 transition-all duration-300 button-border-glow backdrop-blur-sm"
            onClick={scrollToExperience}
          >
            <span
              style={{
                position: "relative",
                zIndex: 2,
                textShadow: `0 0 ${1 + glowIntensity * 2}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.1})`,
                transition: "text-shadow 0.5s ease-out", // Smoother transition
              }}
            >
              View My Work
            </span>
          </Button>

          <Button
            variant="outline"
            className="px-6 py-5 bg-black/30 hover:bg-white/10 text-white rounded-full border border-white/30 transition-all duration-300 button-border-glow backdrop-blur-sm"
          >
            <span
              style={{
                position: "relative",
                zIndex: 2,
                textShadow: `0 0 ${1 + glowIntensity * 2}px rgba(255, 255, 255, ${0.3 + glowIntensity * 0.1})`,
                transition: "text-shadow 0.5s ease-out", // Smoother transition
              }}
            >
              Contact Me
            </span>
          </Button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="flex justify-center space-x-6 mb-16"
        >
          {[Linkedin, Github, Code, FileText].map((Icon, index) => (
            <motion.a
              key={index}
              href="#"
              whileHover={{
                scale: 1.2,
                filter: `drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))`,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
              style={{
                color: `rgba(255, 255, 255, ${0.6 + glowIntensity * 0.1})`,
                filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
                transition: "color 0.5s ease, filter 0.5s ease", // Smoother transition
              }}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
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
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "easeInOut" }} // Smoother animation
          className="flex flex-col items-center"
        >
          <span
            className="text-sm mb-2 text-white/50"
            style={{
              textShadow: `0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05})`,
              transition: "text-shadow 0.5s ease-out", // Smoother transition
            }}
          >
            Scroll Down
          </span>
          <ChevronDown
            className="w-5 h-5"
            style={{
              color: `rgba(255, 255, 255, ${0.4 + glowIntensity * 0.1})`,
              filter: `drop-shadow(0 0 ${1 + glowIntensity}px rgba(255, 255, 255, ${0.1 + glowIntensity * 0.05}))`,
              transition: "color 0.5s ease, filter 0.5s ease", // Smoother transition
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
