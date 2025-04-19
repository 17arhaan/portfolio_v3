"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Github, Linkedin, Mail, Twitter, ExternalLink, Home, Briefcase, Code, Cpu, FileText, Award, ArrowRight } from "lucide-react"
import Confetti from "react-confetti"

export default function AnimatedFooter() {
  const [currentYear] = useState(new Date().getFullYear())
  const [isHovered, setIsHovered] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [showYay, setShowYay] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })
  const controls = useAnimation()
  const particlesRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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

  const handleSignatureClick = () => {
    setShowYay(true)
    setIsVideoOpen(true)
    setTimeout(() => setShowYay(false), 2000)
  }

  const handleClickHereClick = () => {
    // Remove this function since we don't want the text to do anything
  }

  const handleVideoEnd = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setIsVideoOpen(false)
    }, 4000)
  }

  return (
    <footer className="relative w-full py-10 overflow-hidden border-t border-white/10">
      <AnimatePresence>
        {showConfetti && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0"
            style={{ top: "80px" }}
          >
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={false}
              numberOfPieces={500}
              gravity={0.3}
              style={{ position: "fixed", top: 0 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      
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
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center gap-1 text-sm"
              >
                <AnimatePresence mode="wait">
                  {!showYay ? (
                    <motion.div
                      key="click-here"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1"
                      whileHover={{
                        scale: 1.05,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span 
                        className="text-white/40"
                        animate={{
                          opacity: [0.4, 0.6, 0.4],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        Click here
                      </motion.span>
                      <motion.div
                        animate={{
                          x: [0, 2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="yay"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.3 }}
                      className="text-red-500 font-medium"
                    >
                      Yay!!
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              <motion.div
                animate={controls}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleSignatureClick}
                className="signature-container cursor-pointer relative"
              >
                <div className="w-96 h-32 relative">
                  <Image
                    src="/sign.png"
                    alt="Signature"
                    width={480}
                    height={144}
                    className="signature-image"
                    style={{ objectFit: "contain" }}
                    priority
                  />
                </div>
              </motion.div>
            </div>

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
                    onEnded={handleVideoEnd}
                  />
                </motion.div>
              )}
            </AnimatePresence>
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
