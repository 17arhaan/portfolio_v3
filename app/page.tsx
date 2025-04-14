"use client"

import { useRef, useState, useEffect } from "react"
import Navbar from "@/components/navbar"
import LandingPage from "@/components/landing-page"
import WorkTimeline from "@/components/work-timeline"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import ResumeSection from "@/components/resume-section"
import AnimatedFooter from "@/components/animated-footer"
import GradientBubbles from "@/components/gradient-bubbles"
import ScrollToTop from "@/components/scroll-to-top"
import SectionDivider from "@/components/section-divider"
import { motion } from "framer-motion"

export default function Home() {
  const experienceRef = useRef(null)
  const projectsRef = useRef(null)
  const skillsRef = useRef(null)
  const resumeRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const progress = Math.min(window.scrollY / totalHeight, 1)
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <main className="bg-black min-h-screen text-white relative">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#3C0753] via-[#720455] to-[#910A67] z-[60]"
        style={{
          scaleX: scrollProgress,
          transformOrigin: "0%",
          opacity: scrollProgress > 0 ? 1 : 0,
        }}
      />

      {/* Fixed background */}
      <div className="fixed inset-0 pointer-events-none">
        <GradientBubbles />
      </div>

      {/* Navbar */}
      <Navbar experienceRef={experienceRef} projectsRef={projectsRef} skillsRef={skillsRef} resumeRef={resumeRef} />

      {/* Landing Page */}
      <LandingPage experienceRef={experienceRef} />

      {/* Section Divider */}
      <SectionDivider />

      {/* Experience Section */}
      <section ref={experienceRef} id="experience" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <WorkTimeline />
      </section>

      {/* Section Divider */}
      <SectionDivider />

      {/* Projects Section */}
      <section ref={projectsRef} id="projects" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ProjectsSection />
      </section>

      {/* Section Divider */}
      <SectionDivider />

      {/* Skills Section */}
      <section ref={skillsRef} id="skills" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <SkillsSection />
      </section>

      {/* Section Divider */}
      <SectionDivider />

      {/* Resume Section */}
      <section ref={resumeRef} id="resume" className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <ResumeSection />
      </section>

      {/* Footer */}
      <AnimatedFooter />

      {/* Scroll to top button */}
      <ScrollToTop />
    </main>
  )
}
