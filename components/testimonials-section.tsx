"use client"

import { motion } from "framer-motion"
import { Star, Quote } from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

type Testimonial = {
  id: string
  name: string
  role: string
  company: string
  image?: string
  rating: number
  content: string
  date: string
}

// Initialize with empty array - testimonials will be loaded from your backend
const testimonials: Testimonial[] = []

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([])

  // Filter testimonials to only show 4-5 star ratings
  useEffect(() => {
    const highRatedTestimonials = testimonials.filter(t => t.rating >= 4)
    setFilteredTestimonials(highRatedTestimonials)
  }, [])

  // Auto-shuffle testimonials every 30 seconds
  useEffect(() => {
    if (filteredTestimonials.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const nextIndex = (prev + 1) % filteredTestimonials.length
        return nextIndex
      })
    }, 30000) // 30 seconds

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

        <div className="relative">
          {/* Testimonial Carousel */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 relative overflow-hidden"
          >
            <Quote className="absolute top-4 right-4 w-8 h-8 text-white/10" />
            
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Profile Image */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20">
                <Image
                  src={filteredTestimonials[currentIndex].image || "/user.png"}
                  alt={filteredTestimonials[currentIndex].name}
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < filteredTestimonials[currentIndex].rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/20"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-white/80 mb-4 italic">
                  "{filteredTestimonials[currentIndex].content}"
                </p>

                <div>
                  <h4 className="text-white font-medium">
                    {filteredTestimonials[currentIndex].name}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {filteredTestimonials[currentIndex].role} at{" "}
                    {filteredTestimonials[currentIndex].company}
                  </p>
                  <p className="text-white/40 text-xs mt-1">
                    {new Date(filteredTestimonials[currentIndex].date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {filteredTestimonials.map((_, index) => (
              <motion.div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-white"
                    : "bg-white/20"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: index === currentIndex ? 1.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 