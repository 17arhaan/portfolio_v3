import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full mx-auto p-6 text-center"
      >
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white/80 mb-6">Page Not Found</h2>
        <p className="text-white/60 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </motion.div>
    </div>
  )
} 