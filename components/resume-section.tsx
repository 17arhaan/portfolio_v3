"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Eye, GraduationCap, Award, Briefcase, Users } from "lucide-react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

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
      className="w-full min-h-screen py-8 px-6 md:px-10 flex flex-col items-center justify-start relative"
    >
      <div className="text-center mb-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        >
          Resume
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
          style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
        >
          A comprehensive overview of my professional journey, skills, and achievements.
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-4xl mx-auto w-full"
      >
        <Card className="overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm text-white shadow-sm">
          <CardContent className="p-0">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="bg-black/30 p-8 flex flex-col justify-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="relative w-24 h-24 mx-auto mb-8"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse" />
                  <FileText className="w-full h-full text-white/80" />
                </motion.div>

                <motion.h3
                  className="text-2xl font-bold text-center mb-4 text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  style={{ textShadow: "0 0 8px rgba(255,255,255,0.4)" }}
                >
                  Curriculum Vitae
                </motion.h3>

                <motion.p
                  className="text-white/70 text-center mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  Download or view my complete resume to learn more about my qualifications and experience.
                </motion.p>

                <div className="flex flex-wrap justify-center gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="gap-2 group min-w-[140px] bg-white/10 hover:bg-white/20 text-white border border-white/20 button-border-glow">
                        <Eye className="h-4 w-4 transition-transform group-hover:scale-110" />
                        View Resume
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[80vh] bg-black/90 border border-white/10">
                      <iframe src="/Arhaan_Resume.pdf" className="w-full h-full" title="Resume" />
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="gap-2 group min-w-[140px] bg-white/5 hover:bg-white/10 text-white border border-white/20 button-border-glow"
                  >
                    <a href="/Arhaan_Resume.pdf" download className="flex items-center gap-2">
                      <Download className="h-4 w-4 transition-transform group-hover:scale-110" />
                      Download PDF
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    className="gap-2 group min-w-[140px] bg-white/5 hover:bg-white/10 text-white border border-white/20 button-border-glow"
                  >
                    <a
                      href="https://drive.google.com/drive/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Users className="h-4 w-4 transition-transform group-hover:scale-110" />
                      References
                    </a>
                  </Button>
                </div>
              </div>

              <div className="p-8 bg-black/20 backdrop-blur-sm">
                <div className="space-y-8">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={highlight.title}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group"
                    >
                      <motion.div
                        className="p-2.5 rounded-lg bg-white/10"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      >
                        <highlight.icon className="h-5 w-5 text-white/80" />
                      </motion.div>
                      <div>
                        <h4
                          className="font-semibold text-lg mb-1 text-white"
                          style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
                        >
                          {highlight.title}
                        </h4>
                        <p className="text-white/80">{highlight.details}</p>
                        <p className="text-sm text-white/60 whitespace-pre-line">{highlight.subtext}</p>
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
