"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Ubuntu, Unbounded } from "next/font/google";
import { FaInstagram, FaWhatsapp, FaYoutube, FaTelegram } from "react-icons/fa";

const ubuntu = Ubuntu({ subsets: ["latin"], weight: ["400", "700"] });
const unbounded = Unbounded({ subsets: ["latin"], weight: ["400", "700"] });

const Footer = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/name-link")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <footer className={`bg-gradient-to-br from-gray-100 to-gray-200`}>
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 gap-4">
          {/* Brand */}
          <div className="md:col-span-2 text-center md:text-left">
            <h4 className="text-2xl font-bold ">CENTRE</h4>
            <p className="mt-3 text-gray-700 max-w-md mx-auto md:mx-0">
              A student-led organization dedicated to learning, innovation,
              events, and building a brighter future together.
            </p>
          </div>

          <div className="flex justify-between md:">
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2">
                {[
                  ["Home", "/"],
                  ["Events", "/events"],
                  ["Clubs", "/clubs"],
                  ["Join Us", "/join-us"],
                  ["Blog", "/blog"],
                  ["Members", "/members"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="hover:text-blue-400 transition"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Important Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3">Important Links</h5>
              <ul className="space-y-2">
                <li>
                  <a
                    href="http://www.beu-bih.ac.in/"
                    target="_blank"
                    className="hover:text-blue-400 transition"
                  >
                    BEU Patna
                  </a>
                </li>
                <li>
                  <a
                    href="http://keck.ac.in/"
                    target="_blank"
                    className="hover:text-blue-400 transition"
                  >
                    KEC Katihar
                  </a>
                </li>
                <li>
                  <a
                    href="https://gate2026.iitg.ac.in/"
                    target="_blank"
                    className="hover:text-blue-400 transition"
                  >
                    GATE 2026
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* ================= SOCIAL ================= */}
        <div className="md:mt-10 mt-5 flex flex-col items-center gap-4">
          <h5 className="text-lg font-semibold ">Follow Us</h5>
          <div className="flex gap-6 text-2xl">
            <a
              href="https://www.youtube.com/@CentreOrganization"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaYoutube />
            </a>
            <a className="hover:text-blue-400 transition">
              <FaWhatsapp />
            </a>
            <a className="hover:text-blue-400 transition">
              <FaTelegram />
            </a>
            <a
              href="https://www.instagram.com/CentreOrganization/"
              target="_blank"
              className="hover:text-blue-400 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* ================= APP LINKS ================= */}
        {items.length > 0 && (
          <div className="md:mt-10 mt-5 border-t border-gray-700 pt-6 text-center">
            <h5 className="text-lg font-semibold mb-4">Download Our App</h5>
            <div className="flex flex-wrap justify-center gap-4">
              {items.map((item) => (
                <a
                  key={item._id}
                  href={item.link}
                  target="_blank"
                  className="px-4 py-2 border border-gray-600 rounded-lg hover:border-blue-400 hover:text-blue-400 transition text-sm"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ================= COPYRIGHT ================= */}
        <div className="md:mt-10 mt-5 border-t border-gray-700 pt-6 text-center mb-10 md:mb-1">
          <img
            src="/logo.jpg"
            alt="Centre Organization"
            className="w-12 h-12 rounded-full mx-auto mb-3"
          />
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} CENTRE. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
