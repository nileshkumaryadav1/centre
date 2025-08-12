"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function PopUpForCentreFest() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Always show on refresh
    const timer = setTimeout(() => setShow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={() => setShow(false)}
    >
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl p-6 max-w-md w-[90%] relative shadow-lg animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          onClick={() => setShow(false)}
        >
          ✖
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <Image
            src="/ad/logo.png"
            alt="CentreFest Logo"
            width={80}
            height={80}
            className="rounded-full shadow"
          />
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold text-center">
          🎉 CentreFest&apos;25
        </h2>

        {/* Bullet Points */}
        <ul className="mt-4 text-sm text-gray-700 dark:text-gray-300 list-disc list-inside space-y-1">
          <li>🔥 3 Days of Fun, Learning & Creativity</li>
          <li>🎮 Gaming, Coding, Cultural & Literary Events</li>
          <li>🏆 Exciting Prizes & Certificates</li>
          <li>🤝 Network with like-minded peers</li>
        </ul>

        {/* CTA Button */}
        <Link
          href="https://centrefest.vercel.app/"
          target="_blank"
          className="block mt-6 w-full bg-blue-600 text-white text-center py-2 rounded-lg font-semibold hover:opacity-90 transition"
        >
          Visit CentreFest Website →
        </Link>
      </div>

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
