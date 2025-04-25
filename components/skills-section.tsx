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
  Folder,
  Package,
  Box,
  Filter,
  ChevronDown,
} from "lucide-react"
import React from 'react'

const skillCategories = [
  "programming",
  "frameworks",
  "libraries",
  "tools",
  "platforms",
  "domains",
  "languages",
  "commands"
] as const

type SkillCategory = typeof skillCategories[number]
type SkillCategoryOrNull = SkillCategory | null

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
                 'Data Science' | 'Cloud Computing' | 'DevOps' | 'Parallel Programming' |
                 'English' | 'Hindi' |
                 'PowerShell' | 'Bash' | 'Shell Scripting' | 'cmd' | 'Terminal Navigation' | 'Package Management';

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
const categoryColors: Record<SkillCategory, CategoryColor> = {
  programming: { from: "#3B82F6", via: "#2563EB", to: "#1D4ED8", bg: "rgba(59, 130, 246, 0.1)" },
  frameworks: { from: "#10B981", via: "#059669", to: "#047857", bg: "rgba(16, 185, 129, 0.1)" },
  libraries: { from: "#8B5CF6", via: "#7C3AED", to: "#6D28D9", bg: "rgba(139, 92, 246, 0.1)" },
  tools: { from: "#F59E0B", via: "#D97706", to: "#B45309", bg: "rgba(245, 158, 11, 0.1)" },
  platforms: { from: "#EC4899", via: "#DB2777", to: "#BE185D", bg: "rgba(236, 72, 153, 0.1)" },
  domains: { from: "#6366F1", via: "#4F46E5", to: "#4338CA", bg: "rgba(99, 102, 241, 0.1)" },
  languages: { from: "#EF4444", via: "#DC2626", to: "#B91C1C", bg: "rgba(239, 68, 68, 0.1)" },
  commands: { from: "#06B6D4", via: "#0891B2", to: "#0E7490", bg: "rgba(6, 182, 212, 0.1)" },
}

// Category icons with null handling
const categoryIcons: Record<SkillCategory, React.ReactElement> = {
  programming: <Code2 className="w-5 h-5 mr-2 text-blue-400" />,
  frameworks: <LayoutGrid className="w-5 h-5 mr-2 text-emerald-400" />,
  libraries: <Library className="w-5 h-5 mr-2 text-violet-400" />,
  tools: <Wrench className="w-5 h-5 mr-2 text-amber-400" />,
  platforms: <Cloud className="w-5 h-5 mr-2 text-pink-400" />,
  domains: <Lightbulb className="w-5 h-5 mr-2 text-indigo-400" />,
  languages: <Languages className="w-5 h-5 mr-2 text-red-400" />,
  commands: <Terminal className="w-5 h-5 mr-2 text-cyan-400" />,
}

// Skill icons mapping
const skillIcons: Record<SkillName, React.ReactElement> = {
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
  "Deep Learning": <Brain className="w-4 h-4 mr-2 text-indigo-500" />,
  "Computer Vision": <Scan className="w-4 h-4 mr-2 text-teal-500" />,
  "Natural Language Processing": <MessagesSquare className="w-4 h-4 mr-2 text-blue-400" />,
  "Web Development": <Globe className="w-4 h-4 mr-2 text-cyan-500" />,
  "Data Science": <BarChart4 className="w-4 h-4 mr-2 text-purple-500" />,
  "Cloud Computing": <CloudCog className="w-4 h-4 mr-2 text-blue-400" />,
  DevOps: <GitMerge className="w-4 h-4 mr-2 text-orange-400" />,
  "Parallel Programming": <Network className="w-4 h-4 mr-2 text-blue-500" />,

  // Languages
  English: <MessageCircle className="w-4 h-4 mr-2 text-blue-500" />,
  Hindi: <MessageCircle className="w-4 h-4 mr-2 text-orange-500" />,

  // Command Shell
  "PowerShell": <Terminal className="w-4 h-4 mr-2 text-cyan-400" />,
  "Bash": <Terminal className="w-4 h-4 mr-2 text-green-400" />,
  "Shell Scripting": <FileCode className="w-4 h-4 mr-2 text-yellow-400" />,
  "cmd": <Terminal className="w-4 h-4 mr-2 text-purple-400" />,
  "Terminal Navigation": <Folder className="w-4 h-4 mr-2 text-blue-400" />,
  "Package Management": <Package className="w-4 h-4 mr-2 text-orange-400" />,
}

