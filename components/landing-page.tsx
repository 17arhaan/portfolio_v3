"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Linkedin, Github, Code, FileText, Mail, Terminal } from "lucide-react"
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
      className="relative h-screen flex flex-col items-center justify-between overflow-hidden py-20"
    >
      {/* Star field with parallax effect */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <StarField />
      </div>

      {/* Main Content */}
      <div className="flex-1 relative z-10 text-center px-4 w-full flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.h1 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              duration: 1,
              ease: [0.19, 1, 0.22, 1]
            }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight"
            style={{
              background: "linear-gradient(45deg, #DCB4FF, #910A67, #3C0753)",
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "gradient 6s ease infinite",
              transform: "perspective(1000px) rotateX(10deg)",
              textShadow: "-1px -1px 0 #DCB4FF, -2px -2px 0 #910A67, -3px -3px 0 #3C0753",
              filter: "drop-shadow(0 0 8px rgba(220, 180, 255, 0.2))",
            }}>
            Hi, I'm <br /> Arhaan Girdhar
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/80 font-mono mb-8 relative"
            style={{
              textShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
            }}
          >
            <span className="relative">
              <span className="absolute -left-4 text-[#DCB4FF]/70">$</span>
              AI / ML Engineer
            </span>
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-base text-white/60 font-mono italic relative"
            style={{
              textShadow: "0 0 8px rgba(255, 255, 255, 0.1)",
            }}
          >
            <span className="relative">
              <span className="absolute -left-4 text-[#910A67]/70">//</span>
              Aspiring Software Engineer @ MIT, Manipal
            </span>
            <br />
            <span className="relative">
              <span className="absolute -left-4 text-[#910A67]/70">//</span>
              Specializing in AI & ML
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-12"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="px-6 py-5 bg-black/30 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm group hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(220,180,255,0.15)]"
                onClick={scrollToExperience}
              >
                <span className="font-mono group-hover:text-[#DCB4FF] transition-colors">$ view_projects</span>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="px-6 py-5 bg-black/30 text-white rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm group hover:border-white/50 hover:bg-white/5 hover:shadow-[0_0_20px_rgba(220,180,255,0.15)]"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span className="font-mono group-hover:text-[#DCB4FF] transition-colors">$ contact_me</span>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex justify-center gap-6 mt-16"
        >
          {[
            { href: "https://www.linkedin.com/in/arhaan17/", Icon: Linkedin },
            { href: "https://github.com/17arhaan", Icon: Github },
            { href: "https://leetcode.com/u/arhaan17/", Icon: Code },
            { href: "mailto:17arhaan.connect@gmail.com", Icon: Mail }
          ].map((social, index) => (
            <motion.a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#DCB4FF] transition-all duration-300 hover:shadow-[0_0_20px_rgba(220,180,255,0.2)]"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
            >
              <social.Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="relative z-10 mb-8 w-6 h-6"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            className="w-full h-full text-white/50 cursor-pointer hover:text-[#DCB4FF] transition-colors duration-300"
            onClick={scrollToExperience}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
