"use client"

import { motion } from "framer-motion"
import { Mail, Github, Linkedin, Twitter, Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
    <section id="contact" className="py-20 relative w-full">
      <div className="max-w-[90vw] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12"
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
            Let's connect and create something amazing together.
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

        <div className="flex flex-col md:flex-row items-start justify-center gap-12 px-4 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full md:w-1/2 bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-1">
                  Name
                </label>
                <input
                  {...register("name")}
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="Your name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white/80 mb-1">
                  Message
                </label>
                <textarea
                  {...register("message")}
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 resize-none"
                  placeholder="Your message..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-white font-medium transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <span>Send Message</span>
                )}
              </button>

              {submitStatus === "success" && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-400 text-sm text-center p-2 rounded-md bg-green-400/10 border border-green-400/20"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
              {submitStatus === "error" && (
                <motion.p 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-400 text-sm text-center p-2 rounded-md bg-red-400/10 border border-red-400/20"
                >
                  Failed to send message. Please try again or email me directly.
                </motion.p>
              )}
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="w-full md:w-1/2 flex flex-col items-center justify-start gap-8"
          >
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="mailto:arhaangirdhar17@gmail.com"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <Mail className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  Email
                </span>
              </a>
              <a
                href="https://github.com/17arhaan"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <Github className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  GitHub
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/arhaan17/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300" />
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  LinkedIn
                </span>
              </a>
              <a
                href="https://leetcode.com/u/arhaan17/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
              >
                <svg
                  className="w-5 h-5 text-white/80 group-hover:text-white transition-colors duration-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a1.67 1.67 0 0 0-.495 1.59l1.2 5.274a1.67 1.67 0 0 0 1.255 1.25l5.292 1.2a1.67 1.67 0 0 0 1.588-.495l4.127-3.854 5.79-5.406a1.374 1.374 0 0 0 0-1.942l-5.79-5.406a1.374 1.374 0 0 0-.961-.438zm-2.866 12.815a1.88 1.88 0 0 1-1.276-.536l-1.12-1.12a1.88 1.88 0 0 1 0-2.652l1.12-1.12a1.88 1.88 0 0 1 2.652 0l1.12 1.12a1.88 1.88 0 0 1 0 2.652l-1.12 1.12a1.88 1.88 0 0 1-1.276.536z" />
                </svg>
                <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                  LeetCode
                </span>
              </a>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-white/60 text-sm mt-8 text-center max-w-md"
            >
              Feel free to reach out for collaborations, job opportunities, or just to say hello!
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 