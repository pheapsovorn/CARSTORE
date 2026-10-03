"use client";

import { useEffect, useState, useRef } from "react";
import {
  FiTool,
  FiRefreshCw,
  FiDroplet,
  FiShield,
  FiTruck,
  FiSettings,
  FiArrowRight,
} from "react-icons/fi";

const services = [
  {
    icon: FiTool,
    title: "General Repair",
    desc: "Precision diagnostics and engine repairs for luxury and performance vehicles.",
  },
  {
    icon: FiRefreshCw,
    title: "Routine Maintenance",
    desc: "Scheduled fluid changes, brake calibrations, and multi-point inspections.",
  },
  {
    icon: FiDroplet,
    title: "Detailing & Ceramic Coating",
    desc: "Paint correction, interior restoration, and multi-layer ceramic protection.",
  },
  {
    icon: FiShield,
    title: "Insurance & Warranty",
    desc: "Extended coverage options and seamless insurance claim processing.",
  },
  {
    icon: FiTruck,
    title: "24/7 Transport & Assistance",
    desc: "Enclosed transport towing and immediate flatbed roadside support.",
  },
  {
    icon: FiSettings,
    title: "Custom Performance Mods",
    desc: "ECU tuning, custom exhaust systems, and aerodynamic body upgrades.",
  },
];

const Service = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* ── Google Fonts Import (Outfit for headings, Plus Jakarta Sans for body) ── */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

        .font-heading {
          font-family: 'Outfit', sans-serif;
        }
        .font-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      <section
        ref={sectionRef}
        className="font-body relative bg-white py-24 text-slate-900"
      >
        {/* Soft off-white gradient for light depth */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-slate-50 to-white" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center">
            <span
              className={`inline-block rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sky-700 transition-all duration-700 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Tailored Services
            </span>

            <h2
              className={`font-heading mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl transition-all duration-700 delay-100 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Precision <span className="text-sky-600">Automotive</span> Care
            </h2>

            <p
              className={`mt-4 text-base leading-relaxed text-slate-600 sm:text-lg transition-all duration-700 delay-200 ${
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              Comprehensive maintenance, performance upgrades, and white-glove service crafted for your vehicle.
            </p>
          </div>

          {/* Minimalist Light Cards */}
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 ${
                    visible
                      ? "translate-y-0 opacity-100"
                      : "translate-y-8 opacity-0"
                  }`}
                  style={{ transitionDelay: `${150 + i * 75}ms` }}
                >
                  <div>
                    {/* Clean Tile Icon Container */}
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-800 transition-colors duration-300 group-hover:border-sky-200 group-hover:bg-sky-50 group-hover:text-sky-600">
                      <Icon size={22} />
                    </div>

                    {/* Title */}
                    <h3 className="font-heading mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-sky-600">
                      {s.title}
                    </h3>

                    {/* Description */}
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      {s.desc}
                    </p>
                  </div>

                  {/* Minimal Link Footer */}
                  <div className="mt-8 border-t border-slate-100 pt-4">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 transition-colors duration-300 group-hover:text-sky-600"
                    >
                      <span>Explore Service</span>
                      <FiArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default Service;