"use client";

import { motion } from "framer-motion";

// Careers Page
export default function Careers() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 dark:from-gray-900 dark:to-gray-700 text-gray-900 dark:text-white p-8 flex flex-col items-center">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <h2 className="text-5xl font-extrabold tracking-wide">Join Centre ☠️</h2>
        <p className="mt-4 text-xl text-gray-800 dark:text-gray-300">Shape the future with us. 🚀</p>
      </motion.header>

      {/* Why Join Us Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-10 max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3"
      >
        <h3 className="text-3xl font-semibold text-center mb-4">Why Centre? 💡</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Centre Private Limited is an innovation hub where passion meets creativity. We thrive in fields like
          photography 📸, videography 🎥, event management 🎉, esports 🎮, and more.
        </p>
      </motion.section>

      {/* Open Positions Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="mt-10 max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3"
      >
        <h3 className="text-3xl font-semibold text-center mb-4">Open Positions 🚀</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg text-gray-700 dark:text-gray-300">
          <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">🎬 <strong>Videographer</strong> – Capture and edit stunning visuals.</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">📷 <strong>Photographer</strong> – Freeze moments with creativity.</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">🎨 <strong>Graphic Designer</strong> – Bring ideas to life with visuals.</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">💻 <strong>Web Developer</strong> – Build innovative digital experiences.</li>
          <li className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">🎮 <strong>Gaming Team Member</strong> – Compete in esports & hackathons.</li>
        </ul>
      </motion.section>

      {/* How to Apply Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.9 }}
        className="mt-10 max-w-4xl bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl w-full md:w-3/4 lg:w-2/3"
      >
        <h3 className="text-3xl font-semibold text-center mb-4">How to Apply 📩</h3>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center leading-relaxed">
          If you&apos;re passionate about tech, creativity, or gaming, we&apos;d love to hear from you!
          Send your details to <strong className="text-blue-600 dark:text-blue-400">careers@centrepl.com</strong> or connect with us on our community platforms.
        </p>
      </motion.section>
    </div>
  );
}
