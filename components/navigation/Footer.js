"use client";
import React, { useState, useEffect } from "react";

import { Ubuntu, Unbounded } from "next/font/google";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaTelegram,
  FaApple,
  FaGooglePlay,
  FaAndroid,
  FaMobile,
} from "react-icons/fa";

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
    <footer className={`bg-gray-900 text-gray-300 py-8 ${unbounded.className}`}>
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center md:flex-row flex-col gap-2">
          {/* Brand Info */}
          <div className="md:max-w-2/5">
            <h4 className="text-xl font-semibold text-white text-center">
              CENTRE☠️
            </h4>
            <p className="my-2 text-gray-400 md:w-6/7 text-center">
              We are a company dedicated to providing top-quality services to
              CENTRE☠️ members for a better memorable Life and brighter future.
            </p>
          </div>

          <div className="flex md:flex-row gap-8 md:w-2/5 md:w-auto flex justify-around">
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold text-white">Quick Links</h5>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link href="/" className="hover:text-blue-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-blue-400 transition">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services"
                    className="hover:text-blue-400 transition"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/career"
                    className="hover:text-blue-400 transition"
                  >
                    Career
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-400 transition"
                  >
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Some Links to official sites */}
            <div>
              <h5 className="text-lg font-semibold text-white">
                Important Links
              </h5>
              <ul className="mt-2 space-y-1 w-full">
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
                    href="https://gate2025.iitr.ac.in/"
                    target="_blank"
                    className="hover:text-blue-400 transition"
                  >
                    GATE 2025
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="md:mt-4 md:mt-0 md:w-1/5 flex flex-col items-center md:items-end justify-end">
            <h5 className="text-lg font-semibold text-white">Follow Us</h5>
            <div className="mt-3 flex space-x-4">
              <a
                href="https://www.youtube.com/@CentreKEC"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
              >
                <FaYoutube />
              </a>
              <a className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaWhatsapp />
              </a>
              <a className="text-gray-400 hover:text-blue-400 transition text-2xl">
                <FaTelegram />
              </a>
              <a
                href="https://www.instagram.com/centre_kec1/"
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition text-2xl"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* App Download */}
        <div className="md:mt-8 mt-3 border-t border-gray-700 pt-4 space-y-4 text-center">
          <h5 className="text-lg font-semibold text-white">Download Our App</h5>
          {items.map((item) => (
            <div
              className="flex items-center justify-center space-x-4"
              key={item._id}
            >
              <a
                href={item.link}
                target="_blank"
                className="text-gray-400 hover:text-blue-400 transition border rounded p-2 text-2xl flex"
              >
                {/* <FaMobile /> */}
                <p className="text-sm">{item.name}</p>
              </a>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:mt-8 mt-3 border-t border-gray-700 pt-4 space-y-4">
          <div>
            <img
              src="/logo.jpg"
              alt="Centre Organization"
              className="w-12 h-12 rounded-full mx-auto"
            />
          </div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} CENTRE☠️. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
