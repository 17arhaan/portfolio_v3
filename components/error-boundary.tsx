"use client"

import { Component, ErrorInfo, ReactNode } from "react"
import { motion } from "framer-motion"
import { AlertCircle } from "lucide-react"

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <div className="max-w-md w-full mx-auto p-6 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="flex justify-center mb-4"
            >
              <AlertCircle className="h-12 w-12 text-red-500" />
            </motion.div>
            <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
            <p className="text-white/70 mb-4">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              Try Again
            </motion.button>
          </div>
        </motion.div>
      )
    }

    return this.props.children
  }
} 