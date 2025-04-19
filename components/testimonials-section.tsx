"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { getTestimonials } from "@/data/testimonials"

export type Testimonial = {
  id: string
  name: string
  email: string
  website?: string
  message: string
  image?: string
  rating: number
  role?: string
  company?: string
  showInTestimonials: boolean
  createdAt: string
  updatedAt: string
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])

  // Load and filter testimonials
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (!response.ok) throw new Error('Failed to fetch testimonials')
        const allTestimonials = await response.json()
        console.log('Fetched testimonials:', allTestimonials)
        const highRatedTestimonials = allTestimonials
          .filter(t => t.rating >= 4 && t.showInTestimonials)
          .map(t => ({
            ...t,
            content: t.message,
            date: t.createdAt
          }))
        console.log('Filtered testimonials:', highRatedTestimonials)
        setFilteredTestimonials(highRatedTestimonials)
      } catch (error) {
        console.error('Error loading testimonials:', error)
      }
    }

    // Initial load
    loadTestimonials()

    // Set up interval to check for new testimonials
    const interval = setInterval(loadTestimonials, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Auto-shuffle testimonials every 30 seconds
  useEffect(() => {
    if (filteredTestimonials.length <= 3) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 3) % filteredTestimonials.length
        return nextIndex
      })
    }, 30000)

    return () => clearInterval(interval)
  }, [filteredTestimonials.length])

  if (filteredTestimonials.length === 0) {
    return (
      <section id="testimonials" className="py-24 relative w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-white">Testimonials</h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
              style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
            >
              What people say about working with me
            </motion.p>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
              style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
            />
          </motion.div>

          <div className="text-center text-white/60">
            <p>No testimonials available yet.</p>
          </div>
        </div>
      </section>
    )
  }

  // Get the current 3 testimonials to display
  const getCurrentTestimonials = () => {
    const testimonials = []
    const numToShow = Math.min(3, filteredTestimonials.length)
    for (let i = 0; i < numToShow; i++) {
      const index = (currentIndex + i) % filteredTestimonials.length
      testimonials.push(filteredTestimonials[index])
    }
    return testimonials
  }

  const currentTestimonials = getCurrentTestimonials()

  return (
    <section id="testimonials" className="py-24 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Testimonials</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            What people say about working with me
          </motion.p>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-48 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-auto mt-6"
            style={{ boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)" }}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 relative overflow-hidden"
            >
              <Quote className="absolute top-4 right-4 w-6 h-6 text-white/10" />
              
              <div className="flex flex-col items-center gap-4">
                {/* Profile Image */}
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-white/20">
                  <Image
                    src={testimonial.image || "/user.png"}
                    alt={testimonial.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>

                {/* Content */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-white/20"
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-white/80 mb-4 italic text-sm">
                    "{testimonial.content}"
                  </p>

                  <div>
                    <h4 className="text-white font-medium">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/60 text-xs">
                      {testimonial.role} at {testimonial.company}
                    </p>
                    <p className="text-white/40 text-xs mt-1">
                      {new Date(testimonial.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === index
                  ? "bg-white"
                  : "bg-white/20"
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: Math.floor(currentIndex / 3) === index ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 