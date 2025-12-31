import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WhatWeDo() {
  const services = [
    {
      title: "🎉 CentreFest",
      desc: "Our flagship annual festival — celebrating music, art, technology, and culture.",
      link: "https://centrefest.vercel.app",
      btnText: "Visit CentreFest",
      image: "/ad/logo.png",
      highlight: true,
    },
    {
      title: "💻 Skill Clubs",
      desc: "Join our diverse skill clubs and unlock your potential.",
      link: "https://centreorg.vercel.app/clubs",
      btnText: "Explore Clubs",
      image: "/logo.png",
      highlight: true,
    },
    {
      title: "🚀 Competitions & Tours",
      desc: "Experience the thrill of competitions and tours.",
      link: "https://photos.app.goo.gl/CAhAzzTi7YtzQZsr5",
      btnText: "Google Photos",
      image: "/logo.png",
      highlight: true,
    },
    {
      title: "🎤 Seminars & Talks",
      desc: "Gain insights from industry leaders and experts.",
      link: "https://chat.whatsapp.com/JSrqwbsqGz3BnB7zUNrfOE",
      btnText: "Join Now",
      image: "/logo.png",
      highlight: true,
    },
  ];
  return (
    <section className="text-center p-4 flex flex-col items-center min-h-screen justify-center">
      <div className="text-center space-y-4">
        <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
          What We Do?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          We provide top-notch services to help you achieve your goals.
        </p>
      </div>

      {/* Services Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            className={`p-4 sm:p-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 ${
              service.highlight
                ? "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 text-white"
                : "bg-white dark:bg-gray-800"
            }`}
          >
            {/* Special Image for Highlighted Service */}
            {service.highlight && service.image && (
              <div className="flex justify-center mb-4">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={80}
                  height={80}
                  className="rounded-full shadow-lg"
                />
              </div>
            )}

            {/* Title */}
            <h3
              className={`text-lg sm:text-xl font-bold ${
                service.highlight
                  ? "text-white"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {service.title}
            </h3>

            {/* Description */}
            <p
              className={`mt-2 text-sm sm:text-base ${
                service.highlight
                  ? "text-white/90"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {service.desc}
            </p>

            {/* Button */}
            {service.link && (
              <a
                href={service.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-4 block px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm font-semibold text-center shadow-lg transition duration-300 ease-in-out ${
                  service.highlight
                    ? "bg-black/40 hover:bg-black/50 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                {service.btnText}
              </a>
            )}
          </div>
        ))}
      </div>
      {/* Explore Services Button */}
      <div className="mt-10 flex justify-center">
        <Link
          href="/clubs"
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Explore Clubs →
        </Link>
      </div>
    </section>
  );
}
