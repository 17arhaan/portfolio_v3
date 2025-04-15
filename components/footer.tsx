"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
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
            <p className="text-white/70 text-sm">
              Turning ideas into reality through code
            </p>
          </div>

          {/* Middle section - Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
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
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:your.email@example.com"
                whileHover={{ y: -2 }}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
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