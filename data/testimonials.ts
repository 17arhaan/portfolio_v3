import { Testimonial } from "@/components/testimonials-section"

const STORAGE_KEY = 'portfolio_testimonials'

// Initialize testimonials from localStorage or empty array
let testimonials: Testimonial[] = []

// Load testimonials from localStorage on module load
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem(STORAGE_KEY)
  testimonials = stored ? JSON.parse(stored) : []
}

export const getTestimonials = () => testimonials

export const addTestimonial = (testimonial: Testimonial) => {
  testimonials = [...testimonials, testimonial]
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials))
  }
}

export const removeTestimonial = (id: string) => {
  testimonials = testimonials.filter(t => t.id !== id)
  // Save to localStorage
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonials))
  }
}

export const clearTestimonials = () => {
  testimonials = []
  // Clear localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
} 