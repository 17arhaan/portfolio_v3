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
import { Dialog, DialogContent } from "@/components/ui/dialog"
import Image from "next/image"

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
    role: "AI Intern",
    company: "Concur IP",
    location: "On-Site | Noida , IN",
    period: "Present",
    description: [
      "Collaborating with AI engineers to develop and optimize machine learning models",
      "Working on model architecture design and implementation for IP-related tasks",
      "Participating in code reviews and contributing to the AI development pipeline",
      "Assisting in data preprocessing and feature engineering for model training",
      "Documenting model development processes and maintaining technical documentation"
    ],
    skills: ["Artificial Intelligence", "Machine Learning", "Python", "TensorFlow", "Model Development", "Team Collaboration"],
    logoUrl: "/questel.jpg",
  },
]

export default function WorkTimeline() {
  const [selectedExperience, setSelectedExperience] = useState<typeof workExperience[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Sort by start date ascending for left-to-right timeline
  const sortedExperiences = [...workExperience].sort((a, b) => {
    const getDate = (period: string) => period === "Present" ? new Date() : new Date(period.split(" - ")[0]);
    return getDate(a.period).getTime() - getDate(b.period).getTime();
  });

  return (
    <div className="w-full py-8 px-6 md:px-10 flex flex-col items-center justify-center relative">
      {/* Section Title */}
      <div className="text-center mb-16 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white drop-shadow-[0_0_12px_rgba(220,180,255,0.5)]"
        >
          Professional Experience
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-white/90 max-w-2xl mx-auto italic drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
        >
          A chronological journey through my career, showcasing key roles and accomplishments in technology and leadership.
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

      {/* Timeline */}
      <div className="relative w-full max-w-7xl mx-auto">
        {/* Premium glassy timeline line with moving sheen and node dots */}
        <div className="absolute left-0 right-0 top-24 h-2 bg-white/20 backdrop-blur-md rounded-full z-0 overflow-hidden" style={{marginLeft: '7rem', marginRight: '7rem'}}>
          {/* Moving white sheen */}
          <div className="absolute top-0 left-0 h-full w-1/4 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-sheen" />
        </div>
        <div className="flex justify-between items-start relative z-10" style={{minHeight: '220px', gap: '2.5rem'}}>
          {sortedExperiences.map((exp, idx) => (
            <div key={exp.id} className="flex flex-col items-center flex-1 group select-none relative">
              {/* Date above logo */}
              <div className="mb-5 text-base font-medium text-white/60 tracking-wide uppercase">{exp.period}</div>
              {/* Logo in premium circle with animated ring and radial gradient on hover */}
              <div className="relative z-10 mt-2">
                <div
                  className="w-28 h-28 rounded-full border-2 border-white/40 bg-black flex items-center justify-center transition-transform duration-300 cursor-pointer group-hover:scale-110 shadow-lg overflow-hidden relative"
                  style={{boxShadow: '0 2px 24px 0 rgba(255,255,255,0.08)'}}
                  onClick={() => { setSelectedExperience(exp); setIsModalOpen(true); }}
                >
                  {/* Animated white ring on hover */}
                  <span className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300 group-hover:ring-4 group-hover:ring-white/60 group-hover:ring-offset-2 group-hover:ring-offset-white/10" />
                  {/* Faint radial gradient on hover */}
                  <span className="absolute inset-0 rounded-full pointer-events-none transition-all duration-300 group-hover:bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.12)_0%,_transparent_70%)]" />
                  {exp.logoUrl ? (
                    <Image src={exp.logoUrl} alt={exp.company + ' logo'} width={112} height={112} className="w-full h-full object-cover" />
                  ) : (
                    <Briefcase className="w-14 h-14 text-white/60" />
                  )}
                </div>
                {/* Premium vertical connector with fade */}
                <div className="absolute left-1/2 top-full w-1.5 h-10 bg-gradient-to-b from-white/40 via-white/10 to-transparent -translate-x-1/2" />
              </div>
              {/* Minimal details below, larger text, premium hover effect */}
              <div
                className="mt-6 text-center cursor-pointer group-hover:scale-105 transition-transform duration-300"
                onClick={() => { setSelectedExperience(exp); setIsModalOpen(true); }}
              >
                <div className="text-2xl font-bold text-white mb-2 transition-all duration-300 group-hover:-translate-y-1 group-hover:drop-shadow-[0_0_12px_white] group-hover:tracking-wide">{exp.role}</div>
                <div className="text-lg text-white/80 mb-1 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_10px_white] group-hover:tracking-wide">{exp.company}</div>
                <div className="text-base text-white/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:drop-shadow-[0_0_8px_white] group-hover:tracking-wider">{exp.location}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-3xl bg-transparent border-none shadow-none p-0">
          {selectedExperience && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 touch-manipulation"
              onClick={() => setIsModalOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={e => e.stopPropagation()}
                className="w-full max-w-[95vw] sm:max-w-3xl bg-black/90 backdrop-blur-md rounded-xl overflow-hidden relative"
              >
                {/* Animated border */}
                <div className="absolute -inset-[1px] rounded-xl z-0 pointer-events-none">
                  <motion.div 
                    className="absolute inset-0 rounded-xl animate-border-glow"
                    style={{background: 'linear-gradient(90deg, #910A67 0%, rgba(255,255,255,0.2) 50%, #910A67 100%)'}}
                  />
                  <motion.div 
                    className="absolute inset-0 rounded-xl animate-border-glow-delayed"
                    style={{background: 'linear-gradient(90deg, #910A67 0%, rgba(255,255,255,0.2) 50%, #910A67 100%)'}}
                  />
                </div>
                {/* Modal content */}
                <div className="relative z-10 bg-black/95 m-[1px] rounded-xl">
                  {/* Header */}
                  <div className="sticky top-0 bg-[#0a0a0a] border-b border-white/10 p-3 sm:p-4 flex items-center justify-between">
                    <h2 className="text-lg sm:text-2xl font-bold text-white">{selectedExperience.role}</h2>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Close modal"
                    >
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                  </div>
                  {/* Content */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6 p-3 sm:p-6">
                    {/* Left Column - Logo */}
                    <div className="flex flex-col items-center gap-4">
                      <motion.div 
                        className="relative w-40 h-40 rounded-lg overflow-hidden bg-black border border-white/10 shadow-lg"
                        whileHover={{ boxShadow: '0 0 30px #910A67, 0 0 15px rgba(255,255,255,0.1)' }}
                        transition={{ duration: 0.3 }}
                      >
                        {selectedExperience.logoUrl ? (
                          <Image
                            src={selectedExperience.logoUrl}
                            alt={`${selectedExperience.company} logo`}
                            width={160}
                            height={160}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Briefcase className="w-16 h-16 text-white/70 m-auto mt-6" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
                      </motion.div>
                    </div>
                    {/* Right Column - Details */}
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-white/90">
                          <Briefcase className="h-4 w-4" />
                          <span>{selectedExperience.company}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <MapPin className="h-4 w-4" />
                          <span>{selectedExperience.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <Calendar className="h-4 w-4" />
                          <span>{selectedExperience.period}</span>
                        </div>
                      </div>
                      <div className="prose prose-invert max-w-none">
                        {selectedExperience.description.map((item, idx) => (
                          <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.3 + idx * 0.07 }}
                            whileHover={{ x: 3, textShadow: '0 0 5px #910A67' }}
                            className="flex items-start group mb-2"
                          >
                            <motion.span 
                              className="w-2 h-2 rounded-full border-2 border-white/40 mr-2 mt-1.5 flex-shrink-0"
                              whileHover={{ scale: 1.2, borderColor: '#910A67', boxShadow: '0 0 8px #910A67' }}
                              transition={{ duration: 0.2 }}
                            />
                            <p className="text-sm text-white/80 group-hover:text-white transition-colors duration-200">
                              {item}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedExperience.skills.map((skill, idx) => (
                          <motion.span
                            key={idx}
                            whileHover={{ scale: 1.05, boxShadow: '0 0 15px #910A67, 0 0 8px rgba(255,255,255,0.1)' }}
                            className="text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-white/80"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Border glow keyframes */}
                <style>{`
                  @keyframes border-glow {
                    0%, 100% { opacity: 0.7; filter: blur(2px); }
                    50% { opacity: 1; filter: blur(4px); }
                  }
                  .animate-border-glow { animation: border-glow 2.5s infinite alternate; }
                  .animate-border-glow-delayed { animation: border-glow 2.5s infinite alternate 1.25s; }
                `}</style>
              </motion.div>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
      {/* Sheen animation keyframes */}
      <style>{`
        @keyframes sheen {
          0% { left: -33%; }
          100% { left: 100%; }
        }
        .animate-sheen { animation: sheen 2.5s linear infinite; }
      `}</style>
    </div>
  )
}
