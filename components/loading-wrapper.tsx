"use client"

import { useState, useEffect, useRef } from 'react'
import LoadingAnimation from './loading-animation'
import Navbar from './navbar'
import { ScrollAnimation } from './scroll-animation'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showNavbar, setShowNavbar] = useState(false)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Preload critical images
    const preloadImages = ['/sign.png']
    preloadImages.forEach(src => {
      const img = new Image()
      img.src = src
    })

    // Add performance mark
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark('app-loading-start')
    }

    // Simulate minimum loading time for smooth transition
    const minLoadTime = 4000 // 4 seconds minimum (reduced from 5 seconds)
    const loadStartTime = Date.now()

    const finishLoading = () => {
      const elapsed = Date.now() - loadStartTime
      const remainingTime = Math.max(0, minLoadTime - elapsed)

      setTimeout(() => {
        // First, hide the loading screen
        setIsLoading(false)
        
        // Wait for loading screen to completely fade out (500ms)
        // Then wait an additional 500ms to ensure smooth transition
        setTimeout(() => {
          setShowNavbar(true)
        }, 1000) // Total delay of 1 second after loading screen starts fading
        
        if (typeof window !== 'undefined' && 'performance' in window) {
          performance.mark('app-loading-end')
          performance.measure('app-loading', 'app-loading-start', 'app-loading-end')
        }
      }, remainingTime)
    }

    // Start loading sequence
    Promise.all([
      // Add any other critical resources to load here
      document.fonts.ready,
    ]).then(finishLoading)
  }, [])

  return (
    <>
      <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />
      <div className="min-h-screen w-full bg-black overflow-x-hidden">
        {showNavbar && (
          <Navbar 
            experienceRef={experienceRef}
            projectsRef={projectsRef}
            skillsRef={skillsRef}
            certificationsRef={certificationsRef}
            resumeRef={resumeRef}
            progressRef={progressRef}
            isLoading={false}
          />
        )}
        {!isLoading && (
          <ScrollAnimation>
            {children}
          </ScrollAnimation>
        )}
        <Analytics />
        <SpeedInsights />
      </div>
    </>
  )
} 