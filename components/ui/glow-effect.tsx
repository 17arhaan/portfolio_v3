import { ReactNode } from "react"

interface GlowEffectProps {
  children: ReactNode
  glowColor?: string
  intensity?: number
}

export function GlowEffect({ children, glowColor = "rgba(99, 102, 241, 0.5)", intensity = 0.7 }: GlowEffectProps) {
  return (
    <div className="relative group">
      <div
        className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"
        style={{
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          opacity: intensity,
        }}
      />
      <div className="relative">{children}</div>
    </div>
  )
} 