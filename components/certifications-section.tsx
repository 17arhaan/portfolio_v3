"use client"

import { useState } from "react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Award, ExternalLink, CheckCircle, Clock, Github } from "lucide-react"
import Image from "next/image"
import { GlowEffect } from "./ui/glow-effect"

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
]

export default function CertificationsSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="certifications" className="py-20 relative w-full">
      <div className="max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Professional Certifications</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            A showcase of my professional certifications and achievements.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
            style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20 place-items-center">
          {certificationsData.map((cert, index) => {
            const x = useMotionValue(0)
            const y = useMotionValue(0)

            const rotateX = useTransform(y, [-100, 100], [10, -10])
            const rotateY = useTransform(x, [-100, 100], [-10, 10])

            const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
              const rect = event.currentTarget.getBoundingClientRect()
              const width = rect.width
              const height = rect.height
              const mouseX = event.clientX - rect.left
              const mouseY = event.clientY - rect.top
              const centerX = mouseX - width / 2
              const centerY = mouseY - height / 2
              x.set(centerX)
              y.set(centerY)
            }

            const handleMouseLeave = () => {
              x.set(0)
              y.set(0)
            }

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -5 }}
                className="h-full perspective-1000 w-[450px]"
                style={{
                  maxWidth: "100%"
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.div
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                  className="h-full"
                >
                  <Card className="h-full overflow-hidden border border-white/10 bg-transparent w-[450px] p-4">
                    <CardHeader className="pb-1 px-8">
                      <div className="flex justify-between items-start gap-6">
                        <div className="flex-1 min-w-0">
                          <CardTitle className="text-xl text-white group-hover:text-primary transition-colors duration-300 line-clamp-2">
                            {cert.title}
                          </CardTitle>
                          <CardDescription className="flex items-center mt-2 text-white/70 text-sm">
                            <Award className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span className="truncate">{cert.issuer}</span>
                            <span className="mx-2">•</span>
                            <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                            <span>{cert.date}</span>
                            {cert.expiryDate && <span> - {cert.expiryDate}</span>}
                          </CardDescription>
                        </div>
                        <div className="flex-shrink-0">
                          <div className="relative h-24 w-24 rounded-md overflow-hidden border border-white/10">
                            <Image 
                              src={cert.image} 
                              alt={cert.title} 
                              fill 
                              className="object-contain p-3" 
                            />
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-col px-8">
                      <div
                        className={`transition-all duration-300 ${
                          expandedId === cert.id ? "max-h-[500px]" : "max-h-24"
                        } overflow-hidden`}
                      >
                        <p className="text-sm text-white/70 mb-4">{cert.description}</p>

                        {expandedId === cert.id && (
                          <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            transition={{ duration: 0.3 }}
                            className="space-y-4 mt-4"
                          >
                            <div className="mb-4">
                              <p className="text-sm font-medium mb-1 text-white">Credential ID</p>
                              <p className="text-sm text-white/70">{cert.credentialId}</p>
                            </div>

                            <div className="mb-4">
                              <p className="text-sm font-medium mb-2 text-white">Skills</p>
                              <div className="flex flex-wrap gap-2">
                                {cert.skills.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="text-xs font-medium bg-white/10 text-white/90 hover:bg-white/20 transition-colors"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      <div className="mt-6">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="relative"
                        >
                          <GlowEffect glowColor="rgba(255, 255, 255, 0.5)" intensity={0.7}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full bg-transparent text-white/90 hover:bg-white/10 hover:text-white border-white/20"
                              onClick={() => toggleExpand(cert.id)}
                            >
                              {expandedId === cert.id ? "Show Less" : "Show More"}
                            </Button>
                          </GlowEffect>
                        </motion.div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="w-full space-y-2">
                        {new Date(cert.date) > new Date() ? (
                          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent text-white/70 border-white/20 hover:bg-white/10">
                            <Clock className="h-4 w-4" />
                            Ongoing
                          </Button>
                        ) : Array.isArray(cert.credentialURL) ? (
                          <div className="flex flex-col gap-2">
                            {cert.credentialURL.map((credential, index) => (
                              <Button key={index} variant="outline" size="sm" className="w-full gap-2 bg-transparent text-white/70 border-white/20 hover:bg-white/10" asChild>
                                <a href={credential.url} target="_blank" rel="noopener noreferrer">
                                  <CheckCircle className="h-4 w-4" />
                                  <span className="truncate">{credential.title}</span>
                                  <ExternalLink className="h-3 w-3 ml-1 flex-shrink-0" />
                                </a>
                              </Button>
                            ))}
                          </div>
                        ) : cert.credentialURL ? (
                          <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent text-white/70 border-white/20 hover:bg-white/10" asChild>
                            <a href={cert.credentialURL} target="_blank" rel="noopener noreferrer">
                              <CheckCircle className="h-4 w-4" />
                              View Credential
                              <ExternalLink className="h-3 w-3 ml-1" />
                            </a>
                          </Button>
                        ) : (
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent text-white/70 border-white/20 hover:bg-white/10" asChild>
                              <a href="https://github.com/17arhaan" target="_blank" rel="noopener noreferrer">
                                <Github className="h-4 w-4" />
                                View Code
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                            <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent text-white/70 border-white/20 hover:bg-white/10" asChild>
                              <a href="https://arhaangirdhar.com" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                View Demo
                              </a>
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 