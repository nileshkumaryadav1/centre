"use client";

import { Merienda, Audiowide } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const merienda = Merienda({ weight: "400", subsets: ["latin"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  const services = [
    {
      title: "🎉 CentreFest 2025",
      desc: "Our flagship annual festival — celebrating music, art, technology, and culture.",
      link: "https://centrefest.vercel.app",
      btnText: "Visit CentreFest",
      image: "/ad/logo.png",
      highlight: true,
    },
    {
      title: "📸 Photography & Videography",
      desc: "Capture your moments with professional-grade photos and cinematic videos.",
      link: "https://instagram.com/CentreOrganization",
      btnText: "View Instagram",
      image: "/logo.png",
      highlight: true,
    },
    {
      title: "🖼️ Public Photo Library",
      desc: "Access our curated high-resolution photo albums anytime.",
      link: "https://photos.app.goo.gl/CAhAzzTi7YtzQZsr5",
      btnText: "Google Photos",
      image: "/logo.png",
      highlight: true,
    },
    {
      title: "🎥 Creative YouTube Channel",
      desc: "Explore inspiring videos and event highlights from our media team.",
      link: "https://youtube.com/@CentreOrganization",
      image: "/youtube_logo.png",
      btnText: "Watch on YouTube",
      highlight: true,
    },
    {
      title: "📱 WhatsApp Community",
      desc: "Stay updated and connect with our community instantly.",
      link: "https://chat.whatsapp.com/JSrqwbsqGz3BnB7zUNrfOE",
      btnText: "Join Now",
      image: "/logo.png",
      highlight: true,
    },
  ];

  return (
    <div className="px-4 sm:px-6 md:px-12 md:py-8">
      {/* Heading */}
      <h2
        className={`text-xl sm:text-2xl md:text-4xl text-center font-extrabold text-gray-900 dark:text-white ${audiowide.className} pt-5`}
      >
        🌟 Empowering Creativity & Community
      </h2>

      {/* Gradient Tagline */}
      <div className="relative mx-auto flex justify-center w-full md:mt-4">
        <div className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 md:py-4 pt-2 w-full max-w-xl text-center px-2 sm:px-4">
          <p className={`${merienda.className} text-sm sm:text-base`}>
            Free creative and digital services for all{" "}
            <span className="font-bold text-blue-600">CENTRE☠️</span> members —
            by the <span className="font-bold text-blue-600">CENTRE☠️</span>{" "}
            community.
          </p>
        </div>
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
          href="/services"
          className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg font-semibold shadow-md transform hover:scale-105 text-sm sm:text-base"
        >
          Explore All Services
        </Link>
      </div>
    </div>
  );
}
