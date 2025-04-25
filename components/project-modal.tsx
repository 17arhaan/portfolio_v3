"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"
import Image from "next/image"
import { LucideIcon } from "lucide-react"

export interface Project {
  id: number
  title: string
  description: string
  image: string
  tags: string[]
  links: {
    url: string
    icon: LucideIcon
  }[]
  categories: string[]
}

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-[#0a0a0a] border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          {/* Left Column - Image and Links */}
          <div className="space-y-4">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
            </div>

            <div className="flex flex-wrap gap-3">
              {project.links.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{Icon.name}</span>
                  </motion.a>
                )
              })}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  className="text-sm px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Column - Description */}
          <div className="space-y-4">
            <div className="prose prose-invert max-w-none">
              {project.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="text-white/80">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {project.categories.map((category, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-full bg-[#e31266]/20 text-white/80 border border-[#e31266]/30"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 