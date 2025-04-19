"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, AlertCircle, XCircle, Info } from "lucide-react"

type ToastType = "success" | "error" | "warning" | "info"

interface ToastProps {
  message: string
  type: ToastType
  duration?: number
  onClose?: () => void
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colors = {
  success: "text-green-500",
  error: "text-red-500",
  warning: "text-yellow-500",
  info: "text-blue-500",
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const Icon = icons[type]

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          className="fixed bottom-4 right-4 z-50"
        >
          <div className="bg-black/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-white/10">
            <div className="flex items-center space-x-3">
              <Icon className={`h-5 w-5 ${colors[type]}`} />
              <p className="text-white text-sm">{message}</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Toast manager hook
export function useToast() {
  const [toasts, setToasts] = useState<ToastProps[]>([])

  const addToast = (toast: Omit<ToastProps, "onClose">) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { ...toast, onClose: () => removeToast(id) }])
  }

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((_, index) => index !== id))
  }

  return {
    toasts,
    addToast,
    removeToast,
  }
} 