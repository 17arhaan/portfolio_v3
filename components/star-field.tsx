"use client"

import { useEffect, useRef } from "react"

interface Star3D {
  x: number
  y: number
  z: number
  radius: number
  originalX: number
  originalY: number
  originalZ: number
  vx: number
  vy: number
  vz: number
  connections: Array<{
    index: number
    progress: number
    maxOpacity: number
    hue: number
  }>
  alpha: number
  targetAlpha: number
  connectionTimer: number
  hue: number
  pulsePhase: number
  pulseSpeed: number
  repulsionFactor: number
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, active: false })
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Mouse event handlers
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("mouseleave", handleMouseLeave)

    // 3D space configuration - wider distribution
    const perspective = 800
    const depth = 1500
    // Expanded boundaries for wider distribution
    const spaceWidth = canvas.width * 2.5
    const spaceHeight = canvas.height * 2.5
    const spaceOffsetX = (spaceWidth - canvas.width) / 2
    const spaceOffsetY = (spaceHeight - canvas.height) / 2

    // Increased star count
    const starCount = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 10000))
    const stars: Star3D[] = []

    // Increased connection parameters
    const connectionDistance = 350 // Increased from 320
    const connectionProbability = 0.003 // Increased from 0.001 (3x more frequent)
    const maxConnections = 3 // Increased from 2
    const mouseRadius = 300
    const mouseDepthInfluence = 400

    // Initialize stars in 3D space with wider distribution
    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a wider area beyond canvas boundaries
      const x = Math.random() * spaceWidth - spaceOffsetX
      const y = Math.random() * spaceHeight - spaceOffsetY
      const z = Math.random() * depth

      // More varied star sizes
      const radius = Math.random() * 2 + 0.3

      stars.push({
        x,
        y,
        z,
        originalX: x,
        originalY: y,
        originalZ: z,
        radius,
        // Maintain natural movement speed
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        vz: (Math.random() - 0.5) * 0.05,
        connections: [],
        alpha: Math.random() * 0.5 + 0.1,
        targetAlpha: Math.random() * 0.5 + 0.5,
        connectionTimer: Math.random() * 1000, // Reduced from 2000 for faster initial connections
        hue: Math.random() * 40 + 200, // Bluish hue variation
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.01 + Math.random() * 0.02,
        repulsionFactor: 0, // Track how much a star is being repelled
      })
    }

    // Project 3D coordinates to 2D screen
    const project = (x: number, y: number, z: number) => {
      const factor = perspective / (perspective + z)
      const projectedX = x * factor + (canvas.width / 2) * (1 - factor)
      const projectedY = y * factor + (canvas.height / 2) * (1 - factor)
      return { x: projectedX, y: projectedY, factor }
    }

    // Animation loop
    const animate = (timestamp: number) => {
      timeRef.current = timestamp * 0.001 // Convert to seconds
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Calculate parallax effect from mouse movement
      const mouseSpeedX = mouseRef.current.active ? (mouseRef.current.x - mouseRef.current.prevX) * 0.05 : 0
      const mouseSpeedY = mouseRef.current.active ? (mouseRef.current.y - mouseRef.current.prevY) * 0.05 : 0

      // Sort stars by z-coordinate for proper depth rendering
      stars.sort((a, b) => b.z - a.z)

      // Update and draw stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Project star to 2D for mouse interaction calculations
        const { x: projectedX, y: projectedY, factor } = project(star.x, star.y, star.z)

        // STRONG REPULSION: Check if mouse is near the star
        let repulsionApplied = false
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - projectedX
          const dy = mouseRef.current.y - projectedY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < mouseRadius * factor) {
            // Calculate repulsion strength - stronger when closer
            const repulsionStrength = 1 - distance / (mouseRadius * factor)
            const force = repulsionStrength * 2.0 // Much stronger repulsion

            // Calculate unit vector away from mouse
            const length = Math.max(0.0001, Math.sqrt(dx * dx + dy * dy))
            const unitX = dx / length
            const unitY = dy / length

            // Apply strong repulsion force - AWAY from mouse
            // Direct position change for immediate effect
            star.x -= unitX * force * -15 // Negative to move AWAY
            star.y -= unitY * force * -15

            // Also affect velocity for continued movement
            star.vx -= unitX * force * -0.5
            star.vy -= unitY * force * -0.5

            // Mark that repulsion was applied
            repulsionApplied = true
            star.repulsionFactor = Math.min(1, star.repulsionFactor + 0.2)

            // Limit velocity to prevent extreme speeds
            const maxSpeed = 2.0 // Allow faster movement during repulsion
            const currentSpeed = Math.sqrt(star.vx * star.vx + star.vy * star.vy)
            if (currentSpeed > maxSpeed) {
              star.vx = (star.vx / currentSpeed) * maxSpeed
              star.vy = (star.vy / currentSpeed) * maxSpeed
            }
          }
        }

        // Only apply natural movement if no repulsion was applied
        if (!repulsionApplied) {
          // Apply continuous natural movement with slight variations over time
          const timeVariation = Math.sin(timeRef.current * 0.2 + i * 0.1) * 0.01
          star.x += star.vx * (1 + timeVariation)
          star.y += star.vy * (1 + timeVariation)
          star.z += star.vz * (1 + timeVariation)

          // Parallax effect - stars at different depths move at different speeds
          const parallaxFactor = 1 - star.z / depth
          star.x -= mouseSpeedX * parallaxFactor * 2
          star.y -= mouseSpeedY * parallaxFactor * 2

          // Gradually reduce repulsion factor
          star.repulsionFactor *= 0.9
        }

        // Wrap around boundaries instead of bouncing for a more infinite feel
        // Use expanded space boundaries
        if (star.x < -spaceOffsetX) star.x = spaceWidth - spaceOffsetX
        if (star.x > spaceWidth - spaceOffsetX) star.x = -spaceOffsetX
        if (star.y < -spaceOffsetY) star.y = spaceHeight - spaceOffsetY
        if (star.y > spaceHeight - spaceOffsetY) star.y = -spaceOffsetY
        if (star.z < 0) star.z = depth
        if (star.z > depth) star.z = 0

        // Pulsing effect
        star.pulsePhase += star.pulseSpeed
        const pulseFactor = 0.2 * Math.sin(star.pulsePhase) + 1

        // Fade effect
        star.alpha += (star.targetAlpha - star.alpha) * 0.003
        if (Math.abs(star.alpha - star.targetAlpha) < 0.01) {
          star.targetAlpha = Math.random() * 0.5 + 0.5
        }

        // Only draw stars that are visible on screen (with a small margin)
        const margin = 50
        if (
          projectedX >= -margin &&
          projectedX <= canvas.width + margin &&
          projectedY >= -margin &&
          projectedY <= canvas.height + margin
        ) {
          // Calculate size and opacity based on depth
          const sizeByDepth = star.radius * factor * 1.5 * pulseFactor
          // Increase size significantly when being repelled
          const repulsionSize = 1 + star.repulsionFactor * 0.8

          // Create a subtle color variation
          const hue = star.hue
          // Shift hue significantly when repelled (more towards cyan)
          const repulsionHue = star.repulsionFactor > 0.1 ? hue - star.repulsionFactor * 40 : hue
          const saturation = 30 + 20 * pulseFactor + star.repulsionFactor * 50
          const lightness = 80 + 10 * pulseFactor + star.repulsionFactor * 15

          // Draw star with repulsion effect
          ctx.beginPath()
          ctx.arc(projectedX, projectedY, sizeByDepth * repulsionSize, 0, Math.PI * 2)
          ctx.fillStyle = `hsla(${repulsionHue}, ${saturation}%, ${lightness}%, ${star.alpha * factor})`

          // Increase glow when repelled
          const glowIntensity = 15 * factor * pulseFactor * (1 + star.repulsionFactor * 3)
          ctx.shadowBlur = glowIntensity
          ctx.shadowColor = `hsla(${repulsionHue}, 70%, 70%, ${0.5 + star.repulsionFactor * 0.5})`
          ctx.fill()
          ctx.shadowBlur = 0
        }
      }

      // Manage connections (more frequently now)
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]

        // Increment connection timer
        star.connectionTimer++

        // Attempt connections more frequently
        if (
          star.connectionTimer > 800 && // Reduced from 1000
          star.connections.length < maxConnections &&
          Math.random() < connectionProbability
        ) {
          star.connectionTimer = 0 // Reset timer

          // Find potential connections
          for (let j = 0; j < stars.length; j++) {
            if (
              i !== j &&
              !star.connections.some((c) => c.index === j) &&
              stars[j].connections.length < maxConnections
            ) {
              // Calculate 3D distance
              const dx = star.x - stars[j].x
              const dy = star.y - stars[j].y
              const dz = star.z - stars[j].z
              const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

              // Increased chance of connection
              if (distance3D < connectionDistance && Math.random() < 0.25) {
                // Increased from 0.15
                // Create connection with animation progress
                const connectionHue = (star.hue + stars[j].hue) / 2
                star.connections.push({
                  index: j,
                  progress: 0, // Start at 0 and animate to 1
                  maxOpacity: 0.4 + Math.random() * 0.6, // Increased opacity (0.4-1.0)
                  hue: connectionHue,
                })

                stars[j].connections.push({
                  index: i,
                  progress: 0,
                  maxOpacity: 0.4 + Math.random() * 0.6, // Increased opacity
                  hue: connectionHue,
                })
                break
              }
            }
          }
        }

        // Update and draw connections
        for (let c = 0; c < star.connections.length; c++) {
          const connection = star.connections[c]
          const connectedStar = stars[connection.index]

          // Animate connection progress (slightly faster formation)
          if (connection.progress < 1) {
            connection.progress += 0.007 // Increased from 0.005
          }

          // Calculate 3D distance
          const dx = star.x - connectedStar.x
          const dy = star.y - connectedStar.y
          const dz = star.z - connectedStar.z
          const distance3D = Math.sqrt(dx * dx + dy * dy + dz * dz)

          // Only draw if still in range (slightly more forgiving)
          if (distance3D < connectionDistance * 1.6) {
            // Increased from 1.5
            // Project both stars to 2D
            const { x: px1, y: py1, factor: f1 } = project(star.x, star.y, star.z)
            const { x: px2, y: py2, factor: f2 } = project(connectedStar.x, connectedStar.y, connectedStar.z)

            // Only draw connections if both stars are visible (with margin)
            const margin = 100
            if (
              px1 >= -margin &&
              px1 <= canvas.width + margin &&
              py1 >= -margin &&
              py1 <= canvas.height + margin &&
              px2 >= -margin &&
              px2 <= canvas.width + margin &&
              py2 >= -margin &&
              py2 <= canvas.height + margin
            ) {
              // Calculate opacity based on distance, depth, and connection progress
              const avgFactor = (f1 + f2) / 2
              const distanceFactor = 1 - distance3D / (connectionDistance * 1.6)

              // Pulsing effect for connection
              const pulseEffect = 0.2 * Math.sin(timeRef.current * 2 + connection.index) + 1

              // Adjust connection based on repulsion
              const repulsionEffect = Math.max(star.repulsionFactor, connectedStar.repulsionFactor)

              // Calculate opacity with all factors
              const baseOpacity = connection.maxOpacity * connection.progress * distanceFactor * avgFactor * pulseEffect
              const opacity = Math.min(0.8, baseOpacity)

              // CHANGED: Make connections glow white instead of colored
              // Main connection line with white glow
              ctx.beginPath()
              ctx.moveTo(px1, py1)
              ctx.lineTo(px2, py2)
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
              ctx.lineWidth = 0.8 * avgFactor * connection.progress // Increased from 0.5
              ctx.stroke()

              // Enhanced white glow effect for lines
              const glowWidth = 3 * avgFactor * connection.progress * pulseEffect * (1 + repulsionEffect * 0.5)
              ctx.beginPath()
              ctx.moveTo(px1, py1)
              ctx.lineTo(px2, py2)
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
              ctx.lineWidth = glowWidth
              ctx.shadowBlur = 10 * avgFactor * connection.progress * pulseEffect
              ctx.shadowColor = `rgba(255, 255, 255, ${opacity * 0.8})`
              ctx.stroke()
              ctx.shadowBlur = 0

              // Randomly break connections occasionally
              if (Math.random() < 0.0005 && connection.progress > 0.5) {
                // 0.05% chance per frame for established connections
                star.connections = star.connections.filter((_, index) => index !== c)
                connectedStar.connections = connectedStar.connections.filter((conn) => conn.index !== i)
                continue // Skip to next connection
              }
            }
          } else {
            // Remove connection if too far
            star.connections = star.connections.filter((_, index) => index !== c)
            connectedStar.connections = connectedStar.connections.filter((conn) => conn.index !== i)
          }
        }
      }

      // Draw mouse connections if active
      if (mouseRef.current.active) {
        // Draw mouse glow
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, 4, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)"
        ctx.shadowBlur = 15
        ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
        ctx.fill()
        ctx.shadowBlur = 0

        // Draw repulsion field indicator
        ctx.beginPath()
        ctx.arc(mouseRef.current.x, mouseRef.current.y, mouseRadius * 0.5, 0, Math.PI * 2)
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)"
        ctx.lineWidth = 2
        ctx.stroke()

        // Connect mouse to nearby stars with 3D effect - with white glow
        for (let i = 0; i < stars.length; i++) {
          const star = stars[i]
          const { x: px, y: py, factor } = project(star.x, star.y, star.z)

          // Only connect to visible stars
          if (px >= -50 && px <= canvas.width + 50 && py >= -50 && py <= canvas.height + 50) {
            const dx = mouseRef.current.x - px
            const dy = mouseRef.current.y - py
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < mouseRadius * factor) {
              const opacity = (1 - distance / (mouseRadius * factor)) * 0.3 * factor
              const pulseEffect = 0.2 * Math.sin(timeRef.current * 3 + i) + 1

              // Create white gradient for mouse connections
              const gradient = ctx.createLinearGradient(mouseRef.current.x, mouseRef.current.y, px, py)
              gradient.addColorStop(0, `rgba(255, 255, 255, ${opacity})`)
              gradient.addColorStop(1, `rgba(255, 255, 255, ${opacity * 0.7})`)

              ctx.beginPath()
              ctx.moveTo(mouseRef.current.x, mouseRef.current.y)
              ctx.lineTo(px, py)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.5 * factor
              ctx.stroke()

              // White glow effect
              ctx.beginPath()
              ctx.moveTo(mouseRef.current.x, mouseRef.current.y)
              ctx.lineTo(px, py)
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3 * pulseEffect})`
              ctx.lineWidth = 1.5 * factor * pulseEffect
              ctx.shadowBlur = 5
              ctx.shadowColor = "rgba(255, 255, 255, 0.5)"
              ctx.stroke()
              ctx.shadowBlur = 0
            }
          }
        }
      }

      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      canvas.removeEventListener("mousemove", handleMouseMove)
      canvas.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ background: "transparent" }}
    />
  )
}
