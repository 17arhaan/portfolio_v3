"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { 
  Github, 
  Code, 
  CheckCircle2, 
  GitCommit,
  ChevronDown,
  FileCode,
  Coffee,
  Terminal,
  Database,
  Braces,
  Box,
  Cpu,
  Globe,
  Paintbrush,
  Layers
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { GradientBackground } from "@/components/ui/gradient-background"
import SectionDivider from "@/components/section-divider"

// Language icons mapping
const languageIcons: { [key: string]: React.ReactNode } = {
  "TypeScript": <FileCode className="w-4 h-4 text-[#3178C6]" />,
  "JavaScript": <Coffee className="w-4 h-4 text-[#F7DF1E]" />,
  "Python": <Terminal className="w-4 h-4 text-[#3776AB]" />,
  "SQL": <Database className="w-4 h-4 text-[#4479A1]" />,
  "Java": <Cpu className="w-4 h-4 text-[#007396]" />,
  "HTML": <Globe className="w-4 h-4 text-[#E34F26]" />,
  "CSS": <Paintbrush className="w-4 h-4 text-[#1572B6]" />,
  "C++": <Braces className="w-4 h-4 text-[#00599C]" />,
  "C": <Box className="w-4 h-4 text-[#A8B9CC]" />,
  "Rust": <Layers className="w-4 h-4 text-[#DEA584]" />
}

// Types for GitHub data
interface GitHubStats {
  totalRepos: number
  totalStars: number
  totalForks: number
  totalContributions: number
  languages: { name: string; percentage: number; color: string }[]
  recentActivity: {
    date: string
    repo: string
    repoUrl: string
    commits: {
      message: string
      url: string
      changes: {
        additions: number
        deletions: number
      }
    }[]
  }[]
}

// Types for LeetCode data
interface LeetCodeStats {
  totalSolved: number
  totalQuestions: number
  easySolved: number
  easyTotal: number
  mediumSolved: number
  mediumTotal: number
  hardSolved: number
  hardTotal: number
  streak: number
  maxStreak: number
  totalDays: number
  lastSolved: string
  contestRank: number
  globalRank: number
  acceptanceRate: number
  completionRate: number
  totalSubmissions: number
}

