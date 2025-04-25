"use client"

import { useState } from 'react'
import LoadingAnimation from './loading-animation'
import Navbar from './navbar'
import { ScrollAnimation } from './scroll-animation'
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <LoadingAnimation onLoadingComplete={() => setIsLoading(false)} />
      <div className="min-h-screen w-full bg-black overflow-x-hidden">
        {!isLoading && <Navbar />}
        <ScrollAnimation>
          {children}
        </ScrollAnimation>
        <Analytics />
        <SpeedInsights />
      </div>
    </>
  )
} 