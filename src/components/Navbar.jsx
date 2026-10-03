"use client";

import { useState } from "react";
import {
  FiSearch,
  FiShoppingCart,
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
} from "react-icons/fi";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("EN");
  const [menuOpen, setMenuOpen] = useState(false);

const navLinks = ["Home", "Product", "Service", "About", "Contact"];

return (
    <nav
      className={`sticky top-0 z-50 w-full shadow-md transition-colors duration-300 ${
        dark ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 text-2xl font-extrabold">
          <span className="text-3xl text-blue-600"></span>
          <span className="tracking-tight">
            Car<span className="text-blue-600">Store</span>
          </span>
        </a>

{/* Desktop Nav Links */}
        <ul className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <li key={link}>
              <a
                href={`#${link.toLowerCase()}`}
                className="transition-colors hover:text-blue-600"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>

{/* Right Actions */}
        <div className="flex items-center gap-3">
          <button
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </button>

<button
            className="relative rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Cart"
          >
            <FiShoppingCart size={20} />
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              2
            </span>
          </button>

<button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

<button
            onClick={() => setLang(lang === "EN" ? "KH" : "EN")}
            className="rounded-full border px-2.5 py-1 text-xs font-semibold transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            {lang}
          </button>

<button
            className="rounded-full p-2 transition hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

{/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`border-t px-6 pb-4 pt-2 md:hidden ${
            dark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-white"
          }`}
        >
          <ul className="flex flex-col gap-3 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className="block transition-colors hover:text-blue-600"
                  onClick={() => setMenuOpen(false)}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