export default function ProgressSection() {
  const [activeTab, setActiveTab] = useState('github');
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null);
  const [leetcodeStats, setLeetCodeStats] = useState<LeetCodeStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('/api/github', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }
        const data = await response.json();
        if (isMounted) {
          // Ensure contributions data is properly formatted
          const contributions = Number(data.totalContributions) || 0;
          console.log('GitHub Contributions:', contributions); // Debug log
          
          setGithubStats({
            ...data,
            totalContributions: contributions,
            totalRepos: Number(data.totalRepos) || 0,
            totalStars: Number(data.totalStars) || 0,
            totalForks: Number(data.totalForks) || 0,
            languages: data.languages.map((lang: any) => ({
              ...lang,
              percentage: Number(lang.percentage) || 0
            }))
          });
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error);
        if (isMounted) {
          setError('Failed to fetch GitHub stats');
        }
      }
    };

    const fetchLeetCodeStats = async () => {
      try {
        const response = await fetch('/api/leetcode', {
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch LeetCode stats');
        }
        const data = await response.json();
        
        if (isMounted) {
          const updatedData: LeetCodeStats = {
            totalSolved: Number(data.totalSolved) || 0,
            totalQuestions: Number(data.totalQuestions) || 0,
            easySolved: Number(data.easySolved) || 0,
            easyTotal: Number(data.easyTotal) || 0,
            mediumSolved: Number(data.mediumSolved) || 0,
            mediumTotal: Number(data.mediumTotal) || 0,
            hardSolved: Number(data.hardSolved) || 0,
            hardTotal: Number(data.hardTotal) || 0,
            streak: Number(data.streak) || 0,
            maxStreak: Number(data.maxStreak) || 0,
            totalDays: Number(data.totalDays) || 0,
            lastSolved: data.lastSolved || new Date().toISOString(),
            contestRank: Number(data.contestRank) || 0,
            globalRank: Number(data.globalRank) || 0,
            totalSubmissions: Number(data.totalSubmissions) || 0,
            completionRate: (Number(data.totalSolved) / Number(data.totalQuestions)) * 100,
            acceptanceRate: 70.38
          };

          setLeetCodeStats(updatedData);
        }
      } catch (error) {
        console.error('Error fetching LeetCode stats:', error);
        if (isMounted) {
          setError('Failed to fetch LeetCode stats');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    // Fetch data immediately
    Promise.all([fetchGitHubStats(), fetchLeetCodeStats()]).catch(() => {
      if (isMounted) {
        setLoading(false);
      }
    });

    // Set up polling interval
    const interval = setInterval(() => {
      if (!loading) {
        fetchGitHubStats();
        fetchLeetCodeStats();
      }
    }, 300000); // Refresh every 5 minutes

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const renderSkeletons = () => (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Skeleton className="h-10 w-[250px] bg-muted/50" />
        <Skeleton className="h-10 w-[100px] bg-muted/50" />
      </div>
      <Skeleton className="h-[300px] w-full bg-muted/50" />
    </div>
  )

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0
    })
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
    setActiveTab(newDirection > 0 ? 'leetcode' : 'github');
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <>
      <section id="progress" className="py-20 relative overflow-hidden">
        <GradientBackground />
        <div className="container px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4 text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}>Progress</h2>
            <p className="text-white/80 max-w-2xl mx-auto mt-4 italic text-lg">
              Track my coding progress and contributions on GitHub and LeetCode.
            </p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-12">
              <div className="bg-black/20 backdrop-blur-sm p-1.5 rounded-lg border border-white/10">
                <div className="flex space-x-1">
                  <button
                    onClick={() => paginate(-1)}
                    className={`relative px-8 py-3 text-base font-medium transition-all duration-500 ease-out rounded-md overflow-hidden ${
                      activeTab === 'github'
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Github className={`h-5 w-5 transition-transform duration-500 ${activeTab === 'github' ? 'scale-110' : 'scale-100'}`} />
                      GitHub
                    </span>
                    {activeTab === 'github' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50 backdrop-blur-sm"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </button>
                  <button
                    onClick={() => paginate(1)}
                    className={`relative px-8 py-3 text-base font-medium transition-all duration-500 ease-out rounded-md overflow-hidden ${
                      activeTab === 'leetcode'
                        ? 'text-white'
                        : 'text-white/60 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Code className={`h-5 w-5 transition-transform duration-500 ${activeTab === 'leetcode' ? 'scale-110' : 'scale-100'}`} />
                      LeetCode
                    </span>
                    {activeTab === 'leetcode' && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-gradient-to-r from-black/30 to-black/50 backdrop-blur-sm"
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <AnimatePresence mode="popLayout" initial={false} custom={direction}>
                <motion.div
                  key={page}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 400, damping: 35 },
                    opacity: { duration: 0.15 }
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.8}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);

                    if (swipe < -swipeConfidenceThreshold) {
                      paginate(1);
                    } else if (swipe > swipeConfidenceThreshold) {
                      paginate(-1);
                    }
                  }}
                  className="w-full"
                  style={{ 
                    position: 'relative',
                    width: '100%'
                  }}
                >
                  {activeTab === 'github' ? (
                    <div className="space-y-6">
                      {loading
                        ? renderSkeletons()
                        : githubStats && (
                            <>
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">
                                  <a
                                    href="https://github.com/17arhaan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                                    style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                                  >
                                    <Github className="h-5 w-5" />
                                    17arhaan
                                  </a>
                                </h3>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Repositories</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{githubStats.totalRepos}</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Stars</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{githubStats.totalStars}</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Forks</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{githubStats.totalForks}</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Contributions</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                      {githubStats.totalContributions.toLocaleString()}
                                    </p>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                <CardHeader>
                                  <CardTitle className="text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Languages Used</CardTitle>
                                  <CardDescription className="text-white/60">Distribution of top programming languages in my repositories</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {githubStats.languages.map((language) => (
                                      <div key={language.name}>
                                        <div className="flex justify-between mb-1">
                                          <div className="flex items-center gap-2">
                                            {languageIcons[language.name] || <Code className="w-4 h-4 text-white/70" />}
                                            <span className="text-sm font-medium text-white">{language.name}</span>
                                          </div>
                                          <span className="text-sm text-white/60">{language.percentage}%</span>
                                        </div>
                                        <div className="relative h-2 w-full bg-black/30 rounded-full overflow-hidden">
                                          <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${language.percentage}%` }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="absolute inset-y-0 left-0 rounded-full"
                                            style={{
                                              background: `linear-gradient(90deg, ${language.color}40, ${language.color})`,
                                              boxShadow: `0 0 10px ${language.color}80, 0 0 5px ${language.color}40`,
                                              transformOrigin: 'left'
                                            }}
                                          />
                                          <motion.div
                                            initial={{ x: "-100%" }}
                                            animate={{ x: "100%" }}
                                            transition={{
                                              duration: 2,
                                              repeat: Infinity,
                                              ease: "linear",
                                              repeatDelay: 0.5
                                            }}
                                            className="absolute inset-y-0 w-20"
                                            style={{
                                              background: `linear-gradient(90deg, transparent, ${language.color}40, transparent)`,
                                              willChange: 'transform',
                                              width: `${language.percentage}%`,
                                              overflow: 'hidden'
                                            }}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                <CardHeader>
                                  <CardTitle className="text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Recent Activity</CardTitle>
                                  <CardDescription className="text-white/60">My latest commits across repositories</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-4">
                                    {githubStats.recentActivity
                                      .slice(0, showAllActivities ? undefined : 2)
                                      .map((activity, index) => (
                                        <div key={index} className="space-y-2">
                                          <div className="flex items-center gap-2 p-2 rounded-lg bg-black/30">
                                            <GitCommit className="h-5 w-5 text-white flex-shrink-0" />
                                            <div className="flex flex-col">
                                              <a 
                                                href={activity.repoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="font-medium text-white hover:text-white/80 transition-colors"
                                                style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                                              >
                                                {activity.repo.split('/')[1]}
                                              </a>
                                              <p className="text-sm text-white/60">
                                                {new Date(activity.date).toLocaleDateString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric'
                                                })}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="space-y-2">
                                            {activity.commits.map((commit, commitIndex) => (
                                              <div key={commitIndex} className="p-2 rounded-lg bg-black/20">
                                                <a 
                                                  href={commit.url}
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                  className="text-sm text-white hover:text-white/80 transition-colors block mb-1"
                                                >
                                                  {commit.message}
                                                </a>
                                                <div className="flex items-center gap-2 text-xs">
                                                  <span className="text-green-400 min-w-[32px] text-right">+{commit.changes.additions}</span>
                                                  <span className="text-red-400 min-w-[32px] text-right">-{commit.changes.deletions}</span>
                                                  <div className="flex-1 h-1 bg-black/30 rounded-full overflow-hidden relative">
                                                    <motion.div 
                                                      initial={{ width: 0 }}
                                                      animate={{ width: '100%' }}
                                                      transition={{ duration: 0.5, ease: "easeOut" }}
                                                      className="h-full absolute inset-y-0 left-0"
                                                      style={{
                                                        background: `linear-gradient(to right, 
                                                          #166534 ${(commit.changes.additions / (commit.changes.additions + commit.changes.deletions)) * 100}%, 
                                                          #991b1b ${(commit.changes.additions / (commit.changes.additions + commit.changes.deletions)) * 100}%)`,
                                                        boxShadow: '0 0 5px rgba(0, 0, 0, 0.3)'
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                    ))}
                                    {githubStats.recentActivity.length > 2 && (
                                      <Button
                                        variant="ghost"
                                        className="w-full hover:bg-black/30 text-white hover:text-white/80 transition-all duration-300"
                                        onClick={() => setShowAllActivities(!showAllActivities)}
                                      >
                                        <ChevronDown className={`h-4 w-4 mr-2 transition-transform ${showAllActivities ? 'rotate-180' : ''}`} />
                                        {showAllActivities ? 'Show Less' : `Show ${githubStats.recentActivity.length - 2} More`}
                                      </Button>
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </>
                          )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {loading
                        ? renderSkeletons()
                        : leetcodeStats && (
                            <>
                              <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-medium">
                                  <a
                                    href="https://leetcode.com/arhaan17/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-white/80 transition-colors"
                                    style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
                                  >
                                    <Code className="h-5 w-5" />
                                    arhaan17
                                  </a>
                                </h3>
                              </div>
                              <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                <CardHeader>
                                  <CardTitle className="text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>LeetCode Progress</CardTitle>
                                  <CardDescription className="text-white/60">
                                    Solved {leetcodeStats.totalSolved} out of {leetcodeStats.totalQuestions} problems
                                  </CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="mb-6">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-sm font-medium text-white">Overall Progress</span>
                                      <span className="text-sm text-white/60">
                                        {Math.round((leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100)}%
                                      </span>
                                    </div>
                                    <div className="relative h-2 w-full bg-black/30 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%` }}
                                        transition={{ 
                                          duration: 1.5,
                                          ease: "easeOut",
                                          delay: 0.2
                                        }}
                                        className="absolute inset-y-0 left-0 rounded-full"
                                        style={{
                                          background: 'linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.8))',
                                          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 5px rgba(255, 255, 255, 0.3)',
                                          transformOrigin: 'left'
                                        }}
                                      />
                                      <motion.div
                                        initial={{ x: "-100%" }}
                                        animate={{ x: "100%" }}
                                        transition={{
                                          duration: 2,
                                          repeat: Infinity,
                                          ease: "linear",
                                          repeatDelay: 0.5,
                                          delay: 1.7
                                        }}
                                        className="absolute inset-y-0 w-20"
                                        style={{
                                          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                                          willChange: 'transform',
                                          width: `${(leetcodeStats.totalSolved / leetcodeStats.totalQuestions) * 100}%`,
                                          overflow: 'hidden'
                                        }}
                                      />
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-green-400">Easy</span>
                                        <span className="text-sm text-green-400">
                                          {leetcodeStats.easySolved}/{leetcodeStats.easyTotal}
                                        </span>
                                      </div>
                                      <div className="relative h-2 w-full bg-black/30 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(leetcodeStats.easySolved / leetcodeStats.easyTotal) * 100}%` }}
                                          transition={{ 
                                            duration: 1.5,
                                            ease: "easeOut",
                                            delay: 0.2
                                          }}
                                          className="absolute inset-y-0 left-0 rounded-full"
                                          style={{
                                            background: 'linear-gradient(90deg, #22c55e40, #22c55e)',
                                            boxShadow: '0 0 10px rgba(34, 197, 94, 0.5), 0 0 5px rgba(34, 197, 94, 0.3)',
                                            transformOrigin: 'left'
                                          }}
                                        />
                                        <motion.div
                                          initial={{ x: "-100%" }}
                                          animate={{ x: "100%" }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 0.5,
                                            delay: 1.7
                                          }}
                                          className="absolute inset-y-0 w-20"
                                          style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.2), transparent)',
                                            willChange: 'transform',
                                            width: `${(leetcodeStats.easySolved / leetcodeStats.easyTotal) * 100}%`,
                                            overflow: 'hidden'
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-yellow-400">Medium</span>
                                        <span className="text-sm text-yellow-400">
                                          {leetcodeStats.mediumSolved}/{leetcodeStats.mediumTotal}
                                        </span>
                                      </div>
                                      <div className="relative h-2 w-full bg-black/30 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(leetcodeStats.mediumSolved / leetcodeStats.mediumTotal) * 100}%` }}
                                          transition={{ 
                                            duration: 1.5,
                                            ease: "easeOut",
                                            delay: 0.2
                                          }}
                                          className="absolute inset-y-0 left-0 rounded-full"
                                          style={{
                                            background: 'linear-gradient(90deg, #eab30840, #eab308)',
                                            boxShadow: '0 0 10px rgba(234, 179, 8, 0.5), 0 0 5px rgba(234, 179, 8, 0.3)',
                                            transformOrigin: 'left'
                                          }}
                                        />
                                        <motion.div
                                          initial={{ x: "-100%" }}
                                          animate={{ x: "100%" }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 0.5,
                                            delay: 1.7
                                          }}
                                          className="absolute inset-y-0 w-20"
                                          style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(234, 179, 8, 0.2), transparent)',
                                            willChange: 'transform',
                                            width: `${(leetcodeStats.mediumSolved / leetcodeStats.mediumTotal) * 100}%`,
                                            overflow: 'hidden'
                                          }}
                                        />
                                      </div>
                                    </div>
                                    <div>
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-red-400">Hard</span>
                                        <span className="text-sm text-red-400">
                                          {leetcodeStats.hardSolved}/{leetcodeStats.hardTotal}
                                        </span>
                                      </div>
                                      <div className="relative h-2 w-full bg-black/30 rounded-full overflow-hidden">
                                        <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${(leetcodeStats.hardSolved / leetcodeStats.hardTotal) * 100}%` }}
                                          transition={{ 
                                            duration: 1.5,
                                            ease: "easeOut",
                                            delay: 0.2
                                          }}
                                          className="absolute inset-y-0 left-0 rounded-full"
                                          style={{
                                            background: 'linear-gradient(90deg, #ef444440, #ef4444)',
                                            boxShadow: '0 0 10px rgba(239, 68, 68, 0.5), 0 0 5px rgba(239, 68, 68, 0.3)',
                                            transformOrigin: 'left'
                                          }}
                                        />
                                        <motion.div
                                          initial={{ x: "-100%" }}
                                          animate={{ x: "100%" }}
                                          transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "linear",
                                            repeatDelay: 0.5,
                                            delay: 1.7
                                          }}
                                          className="absolute inset-y-0 w-20"
                                          style={{
                                            background: 'linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.2), transparent)',
                                            willChange: 'transform',
                                            width: `${(leetcodeStats.hardSolved / leetcodeStats.hardTotal) * 100}%`,
                                            overflow: 'hidden'
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Total Solved</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.totalSolved}</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Total Submissions</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.totalSubmissions}</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Completion Rate</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.completionRate.toFixed(1)}%</p>
                                  </CardContent>
                                </Card>
                                <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                  <CardContent className="p-6 flex flex-col items-center justify-center">
                                    <p className="text-sm text-white/60 mb-1">Acceptance Rate</p>
                                    <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.acceptanceRate.toFixed(1)}%</p>
                                  </CardContent>
                                </Card>
                              </div>

                              <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                <CardHeader>
                                  <CardTitle className="text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Streak</CardTitle>
                                  <CardDescription className="text-white/60">Consistency</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Current Streak</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.streak} days</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Max Streak</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.maxStreak} days</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Total Days</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>{leetcodeStats.totalDays} days</p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Last Solved</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                        {new Date(leetcodeStats.lastSolved).toLocaleDateString('en-US', {
                                          month: 'short',
                                          day: 'numeric'
                                        })}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card className="bg-black/20 backdrop-blur-sm border-white/5 hover:border-white/10 transition-all duration-300">
                                <CardHeader>
                                  <CardTitle className="text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>Ranking</CardTitle>
                                  <CardDescription className="text-white/60">Competitive Performance</CardDescription>
                                </CardHeader>
                                <CardContent>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Global Rank</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                        {leetcodeStats.contestRank.toLocaleString()}
                                      </p>
                                    </div>
                                    <div className="text-center p-4 rounded-lg bg-black/30">
                                      <p className="text-sm text-white/60 mb-1">Contest Rank</p>
                                      <p className="text-3xl font-bold text-white" style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}>
                                        {leetcodeStats.globalRank.toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </>
                          )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>
      <SectionDivider />
    </>
  )
} 