// Updated skills data
const skillsData: Record<SkillCategory, Skill[]> = {
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
    { name: "Parallel Programming", level: 65 },
  ],
  languages: [
    { name: "English", level: 95 },
    { name: "Hindi", level: 100 },
  ],
  commands: [
    { name: "PowerShell", level: 85 },
    { name: "Bash", level: 80 },
    { name: "Shell Scripting", level: 75 },
    { name: "cmd", level: 90 },
    { name: "Terminal Navigation", level: 95 },
    { name: "Package Management", level: 85 },
  ],
}

// Populate the 'all' category
// skillsData.all = Object.entries(skillsData)
//   .filter(([category]) => category !== 'all')
//   .flatMap(([_, skills]) => skills)

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
  "Parallel Programming": {
    description: "Development of programs that can execute multiple tasks simultaneously across multiple processors or cores.",
    applications: ["High-Performance Computing", "Distributed Systems", "GPU Programming", "Multi-threading"]
  },

  // Languages
  English: {
    description: "Global language for international communication and business.",
    applications: ["Technical Documentation", "International Communication", "Academic Writing"]
  },
  Hindi: {
    description: "One of the most widely spoken languages in India.",
    applications: ["Native Communication", "Cultural Exchange", "Regional Business"]
  },

  // Command Shell
  "PowerShell": {
    description: "Advanced Windows PowerShell scripting for automation and system administration.",
    applications: ["Task Automation", "System Administration", "Script Development", "Windows Management"]
  },
  "Bash": {
    description: "Unix shell and command language for Linux/Unix system administration and automation.",
    applications: ["Shell Scripting", "System Administration", "Task Automation", "Unix/Linux Management"]
  },
  "Shell Scripting": {
    description: "Creating and maintaining shell scripts for process automation and system tasks.",
    applications: ["Process Automation", "Batch Processing", "System Maintenance", "Task Scheduling"]
  },
  "cmd": {
    description: "Proficient in Windows Command Prompt for system operations and scripting.",
    applications: ["System Navigation", "File Management", "Process Control", "System Monitoring"]
  },
  "Terminal Navigation": {
    description: "Expert navigation and file management through terminal interfaces.",
    applications: ["File System Operations", "Directory Management", "Path Navigation", "Resource Location"]
  },
  "Package Management": {
    description: "Managing software packages and dependencies across different platforms.",
    applications: ["Software Installation", "Dependency Management", "Version Control", "System Updates"]
  },
}

