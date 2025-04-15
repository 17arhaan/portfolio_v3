"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { CinematicVideo } from "./cinematic-video"

interface NavbarProps {
  experienceRef: React.RefObject<HTMLElement>
  projectsRef: React.RefObject<HTMLElement>
  skillsRef: React.RefObject<HTMLElement>
  certificationsRef: React.RefObject<HTMLElement>
  resumeRef?: React.RefObject<HTMLElement>
  progressRef?: React.RefObject<HTMLElement>
}

interface NavItem {
  id: string
  name: string
  ref?: React.RefObject<HTMLElement>
}

export default function Navbar({ experienceRef, projectsRef, skillsRef, certificationsRef, resumeRef, progressRef }: NavbarProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  // Define navigation items
  const navItems: NavItem[] = [
    { id: "home", name: "Home" },
    { id: "about", name: "About" },
    { id: "experience", name: "Experience", ref: experienceRef },
    { id: "projects", name: "Projects", ref: projectsRef },
    { id: "skills", name: "Skills", ref: skillsRef },
    { id: "certifications", name: "Certifications", ref: certificationsRef },
    { id: "resume", name: "Resume", ref: resumeRef },
    { id: "progress", name: "Progress", ref: progressRef },
    { id: "contact", name: "Contact" },
  ]

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "experience", "projects", "skills", "certifications", "resume", "progress", "contact"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveIndex(i)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section
  const scrollToSection = (item: NavItem) => {
    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (item.ref && item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" })
    } else if (item.id === "contact") {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 mt-3 ${
          isScrolled ? "bg-black/40 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-64 h-16 cursor-pointer ml-[20px]"
            onClick={() => setIsVideoOpen(true)}
          >
            <Image
              src="sign.png"
              alt="Arhaan Girdhar"
              width={960}
              height={288}
              className="w-full h-full object-contain"
              style={{ objectFit: "contain" }}
              priority
            />
          </motion.div>

          <div className="relative flex items-center h-16">
            {/* Remove the indicator div completely */}
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <NavItem
                  key={item.id}
                  label={item.name}
                  isActive={activeIndex === navItems.indexOf(item)}
                  onClick={() => scrollToSection(item)}
                  id={item.id}
                />
              ))}
            </div>

            <button
              className="md:hidden text-white/70 hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden fixed top-16 left-0 right-0 bg-black/30 backdrop-blur-sm border-t border-white/10 z-40"
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`text-white/70 hover:text-white transition-colors ${
                  activeIndex === navItems.indexOf(item) ? "text-white font-medium" : ""
                }`}
                onClick={() => scrollToSection(item)}
              >
                {item.name}
              </a>
            ))}
          </div>
        </motion.div>
      )}

      <CinematicVideo isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
    </>
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
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      onClick={onClick}
      className={`nav-button text-sm px-3 py-2 relative ${
        isActive ? "text-white font-medium active-nav-item" : "text-white/60 hover:text-white"
      }`}
      style={{
        textShadow: isActive
          ? "0 0 10px rgba(255, 255, 255, 0.6)"
          : "none",
      }}
    >
      {label}
    </motion.button>
  )
}
