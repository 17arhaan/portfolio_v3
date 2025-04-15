"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

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

  // Updated navigation items with all sections
  const navItems: NavItem[] = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Experience", id: "experience", ref: experienceRef },
    { name: "Projects", id: "projects", ref: projectsRef },
    { name: "Skills", id: "skills", ref: skillsRef },
    { name: "Certifications", id: "certifications" },
    { name: "Resume", id: "resume", ref: resumeRef },
    { name: "Progress", id: "progress" },
    { name: "Contact", id: "contact" }
  ]

  // Update scroll handler to include all sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
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
        if (section && scrollPosition >= section.offsetTop - 100) {
          setActiveSection(sectionId)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Signature Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ cursor: "pointer" }}
          className="relative -ml-2 mt-[21px] mr-4"
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

        {/* Navigation Links */}
        <div className="relative flex items-center h-16 gap-1" ref={navRef}>
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
