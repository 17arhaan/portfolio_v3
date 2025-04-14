"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

interface NavbarProps {
  experienceRef: React.RefObject<HTMLElement>
  projectsRef: React.RefObject<HTMLElement>
  skillsRef: React.RefObject<HTMLElement>
  resumeRef?: React.RefObject<HTMLElement>
}

interface NavItem {
  name: string
  id: string
  ref?: React.RefObject<HTMLElement>
}

export default function Navbar({ experienceRef, projectsRef, skillsRef, resumeRef }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home")
  const [scrolled, setScrolled] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Define navigation items
  const navItems: NavItem[] = [
    { name: "Home", id: "home" },
    { name: "Experience", id: "experience", ref: experienceRef },
    { name: "Projects", id: "projects", ref: projectsRef },
    { name: "Skills", id: "skills", ref: skillsRef },
    { name: "Resume", id: "resume", ref: resumeRef },
    { name: "Contact", id: "contact" },
  ]

  // Update indicator position
  const updateIndicator = (itemId: string) => {
    if (!navRef.current || !indicatorRef.current) return

    const navItem = navRef.current.querySelector(`[data-id="${itemId}"]`) as HTMLElement
    if (!navItem) return

    const navRect = navRef.current.getBoundingClientRect()
    const itemRect = navItem.getBoundingClientRect()

    // Calculate position relative to the navbar
    const left = itemRect.left - navRect.left
    const width = itemRect.width

    // Update indicator position with smoother transition
    indicatorRef.current.style.transition =
      "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
    indicatorRef.current.style.transform = `translateX(${left}px)`
    indicatorRef.current.style.width = `${width}px`
  }

  // Handle scroll event to update navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setScrolled(scrollPosition > 50)

      // Update active section based on scroll position
      const homeSection = document.getElementById("home")
      const experienceSection = document.getElementById("experience")
      const projectsSection = document.getElementById("projects")
      const skillsSection = document.getElementById("skills")
      const resumeSection = document.getElementById("resume")

      if (resumeSection && scrollPosition >= resumeSection.offsetTop - 100) {
        setActiveSection("resume")
      } else if (skillsSection && scrollPosition >= skillsSection.offsetTop - 100) {
        setActiveSection("skills")
      } else if (projectsSection && scrollPosition >= projectsSection.offsetTop - 100) {
        setActiveSection("projects")
      } else if (experienceSection && scrollPosition >= experienceSection.offsetTop - 100) {
        setActiveSection("experience")
      } else {
        setActiveSection("home")
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update indicator position when active section changes
  useEffect(() => {
    updateIndicator(activeSection)
  }, [activeSection])

  // Scroll to section
  const scrollToSection = (item: NavItem) => {
    if (item.id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else if (item.ref && item.ref.current) {
      item.ref.current.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    // Add scroll-triggered animation to the navbar
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-black/70 backdrop-blur-lg py-3"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Signature Logo - Using the updated image */}
        <Link href="/" className="flex items-center">
          <div className="w-48 h-16 relative">
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
        </Link>

        {/* Navigation Links */}
        <div className="relative flex items-center h-16" ref={navRef}>
          {/* Moving indicator */}
          <motion.div
            ref={indicatorRef}
            className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#910A67] to-[#3C0753] rounded-full"
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              opacity: { delay: 0.5, duration: 0.3 },
              width: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
            }}
          />

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
