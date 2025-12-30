"use client";

import { Plaster, Unbounded } from "next/font/google";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Users, Menu, X, PenBox } from "lucide-react";
import Image from "next/image";

const unbounded = Unbounded({ weight: "400", subsets: ["latin"] });
const plaster = Plaster({ weight: "400", subsets: ["latin"] });

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-16 transition-all ${
        scrolled
          ? "md:backdrop-blur-md md:bg-white/70 md:shadow-md"
          : "bg-transparent"
      }`}
    >
      <div
        className={`max-w-7xl mx-auto px-6 h-full flex items-center justify-between ${unbounded.className}`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Centre Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
          </Link>

          <Link
            href="/"
            className="text-2xl font-extrabold text-sky-500 tracking-wide"
          >
            CENTRE
          </Link>
        </div>

        {/* Desktop Menu (REAL SOURCE) */}
        <div className="hidden md:flex items-center gap-2">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about-us">About Us</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/clubs">Clubs</NavLink>
          <NavLink href="/join-us">Join Us</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/blog">Blog</NavLink>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <p className="text-xl font-bold">CENTRE</p>
              <button onClick={() => setIsOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col p-4 space-y-1">
              <NavItemMobile href="/" label="Home" />
              <NavItemMobile href="/about-us" label="About Us" />
              <NavItemMobile href="/events" label="Events" />
              <NavItemMobile href="/clubs" label="Clubs" />
              <NavItemMobile href="/join-us" label="Join Us" />
              <NavItemMobile href="/contact" label="Contact" />
              <NavItemMobile href="/blog" label="Blog" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-black hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
}

function NavItemMobile({ href, label }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-lg text-base ${
        isActive
          ? "bg-blue-600 text-white"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}
