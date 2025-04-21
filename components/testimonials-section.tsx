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
    <section id="testimonials" className="py-20 relative w-full overflow-hidden">
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
            <div className="flex items-center gap-2">
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
                  <DialogTitle className="text-2xl font-bold mb-2 flex items-center gap-2">
                    <Quote className="w-6 h-6 text-yellow-400" />
                    Share Your Experience
                  </DialogTitle>
                  <div className="mb-3 p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-200/80 text-sm">
                      <strong>Note:</strong> Your testimonial will be reviewed and shown only after approval.
                    </p>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80">Name</label>
                        <Input
                          value={newTestimonial.name}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                          placeholder="Your name"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80">Role</label>
                        <Input
                          value={newTestimonial.role}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                          placeholder="Your role/position"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80">Company</label>
                        <Input
                          value={newTestimonial.company}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, company: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                          placeholder="Company name"
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-sm font-medium text-white/80 flex items-center gap-1">
                          Website
                          <span className="text-xs text-white/40">(optional)</span>
                        </label>
                        <Input
                          value={newTestimonial.website}
                          onChange={(e) => setNewTestimonial({ ...newTestimonial, website: e.target.value })}
                          className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                          placeholder="https://your-website.com"
                          type="url"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-white/80 flex items-center gap-1">
                        Social Media Links
                        <span className="text-xs text-white/40">(optional)</span>
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="space-y-0.5">
                          <Input
                            value={newTestimonial.socialMedia.leetcode}
                            onChange={(e) => setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, leetcode: e.target.value }
                            })}
                            className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                            placeholder="leetcode.com/username"
                            type="url"
                          />
                          <p className="text-xs text-white/40">LeetCode Profile</p>
                        </div>
                        <div className="space-y-0.5">
                          <Input
                            value={newTestimonial.socialMedia.github}
                            onChange={(e) => setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, github: e.target.value }
                            })}
                            className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                            placeholder="github.com/username"
                            type="url"
                          />
                          <p className="text-xs text-white/40">GitHub Profile</p>
                        </div>
                        <div className="space-y-0.5">
                          <Input
                            value={newTestimonial.socialMedia.instagram}
                            onChange={(e) => setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, instagram: e.target.value }
                            })}
                            className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                            placeholder="instagram.com/username"
                            type="url"
                          />
                          <p className="text-xs text-white/40">Instagram Profile</p>
                        </div>
                        <div className="space-y-0.5">
                          <Input
                            value={newTestimonial.socialMedia.linkedin}
                            onChange={(e) => setNewTestimonial({
                              ...newTestimonial,
                              socialMedia: { ...newTestimonial.socialMedia, linkedin: e.target.value }
                            })}
                            className="bg-white/5 border-white/10 focus:border-yellow-500/50 h-9"
                            placeholder="linkedin.com/in/username"
                            type="url"
                          />
                          <p className="text-xs text-white/40">LinkedIn Profile</p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-white/80">Testimonial</label>
                      <Textarea
                        value={newTestimonial.content}
                        onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
                        className="bg-white/5 border-white/10 focus:border-yellow-500/50 min-h-[80px]"
                        placeholder="Share your experience..."
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-white/80">Rating</label>
                      <div 
                        className="flex gap-2"
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            onClick={() => setNewTestimonial({ ...newTestimonial, rating: star })}
                            onMouseEnter={() => setHoveredRating(star)}
                            className="p-1.5 rounded-full transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            title={`${star} star${star > 1 ? 's' : ''}`}
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={newTestimonial.rating >= star || hoveredRating >= star ? "filled" : "empty"}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.5, opacity: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                              >
                                <Star
                                  className={`w-5 h-5 ${
                                    newTestimonial.rating >= star || hoveredRating >= star
                                      ? "text-yellow-400 fill-current"
                                      : "text-white/20"
                                  }`}
                                />
                              </motion.div>
                            </AnimatePresence>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-white/80">Profile Image</label>
                      <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors border-white/20 hover:border-white/40">
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
                                className="w-24 h-24 rounded-full object-cover mx-auto"
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
                                <X className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <Upload className="w-6 h-6 mx-auto text-white/60" />
                              <p className="text-white/60 text-sm">Click to select an image</p>
                              <p className="text-xs text-white/40">PNG, JPG, WEBP up to 5MB</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className={`w-full transition-all duration-300 mt-2 ${
                        submitSuccess 
                          ? 'bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400'
                          : isSubmitting
                          ? 'bg-yellow-500/20 hover:bg-yellow-500/30 border-yellow-500/30 text-yellow-400'
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
              
              <motion.button
                onClick={handleShuffle}
                disabled={isShuffling || allTestimonials.length <= 3}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors duration-300 ${
                  isShuffling ? 'animate-spin' : ''
                }`}
              >
                <svg
                  className="w-4 h-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.button>
            </div>
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

        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-50"></div>
          
          {/* Testimonials grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            <AnimatePresence mode="wait">
              {isClient && allTestimonials.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-full text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
                    <Quote className="w-8 h-8 text-white/40" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No Testimonials Yet</h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    Be the first to share your experience! Click the plus button above to add your testimonial.
                  </p>
                </motion.div>
              ) : (
                displayedTestimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      y: -20, 
                      scale: 0.95,
                      transition: {
                        duration: 0.3,
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }
                    }}
                    className={`bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all duration-300 ${
                      index === 1 ? 'md:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    {/* Animated background elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>
                    <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>

                    {/* Quote icon */}
                    <div className="absolute top-4 right-4 text-white/20 group-hover:text-white/30 transition-colors duration-300">
                      <Quote className="w-8 h-8" />
                    </div>

                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-white/20"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Social Media Links */}
                    {(testimonial.socialMedia?.leetcode || testimonial.socialMedia?.github || testimonial.socialMedia?.instagram || testimonial.socialMedia?.linkedin) && (
                      <div className="mt-4 flex gap-2 relative z-10">
                        {testimonial.socialMedia.leetcode && (
                          <a 
                            href={testimonial.socialMedia.leetcode} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white/60 transition-colors duration-300"
                            title="LeetCode Profile"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.374 1.374 0 0 0-.415 1.015 1.374 1.374 0 0 0 .415 1.015l3.854 4.126 5.406 5.788a1.374 1.374 0 0 0 1.923 0l5.406-5.788 3.854-4.126a1.374 1.374 0 0 0 .415-1.015 1.374 1.374 0 0 0-.415-1.015l-3.854-4.126-5.406-5.788A1.374 1.374 0 0 0 13.483 0zm-2.866 12.815a1.374 1.374 0 0 0-1.923 0L3.288 18.6a1.374 1.374 0 0 0 0 1.923l5.406 5.788a1.374 1.374 0 0 0 1.923 0l5.406-5.788a1.374 1.374 0 0 0 0-1.923l-5.406-5.788z"/>
                            </svg>
                          </a>
                        )}
                        {testimonial.socialMedia.github && (
                          <a 
                            href={testimonial.socialMedia.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white/60 transition-colors duration-300"
                            title="GitHub Profile"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                          </a>
                        )}
                        {testimonial.socialMedia.instagram && (
                          <a 
                            href={testimonial.socialMedia.instagram} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white/60 transition-colors duration-300"
                            title="Instagram Profile"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 1.738-7.975 4.02-1.189 2.281-1.19 4.66-1.19 7.908 0 3.249.001 5.627 1.19 7.908 1.195 2.282 3.617 3.82 7.975 4.02 1.28.058 1.688.072 4.947.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-1.738 7.975-4.02 1.189-2.281 1.19-4.66 1.19-7.908 0-3.249-.001-5.627-1.19-7.908-1.195-2.282-3.617-3.82-7.975-4.02-1.28-.058-1.688-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                          </a>
                        )}
                        {testimonial.socialMedia.linkedin && (
                          <a 
                            href={testimonial.socialMedia.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white/40 hover:text-white/60 transition-colors duration-300"
                            title="LinkedIn Profile"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}