"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ExternalLink, CheckCircle, Clock, Github, X, Tag } from "lucide-react"
import Image from "next/image"
import { GlowEffect } from "./ui/glow-effect"
import { AnimatePresence } from "framer-motion"

// Sample certifications data
const certificationsData = [
  {
    id: 8,
    title: "Meta Back-End Developer Professional Certificate",
    issuer: "Meta",
    date: "June 2025",
    expiryDate: null,
    description: "Comprehensive professional certification covering back-end development fundamentals, APIs, databases, security, and deployment. Building job-ready skills with hands-on projects and real-world applications.",
    credentialId: null,
    credentialURL: "",
    skills: ["Back-End Development", "APIs", "Database Design", "Python", "Django", "Version Control", "Cloud Deployment", "Security", "System Design", "Web Development"],
    image: "/meta.png",
  },
  {
    id: 5,
    title: "Foundations of AI and Machine Learning",
    issuer: "Microsoft",
    date: "May 2025",
    expiryDate: null,
    description: "Comprehensive introduction to AI & ML infrastructure, covering data pipelines, model frameworks, deployment strategies, and cloud computing solutions.",
    credentialId: null,
    credentialURL: "",
    skills: ["AI", "ML", "Data Management", "Model Frameworks", "Model Deployment", "Cloud Computing", "AI Infrastructure", "Version Control", "Scalability"],
    image: "/microsoft.svg",
  },
  {
    id: 7,
    title: "Digital Marketing Specialization",
    issuer: "Illinois",
    date: "April 2025",
    expiryDate: null,
    description: "Strategic digital marketing training focusing on data analysis, consumer behavior, brand measurement, and campaign attribution through practical application of tools and visualization techniques.",
    credentialId: "1ME6P85IAKC7 | QDDUU62J27AK | HT1IYP3OUP4U",
    credentialURL: [
      {
        title: "Marketing in Digital World",
        url: "https://www.coursera.org/account/accomplishments/certificate/1ME6P85IAKC7"
      },
      {
        title: "Digital Marketing Analysis in Theory",
        url: "https://www.coursera.org/account/accomplishments/certificate/QDDUU62J27AK"
      },
      {
        title: "Digital Marketing Analysis in Practice",
        url: "https://www.coursera.org/account/accomplishments/certificate/HT1IYP3OUP4U"
      }
    ],
    skills: ["Data Analysis", "Consumer Behavior", "Brand Measurement", "Campaign Attribution", "Data Visualization", "Marketing Analytics", "Storytelling", "Business Impact"],
    image: "/igies.png",
  },
  {
    id: 6,
    title: "Foundations of Project Management",
    issuer: "Google",
    date: "April 2025",
    expiryDate: null,
    description: "Essential project management concepts including project selection, resource allocation, risk management, and team leadership for successful project delivery.",
    credentialId: "PR9LFUKNWDA1",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/PR9LFUKNWDA1",
    skills: ["Problem Solving", "Leadership", "Project Management", "Risk Management", "Responsiblity"],
    image: "/google.png",
  },
  {
    id: 4,
    title: "Generative AI with Large Language Models",
    issuer: "AWS",
    date: "Jan 2025",
    expiryDate: null,
    description: "Advanced training in Generative AI and LLMs, covering model training, fine-tuning, deployment, and optimization for real-world applications.",
    credentialId: "6763NRR61X28",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/6763NRR61X28",
    skills: ["Generative AI", "Large Language Models", "Transformer Architecture", "Model Training", "Fine-Tuning", "AI Deployment", "Inference Optimization", "Scaling Laws", "Python", "Machine Learning"],
    image: "/aws.webp",
  },
  {
    id: 3,
    title: "Introduction to Generative AI",
    issuer: "Google",
    date: "Dec 2024",
    expiryDate: null,
    description: "Fundamental concepts of Generative AI, exploring its applications, differences from traditional ML, and practical implementation strategies.",
    credentialId: "5VKU3Z5HMB2G",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/5VKU3Z5HMB2G",
    skills: ["Generative AI", "Machine Learning", "AI Applications", "Google AI Tools", "Deep Learning", "Model Development"],
    image: "/google.png",
  },
  {
    id: 9,
    title: "Mastering Big Data Analytics with PySpark",
    issuer: "Infosys",
    date: "October 2024",
    expiryDate: null,
    description: "Comprehensive training in big data analytics using PySpark, covering data processing, machine learning, and distributed computing for large-scale data analysis.",
    credentialURL: "https://drive.google.com/drive/u/0/folders/1S55QbJu8Pv5a8wAxj5SMgOviAwjTbmKl",
    skills: ["Big Data", "PySpark", "Data Processing", "Machine Learning", "Distributed Computing", "Data Analysis", "Python", "Data Engineering", "ETL", "Data Visualization"],
    image: "/infosys.webp",
  },
  {
    id: 2,
    title: "Neural Networks and Deep Learning",
    issuer: "DeepLearning.AI",
    date: "Dec 2024",
    expiryDate: null,
    description: "Comprehensive deep learning fundamentals covering neural network architectures, training techniques, and optimization strategies for AI applications.",
    credentialId: "1XMZBVRYNKB2",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/1XMZBVRYNKB2",
    skills: ["Deep Learning", "Neural Networks", "AI", "Machine Learning", "Model Training", "Vectorization", "Hyperparameter Tuning", "AI Applications", "Model Optimization"],
    image: "/deeplearningai.png",
  },
  {
    id: 1,
    title: "Exploratory Data Analysis for Machine Learning",
    issuer: "IBM",
    date: "Dec 2024",
    expiryDate: null,
    description: "Essential data analysis techniques for machine learning, including data cleaning, feature engineering, and statistical analysis methods.",
    credentialId: "Y53G36TKQGCU",
    credentialURL: "https://www.coursera.org/account/accomplishments/certificate/Y53G36TKQGCU",
    skills: ["Machine Learning", "Data Preprocessing", "Feature Engineering", "Data Cleaning", "SQL", "NoSQL", "APIs", "Outlier Detection", "Feature Scaling", "Hypothesis Testing"],
    image: "/ibm.png",
  }
].sort((a, b) => {
  const dateA = new Date(a.date);
  const dateB = new Date(b.date);
  return dateB.getTime() - dateA.getTime();
});

