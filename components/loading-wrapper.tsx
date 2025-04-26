"use client"

import { useState, useEffect } from 'react'
import LoadingAnimation from './loading-animation'
import Navbar from './navbar'
import { ScrollAnimation } from './scroll-animation'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showNavbar, setShowNavbar] = useState(false)
  
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
    const minLoadTime = 3000 // 3 seconds minimum (increased from 1 second)
    const loadStartTime = Date.now()

    const finishLoading = () => {
      const elapsed = Date.now() - loadStartTime
      const remainingTime = Math.max(0, minLoadTime - elapsed)

      setTimeout(() => {
        setIsLoading(false)
        // Add a small delay before showing navbar to ensure smooth transition
        setTimeout(() => {
          setShowNavbar(true)
        }, 200)
        
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
        {showNavbar && <Navbar isLoading={false} />}
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