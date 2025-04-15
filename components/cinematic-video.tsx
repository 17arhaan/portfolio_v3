"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface CinematicVideoProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CinematicVideo({ isOpen, onClose }: CinematicVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative w-full max-w-7xl aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/ArhaanGirdhar_MC.mp4"
              className="w-full h-full object-cover rounded-lg"
              autoPlay
              playsInline
              onPlay={() => setIsPlaying(true)}
              onEnded={onClose}
            />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isPlaying ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-white text-lg font-medium"
              >
                Click anywhere to close
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 