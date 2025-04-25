"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Brain, Code2, Target, BarChart2, Users, MessageSquare } from "lucide-react"
import { useState } from "react"

export default function AboutSection() {
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  const skillDetails = {
    "ai-ml": {
      title: "AI & ML",
      icon: Brain,
      color: "text-blue-400",
      description: "Specialized in machine learning and artificial intelligence applications",
      content: (
        <div className="space-y-4">
          <p>
            As an AI/ML enthusiast, I've developed a strong foundation in machine learning algorithms and artificial intelligence applications. My expertise includes:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Building and training neural networks for various applications</li>
            <li>Developing predictive models and recommendation systems</li>
            <li>Working with natural language processing and computer vision</li>
            <li>Implementing deep learning solutions for real-world problems</li>
            <li>Currently pursuing a Minor Specialization in AI & ML at MIT, Manipal</li>
          </ul>
        </div>
      )
    },
    "software-dev": {
      title: "DSA & Software Development",
      icon: Code2,
      color: "text-emerald-400",
      description: "Data Structures, Algorithms, and Full-stack development",
      content: (
        <div className="space-y-4">
          <p>
            With a strong foundation in both DSA and software development, I bring a comprehensive skill set to the table:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Expertise in Data Structures and Algorithms with C++ and Python</li>
            <li>Active participation in competitive programming on platforms like LeetCode</li>
            <li>Full-stack development experience with modern frameworks</li>
            <li>Building scalable and efficient web applications</li>
            <li>Strong problem-solving skills and algorithmic thinking</li>
          </ul>
        </div>
      )
    },
    "problem-solving": {
      title: "Problem Solving",
      icon: Target,
      color: "text-red-400",
      description: "Analytical thinking and creative solutions",
      content: (
        <div className="space-y-4">
          <p>
            My problem-solving approach combines analytical thinking with creative solutions:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Systematic approach to complex technical challenges</li>
            <li>Strong debugging and optimization skills</li>
            <li>Creative thinking for innovative solutions</li>
            <li>Efficient algorithm design and implementation</li>
            <li>Continuous learning and adaptation to new challenges</li>
          </ul>
        </div>
      )
    },
    "digital-marketing": {
      title: "Digital Marketing",
      icon: BarChart2,
      color: "text-pink-400",
      description: "Strategic digital marketing and analytics expertise",
      content: (
        <div className="space-y-4">
          <p>
            My digital marketing expertise combines technical knowledge with strategic thinking:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Strategic planning and execution of digital marketing campaigns</li>
            <li>Data-driven decision making using analytics tools</li>
            <li>SEO optimization and content strategy development</li>
            <li>Social media marketing and community engagement</li>
            <li>Performance tracking and ROI analysis</li>
            <li>Integration of marketing automation tools</li>
          </ul>
        </div>
      )
    },
    "leadership": {
      title: "Leadership & Project Management",
      icon: Users,
      color: "text-purple-400",
      description: "Leading teams and managing complex projects",
      content: (
        <div className="space-y-4">
          <p>
            My leadership experience demonstrates my ability to drive projects and teams to success:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Leading development teams in complex software projects</li>
            <li>Implementing agile methodologies for efficient project management</li>
            <li>Mentoring team members and fostering collaborative environments</li>
            <li>Managing project timelines and deliverables effectively</li>
            <li>Coordinating between technical and non-technical stakeholders</li>
          </ul>
        </div>
      )
    },
    "communication": {
      title: "Communication Skills",
      icon: MessageSquare,
      color: "text-amber-400",
      description: "Effective communication and collaboration",
      content: (
        <div className="space-y-4">
          <p>
            My communication skills enable me to bridge the gap between technical and non-technical domains:
          </p>
          <ul className="list-disc list-inside space-y-2 text-white/70">
            <li>Clear and effective technical documentation</li>
            <li>Presenting complex concepts to diverse audiences</li>
            <li>Active listening and constructive feedback</li>
            <li>Cross-functional team collaboration</li>
            <li>Professional networking and relationship building</li>
          </ul>
        </div>
      )
    }
  }

  return (
    <section id="about" className="py-12 sm:py-20 relative w-full">
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">About Me</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-2 sm:mt-3 text-xs sm:text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            Get to know the person behind the code.
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-title-line"
          />
        </motion.div>

        {/* Left Column - Profile Picture and Summary */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full lg:w-1/3 space-y-6 sm:space-y-8"
          >
            {/* Profile Picture */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto lg:mx-auto rounded-full overflow-hidden border-4 border-white/10"
              style={{
                boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              }}
            >
              <Image
                src="/pfp.png"
                alt="Arhaan Girdhar"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative px-4 sm:px-0 lg:px-0"
            >
              <div className="absolute -top-4 -left-4 text-3xl sm:text-4xl text-white/20">"</div>
              <div className="absolute -bottom-4 -right-4 text-3xl sm:text-4xl text-white/20">"</div>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed italic relative z-10">
                I'm a passionate software engineer with a keen interest in building innovative solutions that make a difference. 
                Currently pursuing Computer Science with a Minor Specialization in AI & ML at MIT, Manipal, I'm constantly 
                exploring new technologies and pushing the boundaries of what's possible.
              </p>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>

          {/* Right Column - Skill Tiles */}
          <div className="w-full lg:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {Object.entries(skillDetails).map(([key, skill]) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                  className={`p-4 sm:p-5 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer ${
                    activeSkill === key ? 'bg-white/10 ring-1 ring-white/20' : 'bg-white/5'
                  }`}
                  onClick={() => setActiveSkill(activeSkill === key ? null : key)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <skill.icon className={`w-5 h-5 ${skill.color}`} />
                    <h3 className="text-sm sm:text-base font-semibold text-white">{skill.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 mb-2">{skill.description}</p>
                  {activeSkill === key && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 pt-3 border-t border-white/10"
                    >
                      <div className="space-y-3">
                        <p className="text-sm text-white/90 leading-relaxed">
                          {skill.content.props.children[0].props.children}
                        </p>
                        <ul className="space-y-2">
                          {skill.content.props.children[1].props.children.map((item: any, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.1 }}
                              className="flex items-start gap-2 text-sm text-white/70"
                            >
                              <div className="mt-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                              </div>
                              <span className="leading-relaxed">{item.props.children}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 