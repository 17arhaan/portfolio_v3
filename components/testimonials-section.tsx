"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Star, Quote, Plus, Upload, X, Trash2, Check, Loader2, LayoutGrid, Github, Globe, Linkedin } from "lucide-react"
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
  website?: string
  socialMedia?: {
    leetcode?: string
    github?: string
    instagram?: string
    linkedin?: string
  }
  date?: string
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

export default function TestimonialsSection() {
  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    company: "",
    content: "",
    rating: 0,
    image: null as File | null,
    website: "",
    socialMedia: {
      leetcode: "",
      github: "",
      instagram: "",
      linkedin: ""
    },
    date: new Date().toISOString().split('T')[0]
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [hoveredRating, setHoveredRating] = useState(0);
  
  // Initialize with empty arrays to prevent hydration mismatch
  const [allTestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [displayedTestimonials, setDisplayedTestimonials] = useState<Testimonial[]>([]);

  // Modify the useEffect to only use testimonials from the JSON file
  useEffect(() => {
    setIsClient(true);
    setAllTestimonials(testimonialsData.testimonials);
    setDisplayedTestimonials(testimonialsData.testimonials.slice(0, 3));
  }, []);

  // Function to handle manual shuffle
  const handleShuffle = () => {
    if (allTestimonials.length <= 3) return;
    
    setIsShuffling(true);
    const shuffled = shuffleArray(allTestimonials);
    setDisplayedTestimonials(shuffled.slice(0, 3));
    
    // Reset shuffle state after animation
    setTimeout(() => setIsShuffling(false), 500);
  };

  // Update the shuffle interval to be smoother
  useEffect(() => {
    if (allTestimonials.length > 3) {
      const interval = setInterval(() => {
        if (!isShuffling) {
          const shuffled = shuffleArray(allTestimonials);
          setDisplayedTestimonials(shuffled.slice(0, 3));
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [allTestimonials, isShuffling]);

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

      // Create a new testimonial object with the base64 image
      const testimonialData = {
        ...newTestimonial,
        image: imageBase64,
        id: Date.now().toString()
      };

      // Send testimonial to email
      const response = await fetch('/api/send-testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonialData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit testimonial');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
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
          image: null,
          website: "",
          socialMedia: {
            leetcode: "",
            github: "",
            instagram: "",
            linkedin: ""
          },
          date: new Date().toISOString().split('T')[0]
        });
        setPreview(null);
        setIsSubmitting(false);
        setSubmitSuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      setIsSubmitting(false);
      setSubmitSuccess(false);
      alert(error instanceof Error ? error.message : 'Failed to submit testimonial. Please try again later.');
    }
  }

  return (
    <section id="testimonials" className="py-12 sm:py-20 relative w-full overflow-hidden">
      <div className="max-w-[95vw] sm:max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex flex-col items-center">
            <h2 className="section-title">Testimonials</h2>
            <p className="mt-2 text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
              What others say about my work and collaboration
            </p>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="section-title-line"
            />
            <div className="mt-4">
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
                <DialogContent className="bg-black/80 border-white/10 text-white backdrop-blur-xl max-w-[95vw] sm:max-w-2xl">
                  <DialogTitle className="text-xl sm:text-2xl font-bold mb-2 flex items-center gap-2">
                    <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                    Share Your Experience
                  </DialogTitle>
                  <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-200/80 text-xs sm:text-sm">
                      <strong>Note:</strong> Your testimonial will be reviewed and shown only after approval.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-medium text-white/80">Name</label>
                        <Input
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-medium text-white/80">Role</label>
                        <Input
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                          placeholder="Your role/position"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-medium text-white/80">Company</label>
                      <Input
                        value={newTestimonial.company}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                        placeholder="Your company/organization"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-medium text-white/80">Testimonial</label>
                      <Textarea
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50 min-h-[100px]"
                        placeholder="Share your experience..."
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-medium text-white/80">Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                            className="p-1"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                star <= (hoveredRating || newTestimonial.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-white/30"
                              }`}
                              onMouseEnter={() => setHoveredRating(star)}
                              onMouseLeave={() => setHoveredRating(0)}
                            />
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-medium text-white/80">Profile Picture</label>
                      <div className="flex items-center gap-3">
                        <label className="flex-1">
                          <div className="flex items-center justify-center w-full h-8 sm:h-9 border border-white/10 rounded-md bg-white/5 hover:bg-white/10 cursor-pointer">
                            <Upload className="w-4 h-4 text-white/60 mr-2" />
                            <span className="text-xs sm:text-sm text-white/60">Upload Image</span>
                          </div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                          />
                        </label>
                        {preview && (
                          <div className="relative">
                            <img
                              src={preview}
                              alt="Preview"
                              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
                            />
                            <button
                              onClick={() => {
                                setPreview(null);
                                setNewTestimonial({ ...newTestimonial, image: null });
                              }}
                              className="absolute -top-1 -right-1 p-1 bg-red-500/80 rounded-full"
                              title="Remove image"
                            >
                              <X className="w-2 h-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs sm:text-sm font-medium text-white/80">Website (Optional)</label>
                      <Input
                        value={newTestimonial.website}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, website: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                        placeholder="Your website URL"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-medium text-white/80">GitHub (Optional)</label>
                        <Input
                          value={newTestimonial.socialMedia.github}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, github: e.target.value },
                            })
                          }
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                          placeholder="GitHub username"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs sm:text-sm font-medium text-white/80">LinkedIn (Optional)</label>
                        <Input
                          value={newTestimonial.socialMedia.linkedin}
                          onChange={(e) =>
                            setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, linkedin: e.target.value },
                            })
                          }
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-8 sm:h-9"
                          placeholder="LinkedIn profile URL"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsDialogOpen(false)}
                        className="text-white/60 hover:text-white hover:bg-white/5"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400 border border-yellow-500/20"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Submitting...
                          </>
                        ) : submitSuccess ? (
                          <>
                            <Check className="w-4 h-4 mr-2" />
                            Submitted!
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <AnimatePresence mode="wait">
            {displayedTestimonials.map((testimonial) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-5 sm:p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm sm:text-base font-medium text-white">{testimonial.name}</h3>
                        <p className="text-xs sm:text-sm text-white/60">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                              i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-4 text-sm sm:text-base text-white/80 line-clamp-6">{testimonial.content}</p>
                    <div className="mt-4 flex items-center gap-3">
                      {testimonial.website && (
                        <a
                          href={testimonial.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          Website
                        </a>
                      )}
                      {testimonial.socialMedia?.github && (
                        <a
                          href={`https://github.com/${testimonial.socialMedia.github}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Github className="w-3.5 h-3.5" />
                          GitHub
                        </a>
                      )}
                      {testimonial.socialMedia?.linkedin && (
                        <a
                          href={testimonial.socialMedia.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {allTestimonials.length > 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShuffle}
              disabled={isShuffling}
              className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/60 hover:text-white transition-colors flex items-center gap-3"
            >
              <motion.div
                animate={isShuffling ? { rotate: 360 } : {}}
                transition={{ duration: 1, repeat: isShuffling ? Infinity : 0 }}
              >
                <LayoutGrid className="w-4 h-4" />
              </motion.div>
              <span className="text-sm font-medium">
                {isShuffling ? "Shuffling..." : "View More Testimonials"}
              </span>
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  )
}