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
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
          WebkitPerspective: "1000",
          perspective: "1000",
          WebkitFilter: "blur(12px)",
          filter: "blur(12px)",
        }}
      />
      <div 
        className="relative"
        style={{
          WebkitBackfaceVisibility: "hidden",
          backfaceVisibility: "hidden",
          WebkitTransform: "translateZ(0)",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </div>
    </div>
  )
} 