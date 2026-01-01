"use client";

import { Plaster, Unbounded } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const unbounded = Unbounded({ weight: "400", subsets: ["latin"] });
const plaster = Plaster({ weight: "400", subsets: ["latin"] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-16 transition-all duration-300
        ${
          scrolled
            ? "backdrop-blur-md bg-white/80 shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 h-full flex items-center justify-between ${unbounded.className}`}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.jpg"
              alt="Centre Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-2xl font-extrabold text-sky-500 tracking-wide">
              Centre
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about-us">About Us</NavLink>
            <NavLink href="/events">Events</NavLink>
            <NavLink href="/clubs">Clubs</NavLink>
            <NavLink href="/join-us">Join Us</NavLink>
            <NavLink href="/contact">Contact</NavLink>
            <NavLink href="/blog">Blog</NavLink>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-black/5 transition"
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={26} />
          </button>
        </div>
      </nav>

      {/* ================= Mobile Drawer ================= */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300
        ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-full w-72 bg-white shadow-xl
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-5 border-b">
            <span className="text-xl font-bold">CENTRE</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={22} />
            </button>
          </div>

          <div className="flex flex-col px-3 py-4 gap-1">
            <NavItemMobile href="/" label="Home" close={() => setIsOpen(false)} />
            <NavItemMobile href="/about-us" label="About Us" close={() => setIsOpen(false)} />
            <NavItemMobile href="/events" label="Events" close={() => setIsOpen(false)} />
            <NavItemMobile href="/clubs" label="Clubs" close={() => setIsOpen(false)} />
            <NavItemMobile href="/join-us" label="Join Us" close={() => setIsOpen(false)} />
            <NavItemMobile href="/contact" label="Contact" close={() => setIsOpen(false)} />
            <NavItemMobile href="/blog" label="Blog" close={() => setIsOpen(false)} />
          </div>
        </div>
      </div>
    </>
  );
}

/* ================= Desktop Link ================= */

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition
      ${
        isActive
          ? "text-white bg-blue-600"
          : "text-gray-800 hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
}

/* ================= Mobile Link ================= */

function NavItemMobile({ href, label, close }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={close}
      className={`px-4 py-3 rounded-lg text-base transition
      ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-gray-800 hover:bg-gray-100"
      }`}
    >
      {label}
    </Link>
  );
}