export default function CertificationsSection() {
  const [selectedCert, setSelectedCert] = useState<typeof certificationsData[0] | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)

  // Handle modal open/close
  const openCertModal = (cert: typeof certificationsData[0]) => {
    setSelectedCert(cert)
    document.body.style.overflow = "hidden"
  }

  const closeCertModal = () => {
    setSelectedCert(null)
    document.body.style.overflow = "auto"
  }

  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current.contains(e.target as Node)) {
      closeCertModal()
    }
  }

  return (
    <section id="certifications" className="py-12 sm:py-20 relative w-full overflow-hidden">
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-6 sm:mb-12"
        >
          <h2 className="section-title">Certifications</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
          >
            Professional certifications and achievements.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-title-line"
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {certificationsData.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openCertModal(cert)}
                className="relative bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-white/5 cursor-pointer h-full"
              >
                {/* Certificate Content */}
                <div className="p-4 sm:p-5">
                  {/* Logo and Title Section */}
                  <div className="flex items-start gap-4 mb-3">
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                      <Image
                        src={cert.image}
                        alt={cert.issuer}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white line-clamp-2 mb-1">{cert.title}</h3>
                      <p className="text-xs text-white/60">{cert.issuer}</p>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                    {cert.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-white/5 border border-white/10 text-white/50">
                        +{cert.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-xs text-white/70 line-clamp-2 mb-3">
                    {cert.description}
                  </p>

                  {/* Date and Status */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5 text-[10px] text-white/60">
                      <Calendar className="w-3 h-3" />
                      {cert.date}
                    </div>
                    {new Date(cert.date) > new Date() ? (
                      <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 border border-white/10">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] text-white/70">Ongoing</span>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2.5 text-[10px] text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <ExternalLink className="w-3 h-3 mr-1.5" />
                        View Details
                      </Button>
                    )}
                  </div>
                </div>

                {/* Hover Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Certification Modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-6"
              onClick={handleModalBackdropClick}
            >
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                transition={{
                  type: "spring",
                  damping: 30,
                  stiffness: 250,
                  mass: 1,
                  duration: 0.5,
                }}
                className="bg-black/90 border border-white/10 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative modal-glow-border"
                style={{
                  boxShadow: "0 0 30px rgba(220, 38, 38, 0.3), 0 0 15px rgba(255, 255, 255, 0.15)",
                  perspective: "1000px",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Moving glow border effect */}
                <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none">
                  <div className="glow-line glow-line-top"></div>
                  <div className="glow-line glow-line-right"></div>
                  <div className="glow-line glow-line-bottom"></div>
                  <div className="glow-line glow-line-left"></div>
                </div>

                {/* Modal header */}
                <div className="sticky top-0 bg-black/90 backdrop-blur-md z-10 flex justify-between items-center p-4 border-b border-white/10">
                  <motion.h2
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="text-xl font-bold text-white italic"
                    style={{ textShadow: "0 0 10px rgba(255,255,255,0.4)" }}
                  >
                    {selectedCert.title}
                  </motion.h2>
                  <motion.button
                    whileHover={{ rotate: 90, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closeCertModal}
                    className="p-1 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <X className="h-5 w-5 text-white/70 hover:text-white" />
                  </motion.button>
                </div>

                {/* Modal content */}
                <div className="p-3 sm:p-4 md:p-6 grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-4 sm:gap-6">
                  {/* Left column - Image and details */}
                  <div className="space-y-3 sm:space-y-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="relative w-full aspect-square rounded-lg overflow-hidden bg-white/5 border border-white/10"
                    >
                      <Image
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        fill
                        className="object-contain p-2 sm:p-4"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        quality={90}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 to-white/5 mix-blend-overlay" />
                    </motion.div>

                    {/* Certificate details */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="h-4 w-4 text-[#e31266]" />
                          <span className="text-xs sm:text-sm text-white/80">Issuer</span>
                        </div>
                        <span className="text-xs sm:text-sm text-white">{selectedCert.issuer}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-[#e31266]" />
                          <span className="text-xs sm:text-sm text-white/80">Date</span>
                        </div>
                        <span className="text-xs sm:text-sm text-white">{selectedCert.date}</span>
                      </div>

                      {selectedCert.credentialId && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#e31266]" />
                            <span className="text-xs sm:text-sm text-white/80">Credential ID</span>
                          </div>
                          <span className="text-xs sm:text-sm text-white break-all">{selectedCert.credentialId}</span>
                        </div>
                      )}
                    </motion.div>

                    {/* Verify button - Only show in modal */}
                    {new Date(selectedCert.date) <= new Date() && selectedCert.credentialURL && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-2"
                      >
                        {Array.isArray(selectedCert.credentialURL) ? (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <ExternalLink className="h-4 w-4 text-[#e31266]" />
                              <span className="text-xs sm:text-sm text-white/80">Verify Credentials</span>
                            </div>
                            {selectedCert.credentialURL.map((credential, index) => (
                              <motion.a
                                key={index}
                                href={credential.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: "rgba(227, 18, 102, 0.15)",
                                  boxShadow: "0 0 15px rgba(227, 18, 102, 0.3), 0 0 10px rgba(255, 255, 255, 0.1)",
                                }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full flex items-center justify-between px-3 sm:px-4 py-2 rounded-md bg-[#e31266]/5 text-white/90 border border-[#e31266]/20 transition-all duration-300"
                              >
                                <span className="text-xs sm:text-sm truncate mr-2">{credential.title}</span>
                                <ExternalLink className="h-4 w-4 flex-shrink-0" />
                              </motion.a>
                            ))}
                          </>
                        ) : (
                          <motion.a
                            href={selectedCert.credentialURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{
                              scale: 1.02,
                              backgroundColor: "rgba(227, 18, 102, 0.15)",
                              boxShadow: "0 0 15px rgba(227, 18, 102, 0.3), 0 0 10px rgba(255, 255, 255, 0.1)",
                            }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-md bg-[#e31266]/5 text-white/90 border border-[#e31266]/20 transition-all duration-300"
                          >
                            <ExternalLink className="h-4 w-4" />
                            <span className="text-xs sm:text-sm">Verify Credential</span>
                          </motion.a>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Right column - Description and skills */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Description */}
                    <div className="space-y-3 sm:space-y-4">
                      <motion.h3
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-base sm:text-lg font-semibold text-white italic"
                        style={{ textShadow: "0 0 8px rgba(255,255,255,0.3)" }}
                      >
                        Description
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.4 }}
                        className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed"
                      >
                        {selectedCert.description}
                      </motion.p>
                    </div>

                    {/* Skills */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-3 sm:space-y-4"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 text-[#e31266]" />
                        <span className="text-xs sm:text-sm text-white/80 italic">Skills & Technologies</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedCert.skills.map((skill, index) => (
                          <motion.span
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6 + index * 0.05 }}
                            whileHover={{
                              scale: 1.1,
                              backgroundColor: "rgba(227, 18, 102, 0.15)",
                              boxShadow: "0 0 10px rgba(227, 18, 102, 0.2), 0 0 5px rgba(255, 255, 255, 0.1)",
                            }}
                            className="px-2 sm:px-2.5 py-1 text-xs sm:text-sm rounded-full bg-[#e31266]/5 text-white/90 border border-[#e31266]/20 transition-all duration-300"
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
} 