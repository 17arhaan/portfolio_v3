"use client"

import { useState, useRef, useEffect, Suspense } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Tag, ExternalLink, Github, X, CheckCircle2, ArrowUpRight, Filter, Award, Calendar, AlertCircle, GitPullRequest, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import dynamic from 'next/dynamic'

// Dynamically import heavy components
const ProjectModal = dynamic(() => import('./project-modal'), {
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
    title: "Humanoid Simulation",
    description: "• Developed a sophisticated humanoid simulation using Unity and C#, implementing advanced physics-based character movement and interaction systems.\n\n• Integrated inverse kinematics (IK) for realistic limb movements and procedural animation, enhancing the natural feel of character interactions.\n\n• Created an intuitive control system that allows users to manipulate the humanoid character with precision, demonstrating complex motor skills and balance mechanics.\n\n• Implemented real-time environment interaction capabilities, allowing the humanoid to adapt to different surfaces and obstacles dynamically.",
    image: "/projects/humanoid.png",
    tags: ["Unity", "C#", "Physics Simulation", "IK Systems", "Procedural Animation"],
    links: [
      {
        url: "https://github.com/yourusername/humanoid-simulation",
        icon: Github
      }
    ],
    categories: ["Game Development", "Simulation"]
  },
  {
    id: 2,
    title: "AI Chat Application",
    description: "• Built a real-time chat application powered by advanced AI models, enabling natural language conversations and intelligent responses.\n\n• Implemented WebSocket connections for instant message delivery and seamless user experience.\n\n• Developed a responsive UI with React and Tailwind CSS, featuring smooth animations and modern design principles.\n\n• Integrated multiple AI models with custom prompt engineering for enhanced conversation quality.",
    image: "/projects/chat.png",
    tags: ["React", "Node.js", "WebSocket", "AI/ML", "Tailwind CSS"],
    links: [
      {
        url: "https://demo-chat-ai.example.com",
        icon: ExternalLink
      },
      {
        url: "https://github.com/yourusername/ai-chat-app",
        icon: Github
      }
    ],
    categories: ["Web Development", "AI/ML"]
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "• Designed and developed a modern portfolio website using Next.js 13 and Tailwind CSS, showcasing professional work and achievements.\n\n• Implemented smooth animations and transitions using Framer Motion for an engaging user experience.\n\n• Created a responsive design that adapts seamlessly to different screen sizes and devices.\n\n• Optimized performance through lazy loading, image optimization, and efficient code splitting.",
    image: "/projects/portfolio.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "TypeScript"],
    links: [
      {
        url: "https://your-portfolio.com",
        icon: ExternalLink
      },
      {
        url: "https://github.com/yourusername/portfolio",
        icon: Github
      }
    ],
    categories: ["Web Development", "UI/UX"]
  },
  {
    id: 4,
    title: "3D Game Engine",
    description: "• Developed a custom 3D game engine from scratch using C++ and OpenGL, implementing core rendering systems and physics simulations.\n\n• Created a flexible entity component system (ECS) architecture for efficient game object management.\n\n• Implemented advanced graphics features including PBR materials, dynamic lighting, and post-processing effects.\n\n• Built a custom scene editor with real-time preview capabilities for rapid prototyping.",
    image: "/projects/engine.png",
    tags: ["C++", "OpenGL", "Graphics Programming", "Physics", "Game Engine"],
    links: [
      {
        url: "https://github.com/yourusername/3d-game-engine",
        icon: Github
      }
    ],
    categories: ["Game Development", "Graphics Programming"]
  },
  {
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
    id: 11,
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
  "computer vision",
  "data science",
]

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [filteredProjects, setFilteredProjects] = useState(projects)
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)
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
            animate={{
              opacity: 1,
              y: 0,
            }}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="group"
            >
              <motion.div
              whileHover={{
                scale: 1.02,
                  y: -5,
                  boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.3), 0 0 30px rgba(220, 38, 38, 0.2), 0 0 15px rgba(255, 255, 255, 0.1)"
              }}
                whileTap={{ scale: 0.98 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden cursor-pointer h-full flex flex-col transition-all duration-300 hover:border-white/20 hover:bg-white/10"
            >
                {/* Image Container */}
                <div className="aspect-video relative overflow-hidden">
                  <Suspense fallback={<ImagePlaceholder />}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={75}
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYvLy02Ky8wOUQ5OjtKLzZFRVVLS1JWW1xbN0RkcmdiVmJWW1b/2wBDARUXFx4aHR4eHVZOTlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlZWVlb/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                    />
                  </Suspense>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-300">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <motion.span
                            key={tag}
                            initial={isMounted ? { opacity: 0, y: 10 } : false}
                            animate={isMounted ? { opacity: 1, y: 0 } : false}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/90 text-[10px] rounded-full border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                    >
                      {tag}
                    </motion.span>
                  ))}
                  {project.tags.length > 3 && (
                    <motion.span
                            initial={isMounted ? { opacity: 0, y: 10 } : false}
                            animate={isMounted ? { opacity: 1, y: 0 } : false}
                            transition={{ duration: 0.3, delay: 0.3 }}
                            className="px-2 py-1 bg-white/10 backdrop-blur-sm text-white/60 text-[10px] rounded-full border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all duration-300"
                    >
                            +{project.tags.length - 3}
                    </motion.span>
                  )}
                    </div>
                    </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium text-white mb-2 group-hover:text-white/90 transition-colors duration-300">{project.title}</h3>
                  <p className="text-white/60 text-sm line-clamp-3 mb-4 flex-grow group-hover:text-white/80 transition-colors duration-300">{project.description}</p>
                  <motion.button
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ 
                      scale: 1.02,
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white/80 text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                  >
                    <span>View Details</span>
                    <ArrowUpRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </motion.button>
                </div>
              </motion.div>
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

