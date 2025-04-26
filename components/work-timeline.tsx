"use client"

import { useState, useRef } from "react"
import { ChevronLeft } from "lucide-react"
import { ChevronRight } from "lucide-react"
import { Briefcase } from "lucide-react"
import { Calendar } from "lucide-react"
import { MapPin } from "lucide-react"
import { Award } from "lucide-react"
import { CheckCircle2 } from "lucide-react"
import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

// Work experience data
const workExperience = [
  {
    id: 3,
    role: "Frontend Developer",
    company: "Invisible Mechanics",
    location: "Hybrid | BLR , IN",
    period: "Jan 2024 - Mar 2024",
    description: [
      "Developed responsive website serving 50,000+ monthly active users",
      "Reduced page load time from 3.2s to 1.8s through caching optimization",
      "Maintained 99% on-time delivery rate across 15 sprint cycles",
      "Decreased application bundle size from 2.8MB to 1.7MB through code splitting",
      "Implemented comprehensive error handling and monitoring systems",
    ],
    skills: ["Frontend Development", "Performance Optimization", "Digital AM"],
    logoUrl: "/IM_logo.jpg",
  },
  {
    id: 1,
    role: "Internship Trainee",
    company: "Bharat Electronics Limited",
    location: "On-Site | GZB , IN",
    period: "Jun 2024 - Jul 2024",
    description: [
      "Developed 7 JavaFX interfaces handling 500+ daily cybersecurity operations",
      "Implemented VM management system for 25+ virtual machines achieving 99.99% uptime",
      "Reduced manual processing time from 45 minutes to 27 minutes through automation",
      "Enhanced system security by implementing AES-256 encryption across all interfaces",
      "Established standardized testing procedures for all new features",
    ],
    skills: ["Cybersecurity", "System Administration", "UI Development"],
    logoUrl: "/BEL_logo.jpg",
  },
  {
    id: 2,
    role: "Project Lead",
    company: "Buildspace",
    location: "Remote | LA , US",
    period: "Jul 2024 - Sept 2024",
    description: [
      "Led development of an AI-powered mental health therapy chatbot served many monthly users",
      "Managed a 5-member cross-functional team, implementing agile methodologies across 12 sprints",
      "Improved chatbot response accuracy from 65% to 95% through advanced NLP techniques",
      "Reduced average response time from 2.5s to 1s through system optimization",
      "Established comprehensive documentation and training protocols for team members",
    ],
    skills: ["Artificial Intelligence", "Team Leadership", "Project Management"],
    logoUrl: "/Buildspaceso_logo.jpg",
  },
  {
    id: 0,
    role: "Coming Soon",
    company: "Coming Soon",
    location: "Coming Soon",
    period: "Coming Soon",
    description: [
      "Coming Soon",
      "Coming Soon",
      "Coming Soon",
      "Coming Soon",
      "Coming Soon"
    ],
    skills: ["Coming Soon"],
    logoUrl: "/placeholder.svg",
  },
]

