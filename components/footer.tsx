"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Sparkles, Code } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 md:px-6 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left section - Signature */}
          <div className="flex flex-col items-center md:items-start">
            <div className="relative w-32 h-16 mb-4">
              <Image
                src="/signature.png"
                alt="Arhaan Girdhar"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="group relative">
              <motion.div 
                className="absolute -inset-1 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-1000"
                animate={{
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
              <div className="relative flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-white/30" />
                <p className="text-white/70 text-sm italic">
                  <span className="text-white/90 font-medium">Turning ideas</span> into <span className="text-white/90 font-medium">reality</span> through <span className="text-white/90 font-medium">code</span>
                </p>
              </div>
            </div>
          </div>

          {/* Middle section - Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Portfolio</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="#about" className="text-white/70 hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-white/70 hover:text-white transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right section - Social Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="https://github.com/17arhaan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/arhaan17/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://leetcode.com/u/arhaan17/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Code className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:17arhaan.connect@gmail.com"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
            </div>
            
            {/* Quick Links below Connections */}
            <div className="mt-6 flex flex-wrap justify-center md:justify-end gap-x-6 gap-y-2">
              <motion.a 
                href="#experience" 
                whileHover={{ x: 2 }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Experience
              </motion.a>
              <motion.a 
                href="#skills" 
                whileHover={{ x: 2 }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Skills
              </motion.a>
              <motion.a 
                href="#certifications" 
                whileHover={{ x: 2 }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Certifications
              </motion.a>
              <motion.a 
                href="#resume" 
                whileHover={{ x: 2 }}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                Resume
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom section - Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} Arhaan Girdhar. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 