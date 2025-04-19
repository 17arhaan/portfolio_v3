"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import confetti from "canvas-confetti"

interface NavbarProps {
  experienceRef: React.RefObject<HTMLElement>
  projectsRef: React.RefObject<HTMLElement>
  skillsRef: React.RefObject<HTMLElement>
  certificationsRef: React.RefObject<HTMLElement>
  resumeRef: React.RefObject<HTMLElement>
  progressRef: React.RefObject<HTMLElement>
  videoRef?: React.RefObject<HTMLVideoElement>
}

interface NavItem {
  name: string
  id: string
  ref?: React.RefObject<HTMLElement>
}

export default function Navbar({ 
  experienceRef, 
  projectsRef, 
  skillsRef, 
  certificationsRef,
  resumeRef,
  progressRef,
  videoRef
}: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Updated navigation items with all sections
  const navItems: NavItem[] = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience", ref: experienceRef },
    { name: "Projects", id: "projects", ref: projectsRef },
    { name: "Skills", id: "skills", ref: skillsRef },
    { name: "Certifications", id: "certifications", ref: certificationsRef },
    { name: "Resume", id: "resume", ref: resumeRef },
    { name: "Progress", id: "progress", ref: progressRef },
    { name: "Contact", id: "contact" }
  ]

  // Update scroll handler to include all sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      setScrolled(scrollPosition > 50)

      const sections = [
        "contact",
        "progress",
        "resume",
        "certifications",
        "skills",
        "projects",
        "experience",
        "about",
        "home"
      ]

      // Find the active section
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section && scrollPosition >= section.offsetTop - window.innerHeight / 3) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Handle video end event
  useEffect(() => {
    if (videoRef?.current) {
      const video = videoRef.current;
      const handleVideoEnd = () => {
        // Trigger confetti from navbar
        const triggerConfetti = () => {
          // Create multiple confetti bursts from different positions
          const positions = [
            { x: 0.1, y: 0 },
            { x: 0.3, y: 0 },
            { x: 0.5, y: 0 },
            { x: 0.7, y: 0 },
            { x: 0.9, y: 0 },
            { x: 0.2, y: 0.5 },
            { x: 0.4, y: 0.5 },
            { x: 0.6, y: 0.5 },
            { x: 0.8, y: 0.5 }
          ];

          positions.forEach((pos) => {
            confetti({
              particleCount: 150,
              spread: 180,
              origin: pos,
              angle: 90,
              gravity: 0.3,
              ticks: 600,
              colors: ['#3C0753', '#720455', '#910A67', '#FFFFFF', '#FFD700'],
              scalar: 2.5,
              shapes: ['star', 'circle'],
              disableForReducedMotion: false,
              drift: 0.2,
              decay: 0.97,
              startVelocity: 35,
              zIndex: 9999
            });
          });
        };

        // Trigger confetti for 7 seconds
        const interval = setInterval(triggerConfetti, 100);
        setTimeout(() => clearInterval(interval), 7000);
      };

      video.addEventListener('ended', handleVideoEnd);
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, [videoRef]);

  // Updated scrollToSection function
  const scrollToSection = (item: NavItem) => {
    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (item.ref && item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" })
    } else {
      const element = document.getElementById(item.id)
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
        window.scrollTo({
          top: elementPosition - offset,
          behavior: "smooth"
        })
      }
    }
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/50 backdrop-blur-md py-3"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Signature Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer" }}
          className="relative mt-[21px]"
        >
          <div className="w-56 h-20 relative">
            <Image
              src="/sign.png"
              alt="Signature"
              width={224}
              height={80}
              className="signature-image"
              style={{ objectFit: "contain" }}
              priority
            />
          </div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex relative items-center h-16 gap-1" ref={navRef}>
          {navItems.map((item) => (
            <NavItem
              key={item.id}
              label={item.name}
              isActive={activeSection === item.id}
              onClick={() => scrollToSection(item)}
              id={item.id}
            />
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-white/60 hover:text-white transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-[72px] bg-black/95 backdrop-blur-md md:hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-2 h-[calc(100vh-72px)] overflow-y-auto">
                {navItems.map((item) => (
                  <motion.button
                    key={item.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      scrollToSection(item)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`text-left px-4 py-3 rounded-md transition-colors ${
                      activeSection === item.id
                        ? "text-white bg-white/10"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

interface NavItemProps {
  label: string
  isActive: boolean
  onClick: () => void
  id: string
}

function NavItem({ label, isActive, onClick, id }: NavItemProps) {
  return (
    <motion.button
      data-id={id}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`text-sm transition-all duration-200 px-3 py-2 relative ${
        isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="activeNavIndicator"
          className="absolute -bottom-1 left-0 right-0 mx-auto w-2/3 h-0.5 rounded-full bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
