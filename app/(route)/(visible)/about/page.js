"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function About() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-white p-6 flex flex-col items-center">
      {/* Header Section */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold mb-2">Centre☠️ Private Limited</h1>
        <p className="text-lg opacity-90">
          🚀 A <strong>student-led, non-profit</strong> tech squad 🤝
        </p>
      </motion.header>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Who We Are 🤖</h2>
        <p className="text-lg leading-relaxed">
          <span className="font-bold">Centre Private Limited</span> is a <strong>17-member student-led tech family</strong> focused on making everyday life easier with
          <i> photography 📸, videography 🎥, and event management 🎉</i>. We are
          a <i>non-profit</i> group, working exclusively for our <strong>17 members</strong>.
        </p>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-8 max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3"
      >
        <h2 className="text-3xl font-bold text-center mb-4">What We Do 💡</h2>
        <ul className="list-disc space-y-4 text-lg pl-6">
          <li>📷 <strong>Photography & Videography</strong> – Covering events, birthdays, and college functions.</li>
          <li>🎉 <strong>Event & Tour Planning</strong> – Making your moments unforgettable.</li>
          <li>📂 <strong>Google Photos Uploads</strong> – Securely storing digital memories.</li>
          <li>📲 <strong>Community Spaces</strong> – Stay connected via Telegram, WhatsApp, and Instagram.</li>
        </ul>
      </motion.section>

      {/* Gaming & Hackathon Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-8 max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Gaming & Hackathons 🎮</h2>
        <p className="text-lg">
          We are making our *college debut* in gaming and hackathons under our new team name, <strong>Centre</strong> 🎮💻.
          Passionate about tech and competition, we push our limits in innovation, coding, and esports.
        </p>
      </motion.section> 

      {/* Vision Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="mt-8 max-w-3xl bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3"
      >
        <h2 className="text-3xl font-bold text-center mb-4">Our Vision 🌟</h2>
        <p className="text-lg">
          Our goal is to <i>support, empower, and innovate</i>. Centre Private Limited is not just a group—it&apos;s a
          <strong>family of creators</strong>, building tech-driven solutions while having fun. 🎉
        </p>
      </motion.section>
    </div>
  );
}