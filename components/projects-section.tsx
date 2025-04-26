"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, ExternalLink, Github, X, CheckCircle2, ArrowUpRight, Filter, Award, Calendar, AlertCircle, GitPullRequest, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import dynamic from 'next/dynamic'
import type { Project } from "@/components/project-modal"

// Dynamically import heavy components
const ProjectModal = dynamic(() => import("@/components/project-modal"), {
  loading: () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="animate-pulse bg-white/5 rounded-lg w-full max-w-4xl h-[80vh] mx-4"></div>
    </div>
  ),
  ssr: false
})

// Loading placeholder for images
const ImagePlaceholder = () => (
  <div className="w-full h-full bg-white/5 animate-pulse" />
)

// Projects data
const projects = [
  {
    id: 1,
    title: "J.A.R.V.I.S",
    description:
      "• Built a sophisticated AI assistant with multi-modal capabilities using Python, TensorFlow, and advanced NLP models\n\n• Implemented real-time object detection with YOLOv8 achieving 91% mAP, and speech recognition with 95% accuracy\n\n• Developed a CNN-based face authentication system with 98% accuracy, supporting multi-user profiles and dynamic learning\n\n• Created a modular architecture with 20+ custom plugins for task automation, system control, and API integrations\n\n• Integrated OpenAI's GPT models for context-aware conversations and task understanding\n\n• Engineered a custom wake word detection system with 99% accuracy using MFCC features and Deep Learning",
    image: "/jarvis_l.png",
    tags: [
      "Python",
      "TensorFlow",
      "PyTorch",
      "YOLOv8",
      "OpenAI API",
      "Whisper ASR",
      "CNN",
      "RNN",
      "LSTM",
      "GRU",
      "FastAPI",
    ],
    links: [
      { url: "https://github.com/17arhaan/J.A.R.V.I.S", icon: Github },
    ],
    categories: ["artificial intelligence", "deep learning"],
  },
  {
    id: 2,
    title: "Humanoid Simulation",
    description:
      "• Developed a physics-based humanoid robot simulation using Python and PyBullet\n\n• Implemented reinforcement learning algorithms for bipedal locomotion control\n\n• Created custom reward functions and state representations for stable walking\n\n• Integrated motion capture data for natural movement patterns\n\n• Built a real-time visualization system with PyOpenGL\n\n• Implemented collision detection and response for realistic interactions\n\n• Added support for different terrains and environmental conditions",
    image: "/mujoco.png",
    tags: [
      "Python",
      "PyBullet",
      "PyTorch",
      "Reinforcement Learning",
      "OpenGL",
      "Physics Simulation",
      "Motion Planning",
      "Control Systems",
      "Robotics",
      "3D Graphics",
    ],
    links: [
      { url: "https://github.com/17arhaan/Humanoid_Simulation", icon: Github },
    ],
    categories: ["deep learning"],
  },
  {
    id: 3,
    title: "W.E.A.L.T.H",
    description:
      "• Engineered a full-stack finance tracking application with Next.js 13, TypeScript, and PostgreSQL\n\n• Implemented real-time transaction tracking with WebSocket integration for live updates\n\n• Built a RESTful API with Express.js featuring JWT authentication and role-based access control\n\n• Designed a responsive UI with Tailwind CSS and Framer Motion for smooth animations\n\n• Integrated Plaid API for secure bank account linking and automated transaction imports\n\n• Developed custom analytics dashboard with Chart.js for visualizing spending patterns\n\n• Implemented automated bill detection and recurring payment tracking using ML algorithms",
    image: "/wealth_l.png",
    tags: [
      "Next.js",
      "TypeScript",
      "Express.js",
      "Tailwind CSS",
      "PostgreSQL",
      "Prisma",
      "WebSocket",
      "JWT",
      "Plaid API",
      "Chart.js",
    ],
    links: [
      { url: "https://wealth-pi.vercel.app/", icon: ExternalLink },
      { url: "https://github.com/17arhaan/W.E.A.L.T.H", icon: Github },
    ],
    categories: ["web development"],
  },
  {
    id: 4,
    title: "Twitter Sentiment Analysis",
    description:
      "• Built a real-time Twitter sentiment analysis platform using Next.js and Python\n\n• Implemented custom NLP models with 92% accuracy for sentiment classification\n\n• Created an interactive dashboard with real-time sentiment visualization using Chart.js\n\n• Developed a secure authentication system with JWT and password hashing\n\n• Built a responsive UI with shadcn/ui components and Tailwind CSS\n\n• Integrated Twitter API for real-time tweet fetching and analysis\n\n• Added user profiles with analysis history and saved searches",
    image: "/sentiment_l.png",
    tags: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "Chart.js", "JWT", "shadcn/ui", "Twitter API"],
    links: [
      { url: "https://sentiment-analysis-sepia.vercel.app/", icon: ExternalLink },
      { url: "https://github.com/17arhaan/Sentiment_Analysis", icon: Github },
    ],
    categories: ["data science", "artificial intelligence", "machine learning"],
  },
  {
    id: 5,
    title: "SnakeCV",
    description:
      "• Developed a multi-mode Snake Game with computer vision controls using Python, OpenCV, and React\n\n• Implemented real-time hand gesture recognition with 98% accuracy using MediaPipe and custom CV models\n\n• Created an AI agent using Q-learning achieving average scores of 50+ points\n\n• Built a responsive web version with React and TypeScript featuring custom animations\n\n• Designed a replay system storing game states in IndexedDB for offline access\n\n• Integrated WebRTC for real-time multiplayer functionality with <100ms latency\n\n• Added leaderboard system with Firebase real-time database integration",
    image: "/snake_l.png",
    tags: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "React",
      "TypeScript",
      "WebRTC",
      "Firebase",
      "Q-Learning",
      "WebGL",
      "Socket.io",
    ],
    links: [
      { url: "https://github.com/17arhaan/Snake_CV_ML", icon: Github },
    ],
    categories: ["computer vision", "machine learning", "web development"],
  },
  {
    id: 6,
    title: "TherapAI",
    description:
      "• Built an AI-powered mental health platform using Python, FastAPI, and React\n\n• Integrated GPT-4 with custom fine-tuning for therapeutic conversations achieving 90% user satisfaction\n\n• Implemented real-time emotion detection from text and voice with 94% accuracy\n\n• Developed secure user authentication and HIPAA-compliant data storage\n\n• Created a progressive web app with offline support and push notifications\n\n• Built an emergency response system with automated escalation protocols\n\n• Integrated with external mental health resources and crisis hotlines",
    image: "/therapai.png",
    tags: [
      "Python",
      "FastAPI",
      "PyTorch",
      "TensorFlow",
      "Transformers",
      "Hugging Face",
      "NumPy",
      "Pandas",
      "MongoDB",
      "Docker",
    ],
    links: [
      { url: "https://github.com/17arhaan/TherapAI", icon: Github },
    ],
    categories: ["artificial intelligence", "machine learning"],
  },
  {
    id: 7,
    title: "Speedy",
    description:
      "• Built an interactive reaction time test with Next.js and Framer Motion\n\n• Implemented random delay system to prevent anticipation\n\n• Created performance metrics and feedback system\n\n• Added dark mode support and responsive design\n\n• Integrated beautiful animations and transitions\n\n• Developed tracking system for best times\n\n• Deployed on Vercel with automatic CI/CD pipeline",
    image: "/speedy_l.png",
    tags: [
      "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Next.js",
      "Vercel",
      "CI/CD",
      "React",
      "Animation",
    ],
    links: [
      { url: "https://speedy-green.vercel.app/", icon: ExternalLink },
      { url: "https://github.com/17arhaan/Speedy", icon: Github },
    ],
    categories: ["web development"],
  },
  {
    id: 8,
    title: "Mind Mapper",
    description:
      "• Built an AI-powered mind map generator using Next.js and React Flow\n\n• Integrated Google Gemini API for intelligent content generation with robust error handling\n\n• Implemented interactive node-based visualization with drag-and-drop functionality\n\n• Created custom node and edge components for enhanced visual appeal\n\n• Added export functionality for saving mind maps as high-quality PNG images\n\n• Developed a responsive design with dark mode support\n\n• Implemented real-time node expansion and connection management\n\n• Added comprehensive error handling and user feedback system",
    image: "/mindmapper_l.png",
    tags: [
      "Next.js",
      "TypeScript",
      "React Flow",
      "Google Gemini API",
      "Tailwind CSS",
      "shadcn/ui",
      "Node.js",
      "AI/ML",
      "Error Handling",
    ],
    links: [
      { url: "https://v0-mindmap-app-sigma.vercel.app", icon: ExternalLink },
      { url: "https://github.com/17arhaan/Mind_Mapper", icon: Github },
    ],
    categories: ["web development", "artificial intelligence"],
  },
]