export default function SkillsSection() {
  const [selectedSkill, setSelectedSkill] = useState<SkillCategoryOrNull>(null)
  const [selectedSkillDetails, setSelectedSkillDetails] = useState<SkillName | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Get the current skills to display
  const currentSkills = selectedSkill ? skillsData[selectedSkill] : []

  return (
    <section id="skills" className="py-12 sm:py-20 relative w-full overflow-hidden">
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="section-title">Skills</h2>
          <p className="mt-2 text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and capabilities
          </p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-title-line"
          />
        </motion.div>

        {/* Mobile Skill Selector */}
        <div className="block md:hidden mb-6">
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-white transform-gpu transition-all duration-300 ${
              selectedSkill 
                ? `bg-gradient-to-br from-${categoryColors[selectedSkill].from}20 via-${categoryColors[selectedSkill].via}30 to-${categoryColors[selectedSkill].to}20 border-white/20`
                : 'bg-white/5 border-white/10'
            }`}
            style={{
              boxShadow: selectedSkill 
                ? `0 0 20px ${categoryColors[selectedSkill].from}40,
                   0 0 40px ${categoryColors[selectedSkill].from}20,
                   inset 0 0 15px ${categoryColors[selectedSkill].from}10`
                : 'none',
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-2">
              {selectedSkill ? categoryIcons[selectedSkill] : <Filter className="h-4 w-4" />}
              <span className="text-sm">{selectedSkill ? selectedSkill.toUpperCase() : "CHOOSE A CATEGORY"}</span>
            </div>
            <ChevronDown 
              className={`h-4 w-4 text-white/70 transition-transform duration-200 ${
                isMobileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </motion.button>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="mt-2 bg-black/90 border border-white/10 rounded-lg overflow-hidden"
              >
                {skillCategories.map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => {
                      setSelectedSkill(category)
                      setSelectedSkillDetails(null)
                      setIsMobileMenuOpen(false)
                    }}
                    className={`w-full text-left px-4 py-3 text-sm transition-all duration-300 ${
                      selectedSkill === category
                        ? `bg-gradient-to-br from-${categoryColors[category].from}20 via-${categoryColors[category].via}30 to-${categoryColors[category].to}20 text-white`
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                    whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      boxShadow: selectedSkill === category 
                        ? `0 0 20px ${categoryColors[category].from}40,
                           inset 0 0 15px ${categoryColors[category].from}10`
                        : 'none',
                      transform: selectedSkill === category ? 'translateZ(5px)' : 'none'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {categoryIcons[category]}
                      <span>{category.toUpperCase()}</span>
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Desktop Skill Selector */}
        <div className="hidden md:flex justify-center mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {skillCategories.map((category) => (
              <motion.button
                key={category}
                onClick={() => {
                  setSelectedSkill(category)
                  setSelectedSkillDetails(null)
                }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  boxShadow: `0 0 20px ${categoryColors[category].from}40, 0 0 10px rgba(255, 255, 255, 0.2)`,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 transform-gpu ${
                  selectedSkill === category
                    ? `bg-gradient-to-br from-${categoryColors[category].from}20 via-${categoryColors[category].via}30 to-${categoryColors[category].to}20 text-white font-medium border border-white/20`
                    : "bg-white/5 text-white/70 border border-white/5 hover:text-white/90"
                }`}
                style={{
                  textShadow: selectedSkill === category ? `0 0 10px ${categoryColors[category].from}80` : 'none',
                  transform: selectedSkill === category ? 'translateY(-2px)' : 'none',
                  boxShadow: selectedSkill === category 
                    ? `0 0 20px ${categoryColors[category].from}40,
                       0 0 40px ${categoryColors[category].from}20,
                       inset 0 0 15px ${categoryColors[category].from}10`
                    : 'none',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                {categoryIcons[category]}
                <span>{category.toUpperCase()}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        {selectedSkill ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          >
            {skillsData[selectedSkill].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                onClick={() => setSelectedSkillDetails(skill.name)}
                whileHover={{ 
                  scale: 1.02,
                  y: -5,
                  boxShadow: `0 0 30px ${categoryColors[selectedSkill].from}30, 0 0 15px rgba(255, 255, 255, 0.1)`,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`group relative overflow-hidden border-white/5 hover:bg-white/10 transition-all duration-300 cursor-pointer transform-gpu ${
                    selectedSkillDetails === skill.name ? 'bg-white/20 border-white/20' : 'bg-white/5 hover:border-white/20'
                  }`}
                  style={{
                    transform: 'perspective(1000px)',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      {skillIcons[skill.name]}
                      <span className="text-sm font-medium text-white group-hover:text-white/90 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                    <div className="relative h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          background: `linear-gradient(to right, ${categoryColors[selectedSkill].from}, ${categoryColors[selectedSkill].via}, ${categoryColors[selectedSkill].to})`,
                          boxShadow: `0 0 20px ${categoryColors[selectedSkill].from}40`
                        }}
                      />
                    </div>
                    <div className="mt-2 text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300">
                      {skill.level}% Proficiency
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/60 text-lg">Please select a category to view skills</p>
          </motion.div>
        )}

        {/* Skill Description Section */}
        <AnimatePresence mode="wait">
          {selectedSkillDetails && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8 p-6 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  {skillIcons[selectedSkillDetails]}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-white mb-2">{selectedSkillDetails}</h3>
                  <p className="text-white/80 text-sm mb-4">
                    {skillDescriptions[selectedSkillDetails].description}
                  </p>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-white/90">Applications:</h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {skillDescriptions[selectedSkillDetails].applications.map((app, i) => (
                        <li 
                          key={i}
                          className="flex items-center gap-2 text-sm text-white/60"
                        >
                          <div className="w-1 h-1 rounded-full bg-white/40" />
                          {app}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}