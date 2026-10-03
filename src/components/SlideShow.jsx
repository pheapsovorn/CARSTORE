"use client";

import { useState, useEffect, useCallback } from "react";
import { FiChevronLeft, FiChevronRight, FiArrowRight } from "react-icons/fi";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    category: "Italian Masterpiece",
    title: "Lamborghini Aventador",
    subtitle: "V12 raw power combined with cutting-edge aerodynamic design.",
    cta: "Explore Lamborghini",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1600&auto=format&fit=crop",
    category: "Racing Heritage",
    title: "Ferrari F8 Tributo",
    subtitle: "Unmatched Italian elegance and track-tested performance.",
    cta: "Discover Ferrari",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1600&auto=format&fit=crop",
    category: "Hypercar Artistry",
    title: "Pagani Huayra",
    subtitle: "Exquisite bespoke craftsmanship meets extreme hypercar engineering.",
    cta: "View Pagani",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1600712242805-5f78671b24da?q=80&w=1600&auto=format&fit=crop",
    category: "Ultimate Speed",
    title: "Bugatti Chiron",
    subtitle: "Quad-turbocharged W16 engine delivering unprecedented luxury and top speed.",
    cta: "Experience Bugatti",
  },
];

const SlideShow = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const length = slides.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
  }, [length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
  }, [length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <div
      className="group relative w-full overflow-hidden rounded-3xl bg-slate-950 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className="relative h-[480px] w-full flex-shrink-0 sm:h-[550px] md:h-[620px]"
            >
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                />
              </div>

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/30 to-transparent" />

              {/* Slide Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-12 md:p-16">
                <div className="max-w-2xl">
                  {/* Category Pill */}
                  <span className="inline-block rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {slide.category}
                  </span>

                  {/* Title */}
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                    {slide.title}
                  </h2>

                  {/* Subtitle */}
                  <p className="mt-3 text-base text-slate-300 sm:text-lg md:text-xl">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <div className="mt-6 sm:mt-8">
                    <button className="group/btn inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/30 active:scale-95">
                      <span>{slide.cta}</span>
                      <FiArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Counter Badge */}
      <div className="absolute right-6 top-6 hidden rounded-full border border-white/15 bg-black/30 px-3.5 py-1 text-xs font-mono font-medium text-white/80 backdrop-blur-md sm:block">
        0{current + 1} <span className="text-white/40">/</span> 0{length}
      </div>

      {/* Previous Slide Button */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900 focus:outline-none sm:left-6"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={22} />
      </button>

      {/* Next Slide Button */}
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-black/30 p-3 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-white hover:text-slate-900 focus:outline-none sm:right-6"
        aria-label="Next slide"
      >
        <FiChevronRight size={22} />
      </button>

      {/* Pagination Indicators */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 sm:bottom-10 sm:right-12">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              i === current
                ? "w-8 bg-white"
                : "w-2.5 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlideShow;