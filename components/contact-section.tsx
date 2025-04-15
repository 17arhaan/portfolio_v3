"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Loader2, Send, Phone, User, AtSign, MessageSquare, Briefcase, ChevronDown, Calendar, Globe, Code } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  phone: z.string()
    .optional()
    .refine((val) => !val || /^\+?[1-9]\d{1,14}$/.test(val), {
      message: "Please enter a valid phone number (e.g., +1234567890)"
    }),
  company: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  availability: z.string().optional(),
  website: z.string()
    .optional()
    .refine((val) => !val || /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(val), {
      message: "Please enter a valid website URL (e.g., example.com or www.example.com)"
    }),
})

type FormData = z.infer<typeof formSchema>

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      phone: "",
      company: "",
      inquiryType: "",
      availability: "",
      website: "",
    }
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      setSubmitStatus("success")
      reset()
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      // Auto-hide success message after 5 seconds
      if (submitStatus === "success") {
        setTimeout(() => setSubmitStatus("idle"), 5000)
      }
    }
  }

  return (
    <section id="contact" className="py-24 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Get in Touch</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            Let's collaborate and create something amazing together.
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

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          {/* Contact Details - Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 relative overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/5 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-0 group-hover:opacity-20"></div>
              
              <h3 className="text-xl font-semibold text-white mb-6 relative">
                <motion.span
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="block"
                >
                  Let's Connect
                </motion.span>
                <motion.div
                  className="absolute bottom-0 left-0 w-16 h-0.5 bg-white/30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              
              <div className="space-y-6">
                <motion.a
                  href="mailto:17arhaan.connect@gmail.com"
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300 group relative"
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ 
                      rotate: [0, -10, 10, -10, 0],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Mail className="w-5 h-5 relative z-10" />
                  </motion.div>
                  <div className="relative">
                    <p className="font-medium text-white">Email</p>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">17arhaan.connect@gmail.com</p>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </div>
                </motion.a>
                
                <motion.div
                  className="flex items-center gap-4 text-white/70 hover:text-white transition-colors duration-300 group relative"
                  whileHover={{ x: 5 }}
                >
                  <motion.div 
                    className="p-3 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 relative overflow-hidden"
                    whileHover={{ 
                      scale: [1, 1.2, 1],
                      transition: { duration: 0.5 }
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Phone className="w-5 h-5 relative z-10" />
                  </motion.div>
                  <div className="relative">
                    <p className="font-medium text-white">Phone</p>
                    <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">+919650984445</p>
                    <motion.div
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/30 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: "100%" }}
                    />
                  </div>
                </motion.div>
              </div>
              
              <div className="mt-8">
                <motion.h4 
                  className="text-white/80 text-sm mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Follow Me:
                </motion.h4>
                <div className="flex gap-3">
                  <motion.a
                    href="https://github.com/17arhaan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Github className="w-5 h-5 text-white/80 hover:text-white transition-colors duration-300 relative z-10" />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/arhaan17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Linkedin className="w-5 h-5 text-white/80 hover:text-white transition-colors duration-300 relative z-10" />
                  </motion.a>
                  <motion.a
                    href="https://leetcode.com/u/arhaan17/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 relative overflow-hidden group"
                    whileHover={{ 
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(255, 255, 255, 0.1)"
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Code className="w-5 h-5 text-white/80 hover:text-white transition-colors duration-300 relative z-10" />
                  </motion.a>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/5 backdrop-blur-sm p-10 rounded-lg border border-white/10 relative overflow-hidden"
            >
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full bg-white/5 opacity-40"></div>
              <div className="absolute bottom-5 left-10 w-16 h-16 rounded-full bg-white/5 opacity-30"></div>
              
              {/* Giant quote marks */}
              <div className="absolute top-6 left-6 text-8xl text-white/10 font-serif">"</div>
              <div className="absolute bottom-0 right-6 text-8xl text-white/10 font-serif">"</div>
              
              {/* Quote content */}
              <div className="relative z-10 mx-auto max-w-xl text-center">
                <motion.p 
                  className="text-white/90 text-xl font-serif leading-relaxed"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  <motion.span 
                    className="italic text-white/95 relative"
                    animate={{ 
                      textShadow: ["0 0 5px rgba(255,255,255,0.1)", "0 0 10px rgba(255,255,255,0.2)", "0 0 5px rgba(255,255,255,0.1)"],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    I believe great technology should feel personal, solving real problems with a human touch. Let's create something meaningful together.
                  </motion.span>
                </motion.p>
                
                <motion.div 
                  className="mt-4 w-16 h-1 bg-white/20 mx-auto rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "4rem" }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form - Right Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3 bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 relative overflow-hidden"
          >
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl pointer-events-none"></div>
            
            <h3 className="text-xl font-semibold text-white mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="form-group relative">
                  <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      {...register("name")}
                      type="text"
                      id="name"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="Your name"
                    />
                  </div>
                  {errors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.name.message}
                    </motion.p>
                  )}
                </div>

                {/* Email Field */}
                <div className="form-group relative">
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      {...register("email")}
                      type="email"
                      id="email"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.email.message}
                    </motion.p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Phone Field */}
                <div className="form-group">
                  <label htmlFor="phone" className="block text-sm font-medium text-white/80 mb-1">
                    Phone (optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      {...register("phone")}
                      type="tel"
                      id="phone"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                {/* Company Field */}
                <div className="form-group">
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
                    Company (optional)
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      {...register("company")}
                      type="text"
                      id="company"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="Your company"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Inquiry Type Dropdown */}
                <div className="form-group">
                  <label htmlFor="inquiryType" className="block text-sm font-medium text-white/80 mb-1">
                    Inquiry Type <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    </div>
                    <select
                      {...register("inquiryType")}
                      id="inquiryType"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300 appearance-none"
                    >
                      <option value="" className="bg-gray-900">Select an option</option>
                      <option value="job-opportunity" className="bg-gray-900">Job Opportunity</option>
                      <option value="freelance-project" className="bg-gray-900">Freelance Project</option>
                      <option value="collaboration" className="bg-gray-900">Collaboration</option>
                      <option value="consultation" className="bg-gray-900">Consultation</option>
                      <option value="other" className="bg-gray-900">Other</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown className="h-4 w-4 text-white/40" />
                    </div>
                  </div>
                  {errors.inquiryType && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-1 text-xs text-red-400"
                    >
                      {errors.inquiryType.message}
                    </motion.p>
                  )}
                </div>

                {/* Website Field */}
                <div className="form-group">
                  <label htmlFor="website" className="block text-sm font-medium text-white/80 mb-1">
                    Website (optional)
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      {...register("website")}
                      type="url"
                      id="website"
                      className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                      placeholder="https://your-website.com"
                    />
                  </div>
                </div>
              </div>

              {/* Availability Field */}
              <div className="form-group">
                <label htmlFor="availability" className="block text-sm font-medium text-white/80 mb-1">
                  Your Availability (optional)
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                  <input
                    {...register("availability")}
                    type="text"
                    id="availability"
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                    placeholder="When would you like to connect?"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div className="form-group">
                <label htmlFor="subject" className="block text-sm font-medium text-white/80 mb-1">
                  Subject <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("subject")}
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                  placeholder="What's this about?"
                />
                {errors.subject && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.subject.message}
                  </motion.p>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group">
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                  Message <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-1 text-xs text-red-400"
                  >
                    {errors.message.message}
                  </motion.p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/15 border border-white/20 rounded-md text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,255,255,0.15)] relative overflow-hidden group"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></span>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>

              {submitStatus === "success" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-green-400/10 border border-green-400/20 flex items-center"
                >
                  <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                  <p className="text-green-400 text-sm">Message sent successfully! I'll get back to you soon.</p>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-red-400/10 border border-red-400/20 flex items-center"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                  <p className="text-red-400 text-sm">Failed to send message. Please try again or email me directly.</p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 