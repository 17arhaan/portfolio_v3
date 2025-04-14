"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import {
  Code2,
  LayoutGrid,
  Library,
  Wrench,
  Cloud,
  Lightbulb,
  Languages,
  Braces,
  Server,
  FileCode,
  Database,
  Cpu,
  GitBranch,
  Palette,
  BarChart3,
  Eye,
  Globe,
  LineChart,
  Network,
  Cog,
  FileText,
  GraduationCap,
  Coffee,
  Terminal,
  Atom,
  Layers,
  Beaker,
  Grid,
  DollarSign,
  ArrowRightCircle,
  Zap,
  Table,
  Flame,
  Sparkles,
  Calculator,
  Paintbrush,
  BookOpen,
  Layout,
  Ship,
  CloudLightning,
  CloudSun,
  Triangle,
  CloudDrizzle,
  GlobeLock,
  AlignJustify,
  Brain,
  DatabaseBackup,
  Sigma,
  Scan,
  MessagesSquare,
  BarChart4,
  CloudCog,
  GitMerge,
  MessageCircle,
  Github,
  Box,
} from "lucide-react"

// Color schemes for different categories
const categoryColors = {
  programming: {
    from: "#3B82F6", // blue-500
    via: "#2563EB", // blue-600
    to: "#1D4ED8", // blue-700
    bg: "rgba(59, 130, 246, 0.1)", // blue-500 with low opacity
  },
  frameworks: {
    from: "#10B981", // emerald-500
    via: "#059669", // emerald-600
    to: "#047857", // emerald-700
    bg: "rgba(16, 185, 129, 0.1)", // emerald-500 with low opacity
  },
  libraries: {
    from: "#8B5CF6", // violet-500
    via: "#7C3AED", // violet-600
    to: "#6D28D9", // violet-700
    bg: "rgba(139, 92, 246, 0.1)", // violet-500 with low opacity
  },
  tools: {
    from: "#F59E0B", // amber-500
    via: "#D97706", // amber-600
    to: "#B45309", // amber-700
    bg: "rgba(245, 158, 11, 0.1)", // amber-500 with low opacity
  },
  platforms: {
    from: "#EC4899", // pink-500
    via: "#DB2777", // pink-600
    to: "#BE185D", // pink-700
    bg: "rgba(236, 72, 153, 0.1)", // pink-500 with low opacity
  },
  domains: {
    from: "#6366F1", // indigo-500
    via: "#4F46E5", // indigo-600
    to: "#4338CA", // indigo-700
    bg: "rgba(99, 102, 241, 0.1)", // indigo-500 with low opacity
  },
  languages: {
    from: "#EF4444", // red-500
    via: "#DC2626", // red-600
    to: "#B91C1C", // red-700
    bg: "rgba(239, 68, 68, 0.1)", // red-500 with low opacity
  },
}

// Category icons
const categoryIcons = {
  programming: <Braces className="w-6 h-6 mr-2" />,
  frameworks: <LayoutGrid className="w-6 h-6 mr-2" />,
  libraries: <Library className="w-6 h-6 mr-2" />,
  tools: <Wrench className="w-6 h-6 mr-2" />,
  platforms: <Cloud className="w-6 h-6 mr-2" />,
  domains: <Lightbulb className="w-6 h-6 mr-2" />,
  languages: <Languages className="w-6 h-6 mr-2" />,
}

