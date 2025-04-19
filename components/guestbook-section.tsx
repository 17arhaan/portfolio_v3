"use client"

import { motion } from "framer-motion"
import { MessageSquare, Send, Loader2, Heart, Reply, User, AtSign, Globe, Star, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Image from "next/image"
import { addTestimonial } from "@/data/testimonials"

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email").optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters"),
  image: z.any().optional(),
  rating: z.number().min(1).max(5).optional(),
  role: z.string().optional(),
  company: z.string().optional(),
  showInTestimonials: z.boolean().default(false)
})

type FormData = z.infer<typeof formSchema>

type GuestbookMessage = {
  id: string
  name: string
  email?: string
  website?: string
  message: string
  timestamp: string
  likes: number
  replies: GuestbookMessage[]
  image?: string
  rating?: number
  role?: string
  company?: string
}

export default function GuestbookSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [messages, setMessages] = useState<GuestbookMessage[]>([])
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const rating = watch("rating")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
      setValue("image", file)
    }
  }

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const newMessage: GuestbookMessage = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        website: data.website,
        message: data.message,
        timestamp: new Date().toISOString(),
        likes: 0,
        replies: [],
        image: previewImage || undefined,
        rating: data.rating,
        role: data.role,
        company: data.company,
      }

      setMessages((prev) => [newMessage, ...prev])

      // If consent is given and rating is 4 or 5 stars, add to testimonials
      if (data.showInTestimonials && data.rating && data.rating >= 4) {
        const testimonial = {
          id: `testimonial_${newMessage.id}`,
          name: data.name,
          role: data.role || "Guest",
          company: data.company || "Personal",
          image: previewImage || "/user.png",
          rating: data.rating,
          content: data.message,
          date: new Date().toISOString(),
        }
        addTestimonial(testimonial)
      }

      setSubmitStatus("success")
      reset()
      setPreviewImage(null)
    } catch (error) {
      console.error("Error sending message:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
      if (submitStatus === "success") {
        setTimeout(() => setSubmitStatus("idle"), 5000)
      }
    }
  }

  const handleLike = (messageId: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId 
          ? { ...msg, likes: msg.likes > 0 ? 0 : 1 } 
          : msg
      )
    )
  }

  return (
    <section id="guestbook" className="py-24 relative w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4 text-white">Guestbook</h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-3 text-sm md:text-base text-white/80 max-w-2xl mx-auto italic"
            style={{ textShadow: "0 0 5px rgba(255,255,255,0.3)" }}
          >
            Leave your mark and share your thoughts!
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

        <div className="max-w-3xl mx-auto">
          {/* Guestbook Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 relative overflow-hidden mb-12"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Leave a Message</h3>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name Field */}
                <div className="form-group">
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

                {/* Role Field */}
                <div className="form-group">
                  <label htmlFor="role" className="block text-sm font-medium text-white/80 mb-1">
                    Professional Role (optional)
                  </label>
                  <input
                    {...register("role")}
                    type="text"
                    id="role"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                    placeholder="e.g. Senior Developer"
                  />
                </div>

                {/* Company Field */}
                <div className="form-group">
                  <label htmlFor="company" className="block text-sm font-medium text-white/80 mb-1">
                    Company (optional)
                  </label>
                  <input
                    {...register("company")}
                    type="text"
                    id="company"
                    className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-md text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all duration-300"
                    placeholder="Your company name"
                  />
                </div>

                {/* Email Field */}
                <div className="form-group">
                  <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-1">
                    Email (optional)
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
                </div>
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

              {/* Image Upload */}
              <div className="form-group">
                <label htmlFor="image" className="block text-sm font-medium text-white/80 mb-1">
                  Profile Image (optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="image"
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-md text-white/60 hover:text-white cursor-pointer flex items-center gap-2 transition-all duration-300"
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Choose an image</span>
                  </label>
                </div>
                {previewImage && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 w-20 h-20 rounded-full overflow-hidden border-2 border-white/20"
                  >
                    <Image
                      src={previewImage}
                      alt="Preview"
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </div>

              {/* Rating */}
              <div className="form-group">
                <label className="block text-sm font-medium text-white/80 mb-1">
                  Rating (optional)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setValue("rating", star)}
                      className={`w-6 h-6 ${
                        rating && star <= rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/20 hover:text-yellow-400/50"
                      }`}
                    >
                      <Star className="w-full h-full" />
                    </motion.button>
                  ))}
                </div>
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
                    rows={4}
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

              {/* Consent Checkbox */}
              <div className="form-group">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    {...register("showInTestimonials")}
                    className="w-4 h-4 rounded border-white/20 bg-white/10 text-[#910A67] focus:ring-[#910A67] focus:ring-offset-0 focus:ring-offset-transparent transition-all duration-300"
                  />
                  <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                    I consent to having my message displayed in the testimonials section.
                  </span>
                </label>
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
                  <p className="text-green-400 text-sm">Message sent successfully!</p>
                </motion.div>
              )}
              
              {submitStatus === "error" && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-md bg-red-400/10 border border-red-400/20 flex items-center"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                  <p className="text-red-400 text-sm">Failed to send message. Please try again.</p>
                </motion.div>
              )}
            </form>
          </motion.div>

          {/* Messages Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-4"
          >
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10 relative overflow-hidden group"
              >
                <div className="flex items-start gap-4">
                  {message.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20">
                      <Image
                        src={message.image}
                        alt={message.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white font-medium">{message.name}</h4>
                        {(message.role || message.company) && (
                          <p className="text-white/60 text-sm">
                            {message.role && <span>{message.role}</span>}
                            {message.role && message.company && <span> at </span>}
                            {message.company && <span>{message.company}</span>}
                          </p>
                        )}
                        <p className="text-white/60 text-sm">
                          {new Date(message.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      {message.website && (
                        <a
                          href={message.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                    
                    <p className="mt-4 text-white/80">{message.message}</p>
                    
                    <div className="mt-4 flex items-center space-x-4">
                      <motion.button
                        onClick={() => handleLike(message.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`flex items-center space-x-1 transition-colors ${
                          message.likes > 0 ? "text-red-400" : "text-white/60 hover:text-white"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{message.likes}</span>
                      </motion.button>
                      
                      <motion.button
                        onClick={() => setReplyingTo(message.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center space-x-1 text-white/60 hover:text-white transition-colors"
                      >
                        <Reply className="w-4 h-4" />
                        <span className="text-sm">Reply</span>
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Replies */}
                {message.replies.length > 0 && (
                  <div className="mt-4 space-y-4 pl-4 border-l border-white/10">
                    {message.replies.map((reply) => (
                      <motion.div
                        key={reply.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 p-4 rounded-lg"
                      >
                        <div className="flex items-start gap-4">
                          {reply.image && (
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                              <Image
                                src={reply.image}
                                alt={reply.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="text-white font-medium">{reply.name}</h5>
                                <p className="text-white/60 text-sm">
                                  {new Date(reply.timestamp).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <p className="mt-2 text-white/80">{reply.message}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
} 