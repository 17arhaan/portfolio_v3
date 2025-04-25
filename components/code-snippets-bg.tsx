"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const snippets = [
  `function greet() {
  console.log("Hello, World!");
}`,
  `const sum = (a, b) => a + b;`,
  `class Developer {
  constructor(name) {
    this.name = name;
  }
}`,
  `const projects = [
  "Web Development",
  "Machine Learning",
  "Data Science"
];`,
  `async function fetchData() {
  const response = await fetch(url);
  return response.json();
}`,
  `const map = new Map();
map.set("key", "value");`,
  `const fibonacci = (n) => 
  n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);`,
  `const debounce = (fn, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};`
]

export default function CodeSnippetsBg() {
  const [visibleSnippets, setVisibleSnippets] = useState<number[]>([])

  useEffect(() => {
    // Show snippets one by one
    const interval = setInterval(() => {
      setVisibleSnippets(prev => {
        if (prev.length >= snippets.length) {
          return prev
        }
        return [...prev, prev.length]
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      {snippets.map((snippet, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: visibleSnippets.includes(index) ? 1 : 0,
            scale: visibleSnippets.includes(index) ? 1 : 0.8
          }}
          transition={{ duration: 0.5 }}
          className="absolute font-mono text-sm text-white/30"
          style={{
            left: `${(index * 20) % 80}%`,
            top: `${(index * 15) % 80}%`,
            transform: `rotate(${(index * 5) % 15}deg)`,
          }}
        >
          <pre className="whitespace-pre-wrap">{snippet}</pre>
        </motion.div>
      ))}
    </div>
  )
} 