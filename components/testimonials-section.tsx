"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, Plus, Upload, X, Trash2, Check, Loader2 } from "lucide-react"
import { useState, useCallback, useEffect } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import testimonialsData from "@/data/testimonials.json"

interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  rating: number
  image: string
}

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

// Function to safely get testimonials from localStorage
const getSavedTestimonials = () => {
  if (typeof window === 'undefined') return [];
  try {
    const saved = localStorage.getItem('user-testimonials');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error reading testimonials:', error);
    return [];
  }
};

// Function to save testimonial to localStorage
const saveTestimonial = (testimonial: Testimonial) => {
  if (typeof window === 'undefined') return;
  
  const existingTestimonials = localStorage.getItem('user-testimonials');
  const testimonials = existingTestimonials ? JSON.parse(existingTestimonials) : [];
  testimonials.push(testimonial);
  localStorage.setItem('user-testimonials', JSON.stringify(testimonials));
};

export default function TestimonialsSection() {
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 0,
    image: null as File | null
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  // Initialize with empty arrays to prevent hydration mismatch
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);

  // Load testimonials after component mounts
  useEffect(() => {
    setIsClient(true);
    const savedTestimonials = getSavedTestimonials();
    const allTestis = [...testimonialsData.testimonials, ...savedTestimonials];
    setAllTestimonials(allTestis);
    setDisplayedTestimonials(allTestis.slice(0, 3));
  }, []);

  // Shuffle testimonials every 10 seconds
  useEffect(() => {
    if (allTestimonials.length > 3) {
      const interval = setInterval(() => {
        const shuffled = shuffleArray(allTestimonials)
        setDisplayedTestimonials(shuffled.slice(0, 3))
      }, 10000)

      return () => clearInterval(interval)
    }
  }, [allTestimonials])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewTestimonial({ ...newTestimonial, image: file })
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitSuccess(false);
    
    try {
      // Convert image to base64 if exists
      let imageBase64 = null;
      if (newTestimonial.image) {
        const reader = new FileReader();
        imageBase64 = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(newTestimonial.image!);
        });
      }

      // Send testimonial to email
      const response = await fetch('/api/send-testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newTestimonial,
          image: imageBase64
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit testimonial');
      }

      setSubmitSuccess(true);
      
      // Reset form and close dialog after a delay
      setTimeout(() => {
        setIsDialogOpen(false);
        setNewTestimonial({
          name: "",
          role: "",
          company: "",
          content: "",
          rating: 0,
          image: null
        });
        setPreview(null);
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setIsSubmitting(false);
      setSubmitSuccess(false);
    }
  }

  const handleDeleteTestimonial = (id: string) => {
    // Remove from storage
    // Note: In a real application, you would need to implement an API endpoint
    // to handle the deletion of a testimonial
    alert("To delete a testimonial, please contact the website administrator to update the testimonials.json file.")
  }

  return (
    <section id="testimonials" className="py-20 relative w-full">
      <div className="max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-3xl font-bold text-white">Testimonials</h2>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300"
                >
                  <Plus className="w-4 h-4 text-white/60" />
                </motion.button>
              </DialogTrigger>
              <DialogContent className="bg-black/80 border-white/10 text-white backdrop-blur-xl max-w-2xl">
                <DialogTitle className="text-2xl font-bold mb-4 flex items-center gap-2">
                  <Quote className="w-6 h-6 text-yellow-400" />
                  Share Your Experience
                </DialogTitle>
                <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <p className="text-yellow-200/80 text-sm">
                    <strong>Note:</strong> Your testimonial will be reviewed and shown only after approval.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Name</label>
                      <Input
                        value={newTestimonial.name}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/80">Role</label>
                      <Input
                        value={newTestimonial.role}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50"
                        placeholder="Your role/position"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Company</label>
                    <Input
                      value={newTestimonial.company}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                      className="bg-white/5 border-white/10 focus:border-yellow-500/50"
                      placeholder="Company name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Testimonial</label>
                    <Textarea
                      value={newTestimonial.content}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                      className="bg-white/5 border-white/10 focus:border-yellow-500/50 min-h-[120px]"
                      placeholder="Share your experience..."
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Rating</label>
                    <div 
                      className="flex gap-2"
                      onMouseLeave={() => setHoveredRating(0)}
                    >
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <motion.button
                          key={rating}
                          type="button"
                          onClick={() => setNewTestimonial({ ...newTestimonial, rating })}
                          onMouseEnter={() => setHoveredRating(rating)}
                          className="p-2 rounded-full transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          title={`${rating} star${rating > 1 ? 's' : ''}`}
                        >
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={newTestimonial.rating >= rating || hoveredRating >= rating ? "filled" : "empty"}
                              initial={{ scale: 0.5, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.5, opacity: 0 }}
                              transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  newTestimonial.rating >= rating || hoveredRating >= rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-white/40"
                                }`}
                              />
                            </motion.div>
                          </AnimatePresence>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/80">Profile Image</label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors border-white/20 hover:border-white/40">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        {preview ? (
                          <div className="relative">
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-32 h-32 rounded-full object-cover mx-auto"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setPreview(null)
                                setNewTestimonial({ ...newTestimonial, image: null })
                              }}
                              className="absolute -top-2 -right-2 p-1 rounded-full bg-black/80 border border-white/20 hover:bg-black"
                              title="Remove image"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <Upload className="w-8 h-8 mx-auto text-white/60" />
                            <p className="text-white/60">Click to select an image</p>
                            <p className="text-xs text-white/40">PNG, JPG, WEBP up to 5MB</p>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className={`w-full transition-all duration-300 ${
                      submitSuccess 
                        ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400'
                        : 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/20 text-yellow-400'
                    }`}
                    disabled={isSubmitting}
                  >
                    {submitSuccess ? (
                      <div className="flex items-center gap-2">
                        <Check className="w-4 h-4" />
                        Submitted Successfully
                      </div>
                    ) : isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </div>
                    ) : (
                      'Submit Testimonial'
                    )}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            What people say about working with me.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {isClient && displayedTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative overflow-hidden group"
              >
                {/* Animated background elements */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>

                {/* Quote icon */}
                <div className="absolute top-4 right-4 text-white/20">
                  <Quote className="w-8 h-8" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/80 mb-6 italic">{testimonial.content}</p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-white/60 text-sm">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
} 