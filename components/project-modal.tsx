"use client"

import { motion } from "framer-motion"
import { X, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import { LucideIcon } from "lucide-react"
import { ForwardRefExoticComponent, RefAttributes, useState, useEffect } from "react"
import { LucideProps } from "lucide-react"

const PROJECT_COLORS = {
  "J.A.R.V.I.S": "rgba(255, 62, 122, 0.4)", // reddish pink
  "Humanoid Simulation": "rgba(79, 195, 247, 0.4)", // light blue
  "W.E.A.L.T.H": "rgba(76, 175, 80, 0.4)", // green
  "Twitter Sentiment Analysis": "rgba(255, 235, 59, 0.4)", // yellow
  "SnakeCV": "rgba(156, 39, 176, 0.4)", // purple
  "TherapAI": "rgba(255, 152, 0, 0.4)", // orange
  "Speedy": "rgba(0, 188, 212, 0.4)", // cyan
  "Mind Mapper": "rgba(244, 67, 54, 0.4)", // red
  "Morpheus 3D": "rgba(255, 255, 255, 0.4)", // white
}

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    url: string
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  }[]
  categories: string[]
  projectGithubLink: string
  projectDemoLink: string
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const projectColor = PROJECT_COLORS[project.title as keyof typeof PROJECT_COLORS] || "rgba(220, 38, 38, 0.4)"

  const gradientStyle = {
    background: `linear-gradient(90deg, 
      ${projectColor}, 
      rgba(255, 255, 255, 0.2), 
      ${projectColor}
    )`
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 touch-manipulation"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onTouchStart={(e) => {
          e.stopPropagation();
        }}
        className="w-full max-w-[95vw] sm:max-w-4xl bg-black/90 backdrop-blur-md rounded-xl overflow-hidden relative"
      >
        {/* Glowing border animation */}
        <div className="absolute -inset-[1px] rounded-xl z-0">
          <motion.div 
            className="absolute inset-0 rounded-xl animate-border-glow"
            style={gradientStyle}
          />
          <motion.div 
            className="absolute inset-0 rounded-xl animate-border-glow-delayed"
            style={gradientStyle}
          />
        </div>

        {/* Modal content */}
        <div className="relative z-10 bg-black/95 m-[1px] rounded-xl">
          {/* Header */}
          <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-3 sm:p-4 flex items-center justify-between">
            <h2 className="text-lg sm:text-2xl font-bold text-white">{project.title}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 p-3 sm:p-6">
            {/* Left Column - Image and Links */}
            <div className="space-y-3 sm:space-y-4">
              <motion.div 
                className="relative aspect-video rounded-lg overflow-hidden"
                whileHover={{
                  boxShadow: `0 0 30px ${projectColor}, 0 0 15px rgba(255, 255, 255, 0.1)`
                }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
              </motion.div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                {project.links.map((link, index) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: `0 0 20px ${projectColor}, 0 0 10px rgba(255, 255, 255, 0.1)`
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-xs sm:text-sm"
                    >
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-white/90">
                        {Icon === Github ? "View on GitHub" : "View Live Demo"}
                      </span>
                    </motion.a>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 15px ${projectColor}, 0 0 8px rgba(255, 255, 255, 0.1)`
                    }}
                    className="text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Right Column - Description */}
            <div className="space-y-3 sm:space-y-4">
              <div className="prose prose-invert max-w-none">
                {project.description.split("\n\n").map((paragraph, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}
                    whileHover={{
                      x: 3,
                      textShadow: `0 0 5px ${projectColor}`
                    }}
                    className="flex items-start group mb-2"
                  >
                    <motion.span 
                      className="w-2 h-2 rounded-full border-2 border-white/40 mr-2 mt-1.5 flex-shrink-0"
                      whileHover={{
                        scale: 1.2,
                        borderColor: projectColor,
                        boxShadow: `0 0 8px ${projectColor}`
                      }}
                      transition={{ duration: 0.2 }}
                    />
                    <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-200">
                      {paragraph.startsWith("• ") ? paragraph.substring(2) : paragraph}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {project.categories.map((category, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 0 15px ${projectColor}, 0 0 8px rgba(255, 255, 255, 0.1)`
                    }}
                    className="text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                    style={{
                      backgroundColor: projectColor.replace("0.4", "0.1"),
                      borderColor: projectColor
                    }}
                  >
                    {category}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ProjectModal 