"use client"

import { useState, useEffect, useRef } from 'react'
import LoadingAnimation from './loading-animation'
import Navbar from './navbar'
import { ScrollAnimation } from './scroll-animation'
import dynamic from 'next/dynamic'

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showNavbar, setShowNavbar] = useState(false)
  const experienceRef = useRef<HTMLDivElement>(null)
  const projectsRef = useRef<HTMLDivElement>(null)
  const skillsRef = useRef<HTMLDivElement>(null)
  const certificationsRef = useRef<HTMLDivElement>(null)
  const resumeRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [AnalyticsComponent, setAnalyticsComponent] = useState<React.ReactNode>(null)
  const [SpeedInsightsComponent, setSpeedInsightsComponent] = useState<React.ReactNode>(null)
  
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

    // Remove artificial minimum loading time
    const finishLoading = () => {
      setIsLoading(false)
      setShowNavbar(true)
      if (typeof window !== 'undefined' && 'performance' in window) {
        performance.mark('app-loading-end')
        performance.measure('app-loading', 'app-loading-start', 'app-loading-end')
      }
    }

    // Start loading sequence
    Promise.all([
      document.fonts.ready,
    ]).then(finishLoading)

    // Dynamically import analytics after main content is interactive
    setTimeout(() => {
      const Analytics = dynamic(() => import("@vercel/analytics/react").then(mod => mod.Analytics), { ssr: false })
      const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then(mod => mod.SpeedInsights), { ssr: false })
      setAnalyticsComponent(<Analytics />)
      setSpeedInsightsComponent(<SpeedInsights />)
    }, 0)
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
        {/* Defer analytics and speed insights until after main content is interactive */}
        {AnalyticsComponent}
        {SpeedInsightsComponent}
      </div>
    </>
  )
} 