// Skill icons mapping
const skillIcons = {
  // Programming languages
  Python: <Code2 className="w-5 h-5 mr-2 text-blue-400" />,
  JavaScript: <FileCode className="w-5 h-5 mr-2 text-yellow-400" />,
  TypeScript: <FileCode className="w-5 h-5 mr-2 text-blue-500" />,
  Java: <Coffee className="w-5 h-5 mr-2 text-red-400" />,
  "C++": <Terminal className="w-5 h-5 mr-2 text-purple-400" />,
  C: <Terminal className="w-5 h-5 mr-2 text-blue-300" />,
  MySQL: <Database className="w-5 h-5 mr-2 text-orange-400" />,
  PostgreSQL: <Database className="w-5 h-5 mr-2 text-blue-600" />,

  // Frameworks
  ReactJS: <Atom className="w-5 h-5 mr-2 text-cyan-400" />,
  NodeJS: <Server className="w-5 h-5 mr-2 text-green-500" />,
  Django: <Layers className="w-5 h-5 mr-2 text-green-700" />,
  Flask: <Beaker className="w-5 h-5 mr-2 text-gray-400" />,
  "Tailwind CSS": <Palette className="w-5 h-5 mr-2 text-cyan-500" />,
  Bootstrap: <Grid className="w-5 h-5 mr-2 text-purple-500" />,
  jQuery: <DollarSign className="w-5 h-5 mr-2 text-blue-400" />,
  "Express.js": <Server className="w-5 h-5 mr-2 text-gray-500" />,
  "Next.js": <ArrowRightCircle className="w-5 h-5 mr-2 text-black" />,
  FastAPI: <Zap className="w-5 h-5 mr-2 text-green-400" />,

  // Libraries
  NumPy: <BarChart3 className="w-5 h-5 mr-2 text-blue-500" />,
  Pandas: <Table className="w-5 h-5 mr-2 text-purple-400" />,
  Matplotlib: <LineChart className="w-5 h-5 mr-2 text-orange-400" />,
  Seaborn: <LineChart className="w-5 h-5 mr-2 text-teal-400" />,
  PyTorch: <Flame className="w-5 h-5 mr-2 text-orange-500" />,
  "Scikit-learn": <Cog className="w-5 h-5 mr-2 text-blue-400" />,
  OpenCV: <Eye className="w-5 h-5 mr-2 text-green-500" />,
  OpenMPI: <Network className="w-5 h-5 mr-2 text-gray-400" />,
  TensorFlow: <Box className="w-5 h-5 mr-2 text-orange-400" />,
  Transformers: <Sparkles className="w-5 h-5 mr-2 text-pink-400" />,
  SciPy: <Calculator className="w-5 h-5 mr-2 text-green-400" />,
  CUDA: <Cpu className="w-5 h-5 mr-2 text-green-600" />,

  // Tools
  "Microsoft Office": <FileText className="w-5 h-5 mr-2 text-blue-600" />,
  HTML5: <FileCode className="w-5 h-5 mr-2 text-orange-500" />,
  CSS3: <Paintbrush className="w-5 h-5 mr-2 text-blue-500" />,
  Git: <GitBranch className="w-5 h-5 mr-2 text-orange-500" />,
  "Jupyter Notebook": <BookOpen className="w-5 h-5 mr-2 text-orange-400" />,
  MATLAB: <Calculator className="w-5 h-5 mr-2 text-orange-600" />,
  JavaFX: <Layout className="w-5 h-5 mr-2 text-blue-400" />,
  Docker: <Ship className="w-5 h-5 mr-2 text-blue-500" />,
  Azure: <Cloud className="w-5 h-5 mr-2 text-blue-400" />,
  AWS: <CloudLightning className="w-5 h-5 mr-2 text-orange-400" />,

  // Platforms
  "GitHub Pages": <Github className="w-5 h-5 mr-2 text-purple-400" />,
  Vercel: <Triangle className="w-5 h-5 mr-2 text-gray-500" />,
  "Google Cloud": <CloudSun className="w-5 h-5 mr-2 text-blue-400" />,
  Heroku: <CloudDrizzle className="w-5 h-5 mr-2 text-purple-500" />,
  Netlify: <GlobeLock className="w-5 h-5 mr-2 text-cyan-500" />,

  // Domains
  "Data Structures and Algorithms": <AlignJustify className="w-5 h-5 mr-2 text-green-500" />,
  "Object Oriented Programming": <Layers className="w-5 h-5 mr-2 text-blue-500" />,
  "Artificial Intelligence": <Brain className="w-5 h-5 mr-2 text-purple-500" />,
  "Database Management": <DatabaseBackup className="w-5 h-5 mr-2 text-orange-500" />,
  "Machine Learning": <Sigma className="w-5 h-5 mr-2 text-green-500" />,
  "Deep Learning": <Network className="w-5 h-5 mr-2 text-indigo-500" />,
  "Computer Vision": <Scan className="w-5 h-5 mr-2 text-teal-500" />,
  "Natural Language Processing": <MessagesSquare className="w-5 h-5 mr-2 text-blue-400" />,
  "Web Development": <Globe className="w-5 h-5 mr-2 text-cyan-500" />,
  "Data Science": <BarChart4 className="w-5 h-5 mr-2 text-purple-500" />,
  "Cloud Computing": <CloudCog className="w-5 h-5 mr-2 text-blue-400" />,
  DevOps: <GitMerge className="w-5 h-5 mr-2 text-orange-400" />,

  // Languages
  English: <MessageCircle className="w-5 h-5 mr-2 text-blue-500" />,
  Hindi: <MessageCircle className="w-5 h-5 mr-2 text-orange-500" />,
}

