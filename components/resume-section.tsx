"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, GraduationCap, Award, Briefcase, Users } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"

const highlights = [
  {
    icon: GraduationCap,
    title: "B.Tech in CSE { AI / ML }",
    subtext: "Manipal Institute of Technology • 2022 - 2026",
  },
  {
    icon: Award,
    title: "Hackathons",
    subtext: " • Think-a-thon\n • CreaTech\n • Hacksplosion\n • HackWithInfy",
  },
  {
    icon: Briefcase,
    title: "Experience",
    subtext: " • Bharat Electronics Limited\n • Invisible Mechanics\n • buildspace",
  },
]

export default function ResumeSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section
      id="resume"
      className="w-full py-8 sm:py-12 px-4 sm:px-6 md:px-10 flex flex-col items-center justify-start relative"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-8 sm:mb-12"
      >
        <h2 className="section-title">Resume</h2>
        <p className="mt-2 text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
          My professional journey and key achievements
        </p>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="section-title-line"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
        className="max-w-[95vw] sm:max-w-4xl mx-auto w-full"
      >
        <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-black/30 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mx-auto mb-4 sm:mb-6 md:mb-8"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                  <FileText className="w-full h-full text-white/80" />
                </motion.div>

                <motion.h3
                  className="text-lg sm:text-xl md:text-2xl font-bold text-center mb-2 sm:mb-3 md:mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}
                >
                  Curriculum Vitae
                </motion.h3>

                <motion.p
                  className="text-white/70 text-center mb-4 sm:mb-6 md:mb-8 text-xs sm:text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Download or view my complete resume to learn more about my qualifications and experience.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <motion.div
                        whileHover={{ 
                          scale: 1.03, 
                          transition: { type: "spring", stiffness: 400, damping: 10 } 
                        }}
                      >
                        <Button className="gap-2 group min-w-[120px] sm:min-w-[140px] bg-black/30 text-white border border-white/20 transition-all duration-300 backdrop-blur-sm hover:border-white/40 hover:bg-white/5 overflow-hidden relative">
                          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></span>
                          <Eye className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span
                            className="relative z-2 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm"
                            style={{
                              textShadow: `0 0 4px rgba(255, 255, 255, 0.3)`,
                              transition: "text-shadow 0.3s ease-out, color 0.3s ease-out",
                            }}
                          >
                            View Resume
                          </span>
                        </Button>
                      </motion.div>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-4xl h-[80vh] bg-black/90 border border-white/10">
                      <DialogTitle className="sr-only">Resume Preview</DialogTitle>
                      <iframe src="/Arhaan_Resume.pdf" className="w-full h-full" title="Resume" />
                    </DialogContent>
                  </Dialog>
                  
                  <motion.div
                    whileHover={{ 
                      scale: 1.03, 
                      transition: { type: "spring", stiffness: 400, damping: 10 } 
                    }}
                  >
                    <Button
                      variant="outline"
                      className="gap-2 group min-w-[120px] sm:min-w-[140px] bg-black/30 text-white border border-white/20 transition-all duration-300 backdrop-blur-sm hover:border-white/40 hover:bg-white/5 overflow-hidden relative"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 translate-x-[-100%] group-hover:translate-x-[100%] transition-all duration-1000 ease-in-out"></span>
                      <a href="/Arhaan_Resume.pdf" download className="flex items-center gap-2">
                        <Download className="h-3 w-3 sm:h-4 sm:w-4" />
                        <span
                          className="relative z-2 group-hover:text-white transition-colors duration-300 text-xs sm:text-sm"
                          style={{
                            textShadow: `0 0 4px rgba(255, 255, 255, 0.3)`,
                            transition: "text-shadow 0.3s ease-out, color 0.3s ease-out",
                          }}
                        >
                          Download PDF
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8 bg-black/20 backdrop-blur-sm">
                <div className="space-y-4 sm:space-y-6 md:space-y-8">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 sm:gap-4 group"
                    >
                      <motion.div
                        className="p-2 rounded-lg bg-white/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <highlight.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
                      </motion.div>
                      <div>
                        <h4
                          className="font-semibold text-base sm:text-lg mb-1 text-white"
                          style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
                        >
                          {highlight.title}
                        </h4>
                        <p className="text-white/80 text-xs sm:text-sm">{highlight.details}</p>
                        <p className="text-xs text-white/60 whitespace-pre-line">{highlight.subtext}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
