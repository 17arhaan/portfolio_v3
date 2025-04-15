"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter, ExternalLink, Home, Briefcase, Code, Cpu, FileText, Award } from "lucide-react"

export default function AnimatedFooter() {
  const [currentYear] = useState(new Date().getFullYear())
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const controls = useAnimation()
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Animate the particles
  useEffect(() => {
    if (!particlesRef.current) return

    const particles = Array.from({ length: 15 }).map((_, i) => {
      const particle = document.createElement("div")
      particle.className = "absolute rounded-full bg-white/30 pointer-events-none"

      // Random size between 2px and 6px
      const size = Math.random() * 4 + 2
      particle.style.width = `${size}px`
      particle.style.height = `${size}px`

      // Random position
      particle.style.left = `${Math.random() * 100}%`
      particle.style.top = `${Math.random() * 100}%`

      // Random animation duration between 10s and 20s
      const duration = Math.random() * 10 + 10
      particle.style.animation = `floatParticle ${duration}s linear infinite`

      // Random delay
      particle.style.animationDelay = `${Math.random() * -20}s`

      // Random opacity
      particle.style.opacity = `${Math.random() * 0.5 + 0.2}`

      return particle
    })

    particles.forEach((particle) => {
      particlesRef.current?.appendChild(particle)
    })

    return () => {
      particles.forEach((particle) => {
        particle.remove()
      })
    }
  }, [])

  // Animate the signature on hover
  useEffect(() => {
    if (isHovered) {
      controls.start({
        y: [0, -5, 0],
        transition: {
          duration: 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      })
    } else {
      controls.stop()
      controls.start({ y: 0 })
    }
  }, [isHovered, controls])

  // Social media links
  const socialLinks = [
    { icon: Github, href: "https://github.com/17arhaan", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/arhaan17/", label: "LinkedIn" },
    { icon: Code, href: "https://leetcode.com/u/arhaan17/", label: "LeetCode" },
    { icon: Mail, href: "mailto:17arhaan.connect@gmail.com", label: "Email" },
  ]

  return (
    <footer className="relative w-full py-10 overflow-hidden border-t border-white/10">
      {/* Animated background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm">
        {/* Particles container */}
        <div ref={particlesRef} className="absolute inset-0 overflow-hidden" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3C0753]/30 to-transparent" />

        {/* Animated wave */}
        <div className="absolute bottom-0 left-0 right-0 h-20 overflow-hidden">
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-r from-[#3C0753]/10 via-[#720455]/10 to-[#910A67]/10"
            animate={{
              y: [0, -10, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            style={{
              borderRadius: "100% 100% 0 0",
            }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-6 mb-8">
          {/* Logo, tagline and description */}
          <div className="flex flex-col items-center md:items-start">
            <motion.div
              animate={controls}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              onClick={() => setIsVideoOpen(true)}
              className="mb-2 signature-container cursor-pointer"
            >
              <div className="w-72 h-24 relative">
                <Image
                  src="/sign.png"
                  alt="Signature"
                  width={360}
                  height={108}
                  className="signature-image"
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </motion.div>

            {/* Video Modal */}
            <AnimatePresence>
              {isVideoOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.pause();
                      videoRef.current.currentTime = 0;
                    }
                    setIsVideoOpen(false);
                  }}
                >
                  <motion.video
                    ref={videoRef}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full max-w-4xl rounded-lg shadow-2xl"
                    src="/ArhaanGirdhar_MC.mp4"
                    autoPlay
                    playsInline
                    onClick={(e) => e.stopPropagation()}
                    onEnded={() => {
                      setTimeout(() => {
                        setIsVideoOpen(false);
                      }, 500);
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-3">
              <p className="text-white/80 text-sm max-w-md">
                <span className="font-medium text-white">Arhaan Girdhar</span> — Computer Science student specializing
                in AI & ML at MIT Manipal. Passionate about building innovative solutions at the intersection of
                technology and creativity.
              </p>
              <p className="text-white/60 text-sm italic">
                Turning vision into reality through code, creativity, and continuous learning.
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4 text-lg flex items-center">
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                className="mr-2"
              >
                <ExternalLink className="h-4 w-4 text-white/70" />
              </motion.div>
              Quick Links
            </h3>
            <ul className="space-y-3 text-center md:text-left">
              {[
                { name: "Home", icon: Home },
                { name: "Experience", icon: Briefcase },
                { name: "Projects", icon: Code },
                { name: "Skills", icon: Cpu },
                { name: "Certifications", icon: Award },
                { name: "Resume", icon: FileText },
                { name: "Contact", icon: Mail },
              ].map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={`#${item.name.toLowerCase()}`}
                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                    whileHover={{
                      x: 2,
                      textShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
                    }}
                  >
                    <item.icon className="h-3.5 w-3.5 mr-2 text-white/40 group-hover:text-white/90 transition-colors duration-300" />
                    {item.name}
                    <motion.div
                      className="h-[1px] w-0 bg-white/40 ml-2 group-hover:w-8 transition-all duration-300"
                      whileHover={{ width: 32 }}
                    />
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-white font-semibold mb-4 text-lg">Connect</h3>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-button p-2 transition-colors duration-300"
                  whileHover={{
                    scale: 1.2,
                  }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={link.label}
                >
                  <link.icon className="w-5 h-5 text-white/80" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 flex justify-center">
          <motion.p
            className="text-white/40 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            © {currentYear} Arhaan Girdhar. All rights reserved.
          </motion.p>
        </div>
      </div>
    </footer>
  )
}