// Available categories for filtering
const allCategories = [
  "all",
  "web development",
  "artificial intelligence",
  "machine learning",
  "deep learning",
  "data science",
  "computer vision"
]

// Projects data
const PROJECT_COLORS: { [key: string]: string } = {
  "J.A.R.V.I.S": "rgba(255, 62, 122, 0.4)", // reddish pink
  "Humanoid Simulation": "rgba(79, 195, 247, 0.4)", // light blue
  "W.E.A.L.T.H": "rgba(76, 175, 80, 0.4)", // green
  "Twitter Sentiment Analysis": "rgba(255, 235, 59, 0.4)", // yellow
  "SnakeCV": "rgba(156, 39, 176, 0.4)", // purple
  "TherapAI": "rgba(255, 152, 0, 0.4)", // orange
  "Speedy": "rgba(0, 188, 212, 0.4)", // cyan
  "Mind Mapper": "rgba(244, 67, 54, 0.4)", // red
}

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const modalRef = useRef<HTMLDivElement | null>(null)
  const [showAllActivities, setShowAllActivities] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Filter projects based on category
  const filterProjects = (category: string) => {
    let filtered = projects

    // Filter by category
    if (category !== "all") {
      filtered = filtered.filter((project) => project.categories.includes(category))
    }

    setFilteredProjects(filtered)
  }

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    filterProjects(category)
  }

  // Open project modal
  const openProjectModal = (project: typeof projects[0]) => {
    setSelectedProject(project)
    document.body.style.overflow = "hidden" // Prevent scrolling when modal is open
  }

  // Close project modal
  const closeProjectModal = () => {
    setSelectedProject(null)
    document.body.style.overflow = "auto" // Re-enable scrolling
  }

  // Handle click outside modal to close it
  const handleModalBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && modalRef.current.contains(e.target as Node)) {
      closeProjectModal()
    }
  }

  // Access properties safely
  const projectTitle = selectedProject ? selectedProject.title : ""
  const projectImage = selectedProject ? selectedProject.image : "/placeholder.svg"
  const projectGithubLink = selectedProject ? selectedProject.links.find(link => link.icon === Github)?.url : ""
  const projectDemoLink = selectedProject ? selectedProject.links.find(link => link.icon === ExternalLink)?.url : ""
  const projectCategories = selectedProject ? selectedProject.categories : []
  const projectTags = selectedProject ? selectedProject.tags : []
  const projectDescription = selectedProject ? selectedProject.description : ""

  // Format description to handle line breaks
  const formatDescription = (description: string) => {
    return description.split("\n\n").map((item: string, idx: number) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.3 + idx * 0.07 }}
        whileHover={{
          x: 3,
          textShadow: "0 0 5px rgba(255, 255, 255, 0.2)",
        }}
        className="flex items-start group mb-2"
      >
        <CheckCircle2 className="h-5 w-5 mr-3 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white/90 transition-colors duration-200" />
        <p className="text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-200">
          {item.startsWith("• ") ? item.substring(2) : item}
        </p>
      </motion.div>
    ))
  }

  return (
    <section id="projects" className="py-12 sm:py-20 relative w-full overflow-hidden">
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto">
      <div className="text-center mb-12 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
            className="section-title"
        >
          Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto"
        >
          A showcase of my technical projects spanning web development, artificial intelligence, and computer vision.
        </motion.p>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
            className="section-title-line"
        />
      </div>

      {/* Category filters */}
        <div className="w-full max-w-[800px] mx-auto mb-8 flex items-center justify-center relative z-10">
        <div className="flex flex-wrap justify-center gap-2">
          <div className="flex items-center mr-2">
            <Filter className="h-4 w-4 text-white/70 mr-2" />
            <span className="text-sm text-white/70 italic">Filter:</span>
          </div>
          {allCategories.map((category) => (
            <motion.button
              key={category}
              onClick={() => handleCategoryChange(category)}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className={`px-3 py-1 rounded-full text-xs transition-all duration-200 ${
                activeCategory === category
                  ? "bg-white/20 text-white font-medium border border-white/20"
                  : "bg-white/5 text-white/70 border border-white/5 hover:bg-white/10 hover:text-white/90"
              }`}
              style={{
                boxShadow: activeCategory === category ? "0 0 10px rgba(255, 255, 255, 0.1)" : "none",
              }}
            >
              {category.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6 lg:px-8">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-1 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(90deg, 
                    ${PROJECT_COLORS[project.title]}, 
                    rgba(255, 255, 255, 0.2), 
                    ${PROJECT_COLORS[project.title]}
                  )`,
                  filter: 'blur(8px)',
                  zIndex: 0
                }}
              />
              <Card
                onClick={() => openProjectModal(project)}
                className="relative cursor-pointer overflow-hidden bg-black/40 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-500 z-10 group"
              >
                {/* Image Container with Zoom Out Effect */}
                <div className="aspect-video relative overflow-hidden group">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    className="w-full h-full relative"
                  >
                    <Suspense fallback={<ImagePlaceholder />}>
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={75}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Ky8wOUQ5OjtKLzZFRVVLS1JWW1xbN0RkcmdiVmJWW1b/2wBDARUXFx4aHR4eHVZOTlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                      />
                    </Suspense>
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-4 relative">
                  <motion.div
                    initial={false}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3 className="text-lg font-medium text-white text-center group-hover:text-[#DCB4FF] transition-colors duration-500">
                      {project.title}
                    </h3>
                  </motion.div>
                  
                  {/* Tags Preview */}
                  <motion.div 
                    className="flex flex-wrap justify-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    initial={false}
                    whileHover={{ y: -2 }}
                  >
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span 
                        key={index}
                        className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/60 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/40">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        {isMounted && selectedProject && (
          <Suspense fallback={
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="animate-pulse w-16 h-16 rounded-full bg-white/10" />
            </div>
          }>
            <ProjectModal 
              project={selectedProject} 
              onClose={() => setSelectedProject(null)} 
            />
          </Suspense>
        )}
    </div>
    </section>
  )
}

