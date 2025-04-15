"use client";

import { useEffect, useState } from "react";

export function ScrollAnimation({ children }: { children: React.ReactNode }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    });

    document.querySelectorAll(".scroll-reveal").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} />
      <div className="smooth-scroll-container">
        {children}
      </div>
    </>
  );
} 