export default function WorkTimeline() {
  const [activeIndex, setActiveIndex] = useState(workExperience.length - 1)
  const [direction, setDirection] = useState(0)
  const [hoveredDot, setHoveredDot] = useState<number | null>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const latestPositionIndex = workExperience.length - 1

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setDirection(-1)
      setActiveIndex(activeIndex - 1)
    }
  }

  const handleNext = () => {
    if (activeIndex < workExperience.length - 1) {
      setDirection(1)
      setActiveIndex(activeIndex + 1)
    }
  }

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrevious()
    }
  }

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 30 : -30,
      opacity: 0,
    }),
  }

  return (
    <div 
      className="w-full py-8 px-6 md:px-10 flex flex-col items-center justify-center relative"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Add scroll-triggered animations to the section title */}
      <div className="text-center mb-6 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        >
          Professional Experience
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
          style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
        >
          A chronological journey through my career, showcasing key roles and accomplishments in technology and
          leadership.
        </motion.p>

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
          style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
        />
      </div>

      {/* Timeline navigation */}
      <div className="flex items-center justify-between w-full max-w-5xl mb-4 relative z-10">
        <motion.div 
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevious}
            disabled={activeIndex === 0}
            className="text-white hover:bg-transparent transition-all duration-200 relative group"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 15px rgba(255,255,255,0.5)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full"
            />
            <ChevronLeft className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
          </Button>
        </motion.div>

        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-white/40" />
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-base md:text-lg font-medium text-white"
          >
            {workExperience[activeIndex].period}
          </motion.div>
        </div>

        <motion.div 
          whileHover={{ scale: 1.2 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            disabled={activeIndex === workExperience.length - 1}
            className="text-white hover:bg-transparent transition-all duration-200 relative group"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 15px rgba(255,255,255,0.5)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-full"
            />
            <ChevronRight className="h-6 w-6 relative z-10 group-hover:scale-110 transition-transform drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
          </Button>
        </motion.div>
      </div>

      {/* Timeline with dots */}
      <div className="relative w-full max-w-5xl mb-4 z-10">
        {/* Add scroll-triggered animation to the timeline */}
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="absolute"
          style={{
            left: `${(latestPositionIndex / (workExperience.length - 1)) * 100}%`,
            top: "-20px",
            transform: "translateX(-50%)",
          }}
        >
          <motion.div
            animate={{ y: [0, 3, 0] }}
            transition={{
              duration: 1.2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            <ChevronDown className="h-4 w-4 text-white/90" />
          </motion.div>
        </motion.div>

        {/* Timeline bar with scroll animation */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "100%" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative h-0.5 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{
              width: `${((activeIndex + 1) / workExperience.length) * 100}%`,
            }}
            transition={{ 
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.2
            }}
            className="absolute top-0 left-0 h-full bg-white/60 rounded-full"
            style={{
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.3)",
            }}
          />

          {/* Timeline dots */}
          <div className="absolute top-0 left-0 w-full flex justify-between transform translate-y-[-50%]">
            {workExperience.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1)
                  setActiveIndex(index)
                }}
                onMouseEnter={() => setHoveredDot(index)}
                onMouseLeave={() => setHoveredDot(null)}
                whileHover={{ scale: 1.5 }}
                whileTap={{ scale: 0.9 }}
                animate={
                  index === hoveredDot
                    ? {
                        scale: 1.3,
                      }
                    : {}
                }
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                  index <= activeIndex ? "bg-white" : "bg-white/10 hover:bg-white/20"
                }`}
                style={{
                  boxShadow: index <= activeIndex ? "0 0 8px rgba(145, 10, 103, 0.1)" : "none",
                }}
                aria-label={`View experience from ${workExperience[index].period}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Experience details */}
      <div className="w-full max-w-5xl relative z-10">
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-6 md:p-8 border border-white/5"
            style={{
              boxShadow: "0 0 20px rgba(145, 10, 103, 0.05)",
            }}
          >
            <div className="grid gap-6 md:grid-cols-[auto_1fr_2fr]">
              {/* Logo section */}
              <div className="flex justify-center items-start pt-1">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-black flex items-center justify-center border border-white/5"
                  style={{
                    boxShadow: "0 0 10px rgba(145, 10, 103, 0.05)",
                  }}
                >
                  {workExperience[activeIndex].logoUrl ? (
                    <img
                      src={workExperience[activeIndex].logoUrl || "/placeholder.svg"}
                      alt={`${workExperience[activeIndex].company} logo`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Briefcase className="w-8 h-8 text-white/50" />
                  )}
                </motion.div>
              </div>

              {/* Title section */}
              <div className="space-y-3">
                <motion.h2
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl md:text-2xl font-bold text-white"
                >
                  {workExperience[activeIndex].role}
                </motion.h2>

                <div className="space-y-1.5">
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center text-white/80"
                  >
                    <Briefcase className="h-4 w-4 mr-2 text-white/40" />
                    <div className="flex flex-col">
                      <span className="text-base font-medium">{workExperience[activeIndex].company}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center text-white/60"
                  >
                    <MapPin className="h-4 w-4 mr-2 text-white/40" />
                    <span className="text-sm">{workExperience[activeIndex].location}</span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="pt-1 flex flex-wrap gap-2"
                >
                  {workExperience[activeIndex].skills.map((skill, index) => (
                    <motion.div
                      key={index}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      }}
                      className="inline-flex items-center px-2.5 py-1 text-xs rounded-full bg-black text-white/60 border border-white/5 cursor-default"
                      style={{
                        boxShadow: "0 0 5px rgba(145, 10, 103, 0.05)",
                      }}
                    >
                      <Award className="h-3 w-3 mr-1 text-white/40" />
                      {skill}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Description section */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="space-y-3 text-white/60"
              >
                {workExperience[activeIndex].description.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.07 }}
                    whileHover={{
                      x: 3,
                    }}
                    className="flex items-start group"
                  >
                    <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-white/30 group-hover:text-white/50 transition-colors duration-200" />
                    <p className="text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-200">
                      {item}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
