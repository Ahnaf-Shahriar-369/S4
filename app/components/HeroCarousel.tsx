"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  imageSrc?: string; // Blank placeholder - user can add real image path here
  badge?: string;
  gradient: string;
}

const defaultSlides: Slide[] = [
  {
    id: 1,
    badge: "24/7 PROTECTION",
    title: "Elite Manned Guarding & Security Solutions",
    subtitle: "Delivering world-class security officers and rapid tactical response nationwide.",
    imageSrc: "", // Blank - ready for real image
    gradient: "from-[#3B388D]/60 via-zinc-950 to-black",
  },
  {
    id: 2,
    badge: "COMMERCIAL & RESIDENTIAL",
    title: "Advanced CCTV Surveillance & Patrols",
    subtitle: "Comprehensive risk management and continuous monitoring for your assets.",
    imageSrc: "",
    gradient: "from-red-950/50 via-zinc-950 to-black",
  },
  {
    id: 3,
    badge: "ISO 9001 CERTIFIED",
    title: "Rapid Tactical Emergency Response",
    subtitle: "Instant dispatch armed/unarmed patrol teams trained for high-stakes environments.",
    imageSrc: "",
    gradient: "from-emerald-950/50 via-zinc-950 to-black",
  },
];

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + defaultSlides.length) % defaultSlides.length);
  };

  // Automated Slideshow (rotates every 5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-black text-white py-4 px-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 h-[480px] sm:h-[540px] md:h-[600px] flex items-center justify-center">
        
        {/* Carousel Slides */}
        {defaultSlides.map((slide, index) => {
          const isActive = index === currentSlide;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-all duration-700 ease-in-out flex items-center justify-center ${
                isActive
                  ? "opacity-100 scale-100 z-10 pointer-events-auto"
                  : "opacity-0 scale-105 z-0 pointer-events-none"
              }`}
            >
              {/* Image Background or Blank Placeholder Container */}
              <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}>
                {slide.imageSrc ? (
                  <Image
                    src={slide.imageSrc}
                    alt={slide.title}
                    fill
                    className="object-cover opacity-60"
                    priority={index === 0}
                  />
                ) : (
                  /* Blank Image Placeholder Visual Frame */
                  <div className="w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-white/15 bg-zinc-900/40 relative">
                    {/* Decorative Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem]" />
                    
                    {/* Placeholder Icon Badge */}
                    <div className="relative z-10 flex flex-col items-center gap-2 text-white/30">
                      <svg className="w-16 h-16 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-xs font-mono tracking-widest uppercase font-semibold">
                        [ Blank Image Slot {slide.id} — Add Image Here ]
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Slide Content Overlay */}
              <div className="relative z-20 max-w-4xl px-6 sm:px-12 text-center flex flex-col items-center">
                {slide.badge && (
                  <span className="inline-block bg-[#3B388D] text-white text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-4 shadow-lg border border-white/15 animate-bounce">
                    {slide.badge}
                  </span>
                )}
                
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white mb-4 leading-tight drop-shadow-md">
                  {slide.title}
                </h1>
                
                <p className="text-sm sm:text-lg md:text-xl text-zinc-300 max-w-2xl font-medium mb-8 leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* Hero Action Buttons */}
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="#services"
                    className="bg-[#e61e2b] hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95"
                  >
                    OUR SERVICES
                  </Link>
                  <Link
                    href="#contact"
                    className="bg-white/15 hover:bg-white/25 border border-white/20 text-white font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full uppercase tracking-wider transition-all duration-300 backdrop-blur-md hover:scale-105 active:scale-95"
                  >
                    GET FREE QUOTE
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* Previous Navigation Arrow */}
        <button
          onClick={prevSlide}
          type="button"
          aria-label="Previous Slide"
          className="absolute left-4 sm:left-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Next Navigation Arrow */}
        <button
          onClick={nextSlide}
          type="button"
          aria-label="Next Slide"
          className="absolute right-4 sm:right-6 z-30 p-3 rounded-full bg-black/40 hover:bg-black/80 text-white border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-md"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 z-30 flex items-center gap-3">
          {defaultSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              type="button"
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === currentSlide
                  ? "w-8 h-2.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                  : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
