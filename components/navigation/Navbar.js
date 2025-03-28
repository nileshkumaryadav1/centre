"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, User, Menu, X, Building2, PenBox } from "lucide-react";
import { FaCalendar, FaMoneyBill } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 h-16 transition-all ${
        scrolled ? "md:backdrop-blur-md md:bg-white/30 md:shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Image
          src="/logo.jpg"
          alt="Logo"
          width={50}
          height={50}
          className="w-10 h-10 rounded-full"
        />
        <Link
          href="/"
          className="text-2xl font-bold text-black [text-shadow:_0_4px_8px_rgba(14_165_223_/_0.5)] text-sky-400 leading-snug font-manrope font-extrabold"
        >
          CENTRE☠️
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/blog">Blog</NavLink>
          <NavLink href="/career">Career</NavLink>
          <NavLink href="/calender">Birthday Calender</NavLink>
          <NavLink href="/about">About</NavLink>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-black" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden p-4">
          {/*  Hamburger Mobile Menu (Slide-in)  */}
          <div
            className={`fixed top-0 left-0 w-64 h-full bg-gray-800 shadow-lg transform transition-transform duration-300 sm:hidden ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="flex justify-between items-center p-4 bg-gray-900">
              {/* Logo */}
              <Link
                href="/"
                className="text-black text-blue-500 leading-snug font-manrope font-extrabold flex items-center"
              >
                <p className="text-gray-200 text-xl font-bold">CENTRE☠️</p>
              </Link>

              {/* Close Button */}
              <button onClick={closeMenu} className="text-white">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col px-6">
              <NavItemMobile href="/" icon={<Home size={24} />} label="Home" closeMenu={closeMenu} active={pathname === "/"} />
              <NavItemMobile href="/services" icon={<Building2 size={24} />} label="Services" closeMenu={closeMenu} active={pathname === "/services"} />
              <NavItemMobile href="/blog" icon={<PenBox size={24} />} label="Blog" closeMenu={closeMenu} active={pathname === "/blog"} />
              <NavItemMobile href="/career" icon={<FaMoneyBill size={24} />} label="Career" closeMenu={closeMenu} active={pathname === "/career"} />
              <NavItemMobile href="/calender" icon={<FaCalendar size={24} />} label="Birthday Calender" closeMenu={closeMenu} active={pathname === "/calender"} />
              <NavItemMobile href="/about" icon={<User size={24} />} label="About" closeMenu={closeMenu} active={pathname === "/about"} />
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
      className={`text-lg px-4 px-2 py-1 transition ${
        isActive ? "text-white hover:text-black font-semibold bg-blue-300 rounded-full" : "text-black hover:text-blue-600"
      }`}
    >
      {children}
    </Link>
  );
}

// Mobile NavItem
const NavItemMobile = ({ href, icon, label, active, closeMenu }) => {
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 p-3 text-lg rounded-lg ${
        active ? "text-blue-400 bg-gray-700" : "text-gray-300 hover:text-white"
      }`}
      onClick={closeMenu}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};