// Updated skills data
const skillsData = {
  programming: [
    { name: "Python", level: 95 },
    { name: "JavaScript", level: 70 },
    { name: "TypeScript", level: 20 },
    { name: "Java", level: 60 },
    { name: "C++", level: 75 },
    { name: "C", level: 75 },
    { name: "MySQL", level: 90 },
    { name: "PostgreSQL", level: 75 },
  ],
  frameworks: [
    { name: "ReactJS", level: 85 },
    { name: "NodeJS", level: 80 },
    { name: "Django", level: 85 },
    { name: "Flask", level: 90 },
    { name: "Tailwind CSS", level: 70 },
    { name: "Bootstrap", level: 85 },
    { name: "jQuery", level: 80 },
    { name: "Express.js", level: 65 },
    { name: "Next.js", level: 70 },
    { name: "FastAPI", level: 45 },
  ],
  libraries: [
    { name: "NumPy", level: 95 },
    { name: "Pandas", level: 95 },
    { name: "Matplotlib", level: 95 },
    { name: "Seaborn", level: 90 },
    { name: "PyTorch", level: 85 },
    { name: "Scikit-learn", level: 85 },
    { name: "OpenCV", level: 80 },
    { name: "OpenMPI", level: 75 },
    { name: "TensorFlow", level: 75 },
    { name: "Transformers", level: 60 },
    { name: "SciPy", level: 50 },
    { name: "CUDA", level: 70 },
  ],
  tools: [
    { name: "Microsoft Office", level: 100 },
    { name: "HTML5", level: 95 },
    { name: "CSS3", level: 95 },
    { name: "Git", level: 95 },
    { name: "Jupyter Notebook", level: 90 },
    { name: "MATLAB", level: 80 },
    { name: "JavaFX", level: 70 },
    { name: "Docker", level: 65 },
    { name: "Azure", level: 60 },
    { name: "AWS", level: 40 },
  ],
  platforms: [
    { name: "GitHub Pages", level: 90 },
    { name: "Vercel", level: 85 },
    { name: "Google Cloud", level: 55 },
    { name: "Heroku", level: 60 },
    { name: "Netlify", level: 60 },
  ],
  domains: [
    { name: "Data Structures and Algorithms", level: 95 },
    { name: "Object Oriented Programming", level: 90 },
    { name: "Artificial Intelligence", level: 90 },
    { name: "Database Management", level: 95 },
    { name: "Machine Learning", level: 90 },
    { name: "Deep Learning", level: 80 },
    { name: "Computer Vision", level: 75 },
    { name: "Natural Language Processing", level: 70 },
    { name: "Web Development", level: 90 },
    { name: "Data Science", level: 80 },
    { name: "Cloud Computing", level: 50 },
    { name: "DevOps", level: 40 },
  ],
  languages: [
    { name: "English", level: 95 },
    { name: "Hindi", level: 100 },
  ],
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState("programming")

  return (
    <section
      id="skills"
      className="w-full min-h-[90vh] py-4 px-6 md:px-10 flex flex-col items-center justify-start relative"
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
          Skills & Expertise
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
          style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
        >
          A comprehensive overview of my technical abilities, domain knowledge, and languages.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto w-full"
      >
        <Tabs defaultValue="programming" className="w-full" onValueChange={setActiveTab}>
          <div className="relative">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-1 sm:gap-2 mb-4 sm:mb-8 bg-white/5 relative">
              {Object.keys(skillsData).map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="text-[10px] sm:text-xs md:text-sm font-medium relative z-10 transition-colors duration-300 py-1 sm:py-2 data-[state=active]:text-white data-[state=active]:bg-white/10 data-[state=inactive]:text-white/70 flex items-center justify-center"
                  style={{
                    textShadow: activeTab === category ? `0 0 10px ${categoryColors[category].from}` : "none",
                  }}
                >
                  {categoryIcons[category]}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
              <motion.div
                className="absolute inset-0 bg-white/5 rounded-md shadow-sm"
                layoutId="activeTab"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                style={{
                  width: `calc(100% / ${Object.keys(skillsData).length} - 4px)`,
                  left: `calc(${Object.keys(skillsData).indexOf(activeTab)} * (100% / ${
                    Object.keys(skillsData).length
                  }))`,
                  boxShadow: `0 0 10px ${categoryColors[activeTab].from}`,
                  background: categoryColors[activeTab].bg,
                }}
              />
            </TabsList>
          </div>

          <AnimatePresence mode="wait">
            {Object.entries(skillsData).map(([category, skills]) => (
              <TabsContent key={category} value={category}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    duration: 0.4,
                    ease: [0.4, 0, 0.2, 1],
                    staggerChildren: 0.05,
                  }}
                >
                  <Card
                    className="border border-white/10 shadow-sm backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${categoryColors[category].bg}, rgba(0,0,0,0.5))`,
                      boxShadow: `0 0 20px ${categoryColors[category].bg}`,
                    }}
                  >
                    <CardContent className="pt-4 sm:pt-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                        {skills.map((skill, index) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.4, 0, 0.2, 1],
                              delay: index * 0.05,
                            }}
                            className="group"
                          >
                            <div className="mb-2 sm:mb-3 flex justify-between items-center">
                              <span className="font-medium group-hover:text-white text-white/90 transition-colors duration-300 text-sm sm:text-base flex items-center">
                                {skillIcons[skill.name] || <GraduationCap className="w-4 h-4 mr-2" />}
                                {skill.name}
                              </span>
                              <span
                                className="text-white/60 text-xs sm:text-sm px-2 py-0.5 rounded-full"
                                style={{
                                  background: categoryColors[category].bg,
                                  color: categoryColors[category].from,
                                }}
                              >
                                {skill.level}%
                              </span>
                            </div>
                            <div className="h-2 sm:h-3 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: index * 0.05 + 0.2, ease: "easeOut" }}
                                className="h-full transition-all duration-300"
                                style={{
                                  background: `linear-gradient(90deg, ${categoryColors[category].from}, ${categoryColors[category].via}, ${categoryColors[category].to})`,
                                  boxShadow: `0 0 10px ${categoryColors[category].from}`,
                                }}
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </Tabs>
      </motion.div>
    </section>
  )
}
