"use client";

import { useEffect, useState } from "react";
import { FiArrowRight, FiPlay, FiChevronLeft, FiChevronRight, FiCheck } from "react-icons/fi";

const cars = [
  {
    id: "porsche-gt3",
    name: "Porsche 911 GT3 RS",
    category: "Supercar",
    tagline: "Track Precision Meets Highway Dominance",
    price: "$223,800",
    acceleration: "3.0s (0-60)",
    topSpeed: "196 mph",
    image: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1800&q=80",
  },
  {
    id: "mclaren-720s",
    name: "McLaren 720S Spider",
    category: "Exotic",
    tagline: "Relentless Performance & Aerodynamic Mastery",
    price: "$315,000",
    acceleration: "2.8s (0-60)",
    topSpeed: "212 mph",
    image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=1800&q=80",
  },
  {
    id: "mercedes-amg-gt",
    name: "Mercedes-AMG GT 63 S",
    category: "Performance Luxury",
    tagline: "Handcrafted V8 Biturbo Power Meets Supreme Elegance",
    price: "$179,000",
    acceleration: "3.1s (0-60)",
    topSpeed: "196 mph",
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1800&q=80",
  },
];

const stats = [
  { value: "2,500+", label: "Cars Delivered" },
  { value: "1,200+", label: "5-Star Reviews" },
  { value: "15+", label: "Years Experience" },
];

const HeroSection = () => {
  const [show, setShow] = useState(false);
  const [selectedCarIndex, setSelectedCarIndex] = useState(0);

  useEffect(() => {
    setShow(true);
  }, []);

  const currentCar = cars[selectedCarIndex];

  const handleNextCar = () => {
    setSelectedCarIndex((prev) => (prev + 1) % cars.length);
  };

  const handlePrevCar = () => {
    setSelectedCarIndex((prev) => (prev - 1 + cars.length) % cars.length);
  };

  return (
    <>
      {/* ── Google Fonts Import (Outfit) ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');

        .font-outfit {
          font-family: 'Outfit', sans-serif;
        }
      `}</style>

      <section className="font-outfit relative flex min-h-[700px] flex-col justify-between overflow-hidden bg-white text-slate-900 md:min-h-[820px]">
        
        {/* Background Car Image with Dynamic Fade */}
        {cars.map((car, idx) => (
          <div
            key={car.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === selectedCarIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={car.image}
              alt={car.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ))}

        {/* Light Ambient Gradient Overlays for High Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40" />

        {/* Main Content Area */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-20 pb-12 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Text Block */}
            <div className="max-w-2xl lg:col-span-7">
              {/* Badge */}
              <div
                className={`inline-flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50/90 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-sky-700 backdrop-blur-md transition-all duration-700 ${
                  show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-sky-500 animate-ping" />
                <span>{currentCar.category} Collection</span>
              </div>

              {/* Dynamic Car Title */}
              <h1
                className={`mt-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl transition-all duration-700 delay-100 ${
                  show ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                }`}
              >
                Drive Your{" "}
                <span className="bg-gradient-to-r from-sky-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent">
                  {currentCar.name}
                </span>{" "}
                Home
              </h1>

              {/* Subtitle */}
              <p
                className={`mt-4 max-w-lg text-base font-normal text-slate-600 sm:text-lg transition-all duration-700 delay-200 ${
                  show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                {currentCar.tagline}. Explore flexible direct leasing, white-glove transport, and guaranteed vehicle inspection.
              </p>

              {/* CTAs */}
              <div
                className={`mt-8 flex flex-wrap items-center gap-4 transition-all duration-700 delay-300 ${
                  show ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <a
                  href="#inventory"
                  className="group inline-flex items-center gap-3 rounded-full bg-sky-600 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-sky-600/20 transition-all hover:scale-105 hover:bg-sky-500 hover:shadow-sky-600/35"
                >
                  <span>Reserve This Vehicle</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </a>

                <a
                  href="#video"
                  className="group inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white/80 px-7 py-4 text-sm font-semibold text-slate-800 shadow-sm backdrop-blur-md transition-all hover:border-slate-400 hover:bg-white"
                >
                  <FiPlay className="text-sky-600 transition-transform group-hover:scale-110" />
                  <span>Exhaust Sound Clip</span>
                </a>
              </div>

              {/* Car Performance Spec Bar */}
              <div
                className={`mt-10 grid grid-cols-3 gap-4 border-t border-slate-200/80 pt-6 transition-all duration-700 delay-400 ${
                  show ? "opacity-100" : "opacity-0"
                }`}
              >
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500">Starting At</span>
                  <p className="text-lg font-bold text-slate-900 sm:text-xl">{currentCar.price}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500">0 - 60 mph</span>
                  <p className="text-lg font-bold text-sky-600 sm:text-xl">{currentCar.acceleration}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-slate-500">Top Speed</span>
                  <p className="text-lg font-bold text-slate-900 sm:text-xl">{currentCar.topSpeed}</p>
                </div>
              </div>
            </div>

            {/* Right Side: Car Selector Cards */}
            <div
              className={`flex flex-col gap-4 lg:col-span-5 lg:items-end transition-all duration-700 delay-500 ${
                show ? "translate-x-0 opacity-100" : "translate-x-8 opacity-0"
              }`}
            >
              <div className="w-full max-w-sm rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur-xl">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-widest text-sky-600">
                    Select Featured Vehicle
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevCar}
                      aria-label="Previous Car"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                    >
                      <FiChevronLeft size={16} />
                    </button>
                    <button
                      onClick={handleNextCar}
                      aria-label="Next Car"
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                    >
                      <FiChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Thumbnail List */}
                <div className="space-y-3">
                  {cars.map((car, index) => (
                    <button
                      key={car.id}
                      onClick={() => setSelectedCarIndex(index)}
                      className={`group flex w-full items-center gap-3 rounded-xl border p-2.5 transition-all text-left ${
                        index === selectedCarIndex
                          ? "border-sky-500 bg-sky-50/80 shadow-sm"
                          : "border-slate-200/60 bg-white/60 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <img
                        src={car.image}
                        alt={car.name}
                        className="h-12 w-16 rounded-lg object-cover shadow-sm"
                      />
                      <div className="flex-1 overflow-hidden">
                        <h4 className="truncate text-xs font-bold text-slate-900">{car.name}</h4>
                        <p className="text-[11px] text-slate-500">{car.price}</p>
                      </div>
                      {index === selectedCarIndex && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-600 text-white">
                          <FiCheck size={14} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Bar Stats */}
        <div className="relative z-10 border-t border-slate-200/80 bg-white/80 backdrop-blur-md py-6">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 lg:px-8">
            <div className="flex flex-wrap gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-slate-900">
                  <span className="block text-xl font-black sm:text-2xl">{stat.value}</span>
                  <span className="text-xs text-slate-500">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Scroll for inventory</span>
              <div className="h-6 w-4 rounded-full border border-slate-400/60 p-0.5">
                <div className="h-1.5 w-1 rounded-full bg-sky-600 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;