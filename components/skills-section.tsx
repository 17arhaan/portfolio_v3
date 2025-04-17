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
import React from 'react'

// Define the skill categories type
type SkillCategory = 'programming' | 'frameworks' | 'libraries' | 'tools' | 'platforms' | 'domains' | 'languages';

type CategoryColor = {
  from: string;
  via: string;
  to: string;
  bg: string;
};

type CategoryColors = Record<SkillCategory, CategoryColor>;

type CategoryIcons = Record<SkillCategory, React.ReactElement>;

type SkillName = 'Python' | 'JavaScript' | 'TypeScript' | 'Java' | 'C++' | 'C' | 'MySQL' | 'PostgreSQL' |
                 'ReactJS' | 'NodeJS' | 'Django' | 'Flask' | 'Tailwind CSS' | 'Bootstrap' | 'jQuery' | 'Express.js' | 'Next.js' | 'FastAPI' |
                 'NumPy' | 'Pandas' | 'Matplotlib' | 'Seaborn' | 'PyTorch' | 'Scikit-learn' | 'OpenCV' | 'OpenMPI' | 'TensorFlow' | 'Transformers' | 'SciPy' | 'CUDA' |
                 'Microsoft Office' | 'HTML5' | 'CSS3' | 'Git' | 'Jupyter Notebook' | 'MATLAB' | 'JavaFX' | 'Docker' | 'Azure' | 'AWS' |
                 'GitHub Pages' | 'Vercel' | 'Google Cloud' | 'Heroku' | 'Netlify' |
                 'Data Structures and Algorithms' | 'Object Oriented Programming' | 'Artificial Intelligence' | 'Database Management' |
                 'Machine Learning' | 'Deep Learning' | 'Computer Vision' | 'Natural Language Processing' | 'Web Development' |
                 'Data Science' | 'Cloud Computing' | 'DevOps' |
                 'English' | 'Hindi';

type SkillDescription = {
  description: string;
  applications: string[];
};

type SkillDescriptions = Record<SkillName, SkillDescription>;

type Skill = {
  name: SkillName;
  level: number;
};

type SkillData = Record<SkillCategory, Skill[]>;

type SkillIcon = Record<SkillName, React.ReactElement>;

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
  programming: <Code2 className="w-5 h-5 mr-2 text-blue-400" />,
  frameworks: <LayoutGrid className="w-5 h-5 mr-2 text-emerald-400" />,
  libraries: <Library className="w-5 h-5 mr-2 text-violet-400" />,
  tools: <Wrench className="w-5 h-5 mr-2 text-amber-400" />,
  platforms: <Cloud className="w-5 h-5 mr-2 text-pink-400" />,
  domains: <Lightbulb className="w-5 h-5 mr-2 text-indigo-400" />,
  languages: <Languages className="w-5 h-5 mr-2 text-red-400" />,
}

// Skill icons mapping
const skillIcons = {
  // Programming languages
  Python: <Code2 className="w-4 h-4 mr-2 text-blue-400" />,
  JavaScript: <FileCode className="w-4 h-4 mr-2 text-yellow-400" />,
  TypeScript: <FileCode className="w-4 h-4 mr-2 text-blue-500" />,
  Java: <Coffee className="w-4 h-4 mr-2 text-red-400" />,
  "C++": <Terminal className="w-4 h-4 mr-2 text-purple-400" />,
  C: <Terminal className="w-4 h-4 mr-2 text-blue-300" />,
  MySQL: <Database className="w-4 h-4 mr-2 text-orange-400" />,
  PostgreSQL: <Database className="w-4 h-4 mr-2 text-blue-600" />,

  // Frameworks
  ReactJS: <Atom className="w-4 h-4 mr-2 text-cyan-400" />,
  NodeJS: <Server className="w-4 h-4 mr-2 text-green-500" />,
  Django: <Layers className="w-4 h-4 mr-2 text-green-700" />,
  Flask: <Beaker className="w-4 h-4 mr-2 text-gray-400" />,
  "Tailwind CSS": <Palette className="w-4 h-4 mr-2 text-cyan-500" />,
  Bootstrap: <Grid className="w-4 h-4 mr-2 text-purple-500" />,
  jQuery: <DollarSign className="w-4 h-4 mr-2 text-blue-400" />,
  "Express.js": <Server className="w-4 h-4 mr-2 text-gray-500" />,
  "Next.js": <ArrowRightCircle className="w-4 h-4 mr-2 text-black" />,
  FastAPI: <Zap className="w-4 h-4 mr-2 text-green-400" />,

  // Libraries
  NumPy: <BarChart3 className="w-4 h-4 mr-2 text-blue-500" />,
  Pandas: <Table className="w-4 h-4 mr-2 text-purple-400" />,
  Matplotlib: <LineChart className="w-4 h-4 mr-2 text-orange-400" />,
  Seaborn: <LineChart className="w-4 h-4 mr-2 text-teal-400" />,
  PyTorch: <Flame className="w-4 h-4 mr-2 text-orange-500" />,
  "Scikit-learn": <Cog className="w-4 h-4 mr-2 text-blue-400" />,
  OpenCV: <Eye className="w-4 h-4 mr-2 text-green-500" />,
  OpenMPI: <Network className="w-4 h-4 mr-2 text-gray-400" />,
  TensorFlow: <Box className="w-4 h-4 mr-2 text-orange-400" />,
  Transformers: <Sparkles className="w-4 h-4 mr-2 text-pink-400" />,
  SciPy: <Calculator className="w-4 h-4 mr-2 text-green-400" />,
  CUDA: <Cpu className="w-4 h-4 mr-2 text-green-600" />,

  // Tools
  "Microsoft Office": <FileText className="w-4 h-4 mr-2 text-blue-600" />,
  HTML5: <FileCode className="w-4 h-4 mr-2 text-orange-500" />,
  CSS3: <Paintbrush className="w-4 h-4 mr-2 text-blue-500" />,
  Git: <GitBranch className="w-4 h-4 mr-2 text-orange-500" />,
  "Jupyter Notebook": <BookOpen className="w-4 h-4 mr-2 text-orange-400" />,
  MATLAB: <Calculator className="w-4 h-4 mr-2 text-orange-600" />,
  JavaFX: <Layout className="w-4 h-4 mr-2 text-blue-400" />,
  Docker: <Ship className="w-4 h-4 mr-2 text-blue-500" />,
  Azure: <Cloud className="w-4 h-4 mr-2 text-blue-400" />,
  AWS: <CloudLightning className="w-4 h-4 mr-2 text-orange-400" />,

  // Platforms
  "GitHub Pages": <Github className="w-4 h-4 mr-2 text-purple-400" />,
  Vercel: <Triangle className="w-4 h-4 mr-2 text-gray-500" />,
  "Google Cloud": <CloudSun className="w-4 h-4 mr-2 text-blue-400" />,
  Heroku: <CloudDrizzle className="w-4 h-4 mr-2 text-purple-500" />,
  Netlify: <GlobeLock className="w-4 h-4 mr-2 text-cyan-500" />,

  // Domains
  "Data Structures and Algorithms": <AlignJustify className="w-4 h-4 mr-2 text-green-500" />,
  "Object Oriented Programming": <Layers className="w-4 h-4 mr-2 text-blue-500" />,
  "Artificial Intelligence": <Brain className="w-4 h-4 mr-2 text-purple-500" />,
  "Database Management": <DatabaseBackup className="w-4 h-4 mr-2 text-orange-500" />,
  "Machine Learning": <Sigma className="w-4 h-4 mr-2 text-green-500" />,
  "Deep Learning": <Network className="w-4 h-4 mr-2 text-indigo-500" />,
  "Computer Vision": <Scan className="w-4 h-4 mr-2 text-teal-500" />,
  "Natural Language Processing": <MessagesSquare className="w-4 h-4 mr-2 text-blue-400" />,
  "Web Development": <Globe className="w-4 h-4 mr-2 text-cyan-500" />,
  "Data Science": <BarChart4 className="w-4 h-4 mr-2 text-purple-500" />,
  "Cloud Computing": <CloudCog className="w-4 h-4 mr-2 text-blue-400" />,
  DevOps: <GitMerge className="w-4 h-4 mr-2 text-orange-400" />,

  // Languages
  English: <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />,
  Hindi: <MessageCircle className="w-4 h-4 mr-2 text-orange-500" />,
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

// Add skill descriptions
const skillDescriptions: SkillDescriptions = {
  // Programming Languages
  Python: {
    description: "A versatile high-level programming language known for its readability and extensive library support.",
    applications: ["Web Development", "Data Science", "AI/ML", "Automation", "Scientific Computing"]
  },
  JavaScript: {
    description: "The language of the web, enabling interactive and dynamic content in browsers and server-side development.",
    applications: ["Frontend Development", "Backend (Node.js)", "Browser Extensions", "Mobile Apps"]
  },
  TypeScript: {
    description: "A typed superset of JavaScript that adds optional static typing for enhanced code quality and maintainability.",
    applications: ["Enterprise Applications", "Large-scale Projects", "Type-safe Development"]
  },
  Java: {
    description: "A class-based, object-oriented programming language designed for portability and cross-platform development.",
    applications: ["Enterprise Software", "Android Development", "Web Applications"]
  },
  "C++": {
    description: "A powerful systems programming language offering high performance and low-level memory manipulation.",
    applications: ["System Software", "Game Development", "Real-time Applications"]
  },
  C: {
    description: "A foundational programming language known for its efficiency and direct hardware access capabilities.",
    applications: ["Systems Programming", "Embedded Systems", "Operating Systems"]
  },
  MySQL: {
    description: "A popular open-source relational database management system.",
    applications: ["Data Storage", "Web Applications", "Enterprise Systems"]
  },
  PostgreSQL: {
    description: "An advanced open-source relational database with robust features and extensibility.",
    applications: ["Complex Queries", "GIS Applications", "ACID Compliance"]
  },

  // Frameworks
  ReactJS: {
    description: "A JavaScript library for building user interfaces with a component-based architecture.",
    applications: ["Single Page Applications", "Progressive Web Apps", "Interactive UIs"]
  },
  NodeJS: {
    description: "A JavaScript runtime built on Chrome's V8 engine for building scalable network applications.",
    applications: ["Server-side Development", "API Development", "Real-time Services"]
  },
  Django: {
    description: "A high-level Python web framework that encourages rapid development and clean, pragmatic design.",
    applications: ["Web Applications", "Content Management", "API Development"]
  },
  Flask: {
    description: "A lightweight WSGI web application framework in Python, known for its flexibility.",
    applications: ["Web Services", "API Development", "Microservices"]
  },
  "Tailwind CSS": {
    description: "A utility-first CSS framework for rapidly building custom user interfaces.",
    applications: ["Responsive Design", "Custom Components", "Modern UI Development"]
  },
  Bootstrap: {
    description: "A popular CSS framework for developing responsive and mobile-first websites.",
    applications: ["Responsive Websites", "Rapid Prototyping", "UI Components"]
  },
  jQuery: {
    description: "A fast and feature-rich JavaScript library designed to simplify HTML DOM manipulation.",
    applications: ["DOM Manipulation", "Event Handling", "Ajax Operations"]
  },
  "Express.js": {
    description: "A minimal and flexible Node.js web application framework.",
    applications: ["Web Applications", "REST APIs", "Middleware Integration"]
  },
  "Next.js": {
    description: "A React framework for production-grade applications with server-side rendering and static site generation.",
    applications: ["Server-side Rendering", "Static Sites", "Full-stack React"]
  },
  FastAPI: {
    description: "A modern, fast web framework for building APIs with Python based on standard type hints.",
    applications: ["API Development", "Microservices", "Data Validation"]
  },

  // Libraries
  NumPy: {
    description: "Fundamental package for scientific computing in Python with support for large, multi-dimensional arrays.",
    applications: ["Scientific Computing", "Data Analysis", "Machine Learning"]
  },
  Pandas: {
    description: "Data manipulation and analysis library providing high-performance, easy-to-use data structures.",
    applications: ["Data Analysis", "Data Cleaning", "Time Series"]
  },
  Matplotlib: {
    description: "A comprehensive library for creating static, animated, and interactive visualizations in Python.",
    applications: ["Data Visualization", "Scientific Plotting", "Statistical Graphics"]
  },
  Seaborn: {
    description: "Statistical data visualization library built on top of Matplotlib with an emphasis on aesthetic appeal.",
    applications: ["Statistical Visualization", "Complex Plots", "Data Exploration"]
  },
  PyTorch: {
    description: "An open-source machine learning library known for its dynamic computational graphs.",
    applications: ["Deep Learning", "Neural Networks", "Computer Vision"]
  },
  "Scikit-learn": {
    description: "Machine learning library featuring various classification, regression and clustering algorithms.",
    applications: ["Machine Learning", "Data Mining", "Statistical Modeling"]
  },
  OpenCV: {
    description: "Computer vision and machine learning software library with optimized algorithms.",
    applications: ["Image Processing", "Video Analysis", "Object Detection"]
  },
  OpenMPI: {
    description: "Implementation of the Message Passing Interface (MPI) standard for parallel computing.",
    applications: ["Parallel Computing", "High-Performance Computing", "Distributed Systems"]
  },
  TensorFlow: {
    description: "End-to-end open-source platform for machine learning with comprehensive tools and libraries.",
    applications: ["Deep Learning", "Neural Networks", "Model Deployment"]
  },
  Transformers: {
    description: "State-of-the-art Natural Language Processing library for modern text processing tasks.",
    applications: ["Text Generation", "Translation", "Sentiment Analysis"]
  },
  SciPy: {
    description: "Library for scientific and technical computing with modules for optimization, linear algebra, and more.",
    applications: ["Scientific Computing", "Optimization", "Signal Processing"]
  },
  CUDA: {
    description: "Parallel computing platform and programming model for NVIDIA GPUs.",
    applications: ["GPU Computing", "Parallel Processing", "High-Performance Computing"]
  },

  // Tools
  "Microsoft Office": {
    description: "Suite of productivity software for document processing, spreadsheets, and presentations.",
    applications: ["Document Creation", "Data Analysis", "Presentations"]
  },
  HTML5: {
    description: "Latest version of the HTML standard, introducing new elements and APIs for modern web development.",
    applications: ["Web Development", "Semantic Markup", "Multimedia Integration"]
  },
  CSS3: {
    description: "Style sheet language used for describing the presentation of documents written in HTML.",
    applications: ["Web Styling", "Animations", "Responsive Design"]
  },
  Git: {
    description: "Distributed version control system for tracking changes in source code during development.",
    applications: ["Version Control", "Collaboration", "Code Management"]
  },
  "Jupyter Notebook": {
    description: "Web-based interactive computing platform supporting multiple programming languages.",
    applications: ["Data Analysis", "Interactive Computing", "Documentation"]
  },
  MATLAB: {
    description: "High-level programming language and numerical computing environment.",
    applications: ["Numerical Analysis", "Algorithm Development", "Signal Processing"]
  },
  JavaFX: {
    description: "Software platform for creating desktop applications with rich user interfaces.",
    applications: ["Desktop Applications", "GUI Development", "Data Visualization"]
  },
  Docker: {
    description: "Platform for developing, shipping, and running applications in containers.",
    applications: ["Containerization", "DevOps", "Microservices"]
  },
  Azure: {
    description: "Microsoft's cloud computing platform for building, testing, and managing applications.",
    applications: ["Cloud Services", "Web Hosting", "Database Management"]
  },
  AWS: {
    description: "Amazon's comprehensive cloud computing platform with various services and tools.",
    applications: ["Cloud Computing", "Serverless", "Storage Solutions"]
  },

  // Platforms
  "GitHub Pages": {
    description: "Static site hosting service that publishes directly from GitHub repositories.",
    applications: ["Static Hosting", "Documentation", "Portfolio Sites"]
  },
  Vercel: {
    description: "Cloud platform for static sites and Serverless Functions with automatic deployments.",
    applications: ["Frontend Deployment", "Serverless Functions", "Edge Computing"]
  },
  "Google Cloud": {
    description: "Suite of cloud computing services running on Google infrastructure.",
    applications: ["Cloud Computing", "Machine Learning", "Data Analytics"]
  },
  Heroku: {
    description: "Cloud platform as a service supporting several programming languages.",
    applications: ["Web Hosting", "Database Hosting", "Application Deployment"]
  },
  Netlify: {
    description: "Platform for automating modern web projects with continuous deployment.",
    applications: ["Static Hosting", "Form Handling", "Serverless Functions"]
  },

  // Domains
  "Data Structures and Algorithms": {
    description: "Fundamental computer science concepts for organizing and manipulating data efficiently.",
    applications: ["Problem Solving", "Software Design", "Optimization"]
  },
  "Object Oriented Programming": {
    description: "Programming paradigm based on objects containing data and code.",
    applications: ["Software Design", "Code Organization", "Reusability"]
  },
  "Artificial Intelligence": {
    description: "Development of computer systems able to perform tasks that typically require human intelligence.",
    applications: ["Machine Learning", "Natural Language Processing", "Computer Vision"]
  },
  "Database Management": {
    description: "Systems and tools for organizing, storing, and retrieving data efficiently.",
    applications: ["Data Storage", "Query Optimization", "Data Integrity"]
  },
  "Machine Learning": {
    description: "Study of algorithms that improve through experience and data usage.",
    applications: ["Prediction", "Classification", "Pattern Recognition"]
  },
  "Deep Learning": {
    description: "Subset of machine learning using neural networks with multiple layers.",
    applications: ["Image Recognition", "Speech Processing", "Natural Language Understanding"]
  },
  "Computer Vision": {
    description: "Field of AI that enables computers to derive meaningful information from visual inputs.",
    applications: ["Object Detection", "Image Recognition", "Video Analysis"]
  },
  "Natural Language Processing": {
    description: "Technology enabling computers to understand and process human language.",
    applications: ["Text Analysis", "Machine Translation", "Chatbots"]
  },
  "Web Development": {
    description: "Development of websites and web applications for the internet.",
    applications: ["Frontend Development", "Backend Development", "Full-stack Development"]
  },
  "Data Science": {
    description: "Interdisciplinary field using scientific methods to extract knowledge from data.",
    applications: ["Data Analysis", "Statistical Modeling", "Data Visualization"]
  },
  "Cloud Computing": {
    description: "Delivery of computing services over the internet for faster innovation and flexible resources.",
    applications: ["Cloud Services", "Scalable Infrastructure", "Resource Management"]
  },
  DevOps: {
    description: "Set of practices combining software development and IT operations.",
    applications: ["Continuous Integration", "Deployment Automation", "Infrastructure Management"]
  },

  // Languages
  English: {
    description: "Global language for international communication and business.",
    applications: ["Technical Documentation", "International Communication", "Academic Writing"]
  },
  Hindi: {
    description: "One of the most widely spoken languages in India.",
    applications: ["Native Communication", "Cultural Exchange", "Regional Business"]
  }
}

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<SkillCategory>("programming")
  const [selectedSkill, setSelectedSkill] = useState<SkillName | null>(null)

  const handleTabChange = (value: SkillCategory) => {
    setActiveTab(value)
  }

  return (
    <section
      id="skills"
      className="w-full min-h-screen py-24 px-6 md:px-10 flex flex-col items-center justify-start relative"
    >
      <div className="text-center mb-8 relative z-10 max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
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
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl mx-auto w-full"
      >
         <Tabs defaultValue="programming" className="w-full" onValueChange={setActiveTab}>          
          <div className="relative">            
            <TabsList className="flex justify-center w-full gap-2 mb-4 sm:mb-8 bg-transparent relative">              
              {Object.keys(skillsData).map((category) => (                
                <TabsTrigger                  
                key={category}                  
                value={category}                  
                className="text-[10px] sm:text-xs md:text-sm font-medium relative z-10 transition-colors duration-300 px-4 py-2 data-[state=active]:text-white data-[state=active]:bg-blue-900/50 data-[state=inactive]:text-white/70 flex items-center justify-center rounded-md hover:bg-white/5"                  
                style={{                    
                  textShadow: activeTab === category ? `0 0 10px ${categoryColors[category].from}` : "none",                  
                }}                
                >                  
                {categoryIcons[category]}                  
                {category.charAt(0).toUpperCase() + category.slice(1)}                
                </TabsTrigger>              
                ))}            
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
                            className="group cursor-pointer"
                            onClick={() => skillDescriptions[skill.name] && setSelectedSkill(skill.name)}
                            style={{
                              cursor: skillDescriptions[skill.name] ? 'pointer' : 'default'
                            }}
                          >
                            <div className="mb-2 sm:mb-3 flex justify-between items-center">
                              <span className="font-medium group-hover:text-white text-white/90 transition-colors duration-300 text-sm sm:text-base flex items-center">
                                {skillIcons[skill.name] || <GraduationCap className="w-4 h-4 mr-2" />}
                                {skill.name}
                                {skillDescriptions[skill.name] && (
                                  <Sparkles className="w-3 h-3 ml-2 text-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                )}
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

      {/* Add Skill Spotlight section */}
      <AnimatePresence mode="wait">
        {selectedSkill && skillDescriptions[selectedSkill] && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mt-8 w-full max-w-4xl"
          >
            <Card className="border border-white/10 bg-black/40 backdrop-blur-lg shadow-xl">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-yellow-400" />
                      {selectedSkill}
                    </h3>
                    <p className="mt-2 text-white/80">
                      {skillDescriptions[selectedSkill].description}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedSkill(null)}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4">
                  <h4 className="text-sm font-medium text-white/70 mb-2">Applications</h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {skillDescriptions[selectedSkill].applications.map((app: string, index: number) => (
                      <motion.li
                        key={app}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-white/90 text-sm flex items-center gap-2"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                        {app}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
