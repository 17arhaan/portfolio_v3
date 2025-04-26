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
  isLoading?: boolean
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
  videoRef,
  isLoading = false
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
      animate={{ 
        y: isLoading ? -100 : 0,
        opacity: isLoading ? 0 : 1
      }}
      transition={{ 
        duration: 0.8,
        ease: [0.19, 1, 0.22, 1],
        delay: 0.2
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/50 backdrop-blur-md py-1 sm:py-2"
    >
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Signature Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: isLoading ? 0.8 : 1,
            opacity: isLoading ? 0 : 1
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.19, 1, 0.22, 1],
            delay: 0.3
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer" }}
          className="relative mx-auto md:mx-0 flex items-center justify-center"
        >
          <div className="w-36 h-14 sm:w-56 sm:h-20 relative flex items-center justify-center">
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
        <div className="hidden md:flex items-center gap-2" ref={navRef}>
          {navItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ y: -20, opacity: 0 }}
              animate={{ 
                y: isLoading ? -20 : 0,
                opacity: isLoading ? 0 : 1
              }}
              transition={{
                duration: 0.4,
                ease: [0.19, 1, 0.22, 1],
                delay: 0.3 + (index * 0.1)
              }}
            >
              <NavItem
                label={item.name}
                isActive={activeSection === item.id}
                onClick={() => scrollToSection(item)}
                id={item.id}
              />
            </motion.div>
          ))}
        </div>
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
      className={`text-sm sm:text-base transition-all duration-200 px-3 py-2 relative ${
        isActive ? "text-white font-medium" : "text-white/60 hover:text-white"
      }`}
    >
      {label}
    </motion.button>
  )
}
