"use client";

import { AlignJustify } from "lucide-react";
import { Merienda, Unbounded, Audiowide } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const merienda = Merienda({ weight: "400", subsets: ["latin"] });
const unbounded = Unbounded({ weight: "400", subsets: ["latin"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Hero() {
  return (
    <div className="px-4 sm:px-6 md:px-12 md:py-8">
      {/* Heading */}
      <h2
        className={`text-xl sm:text-2xl md:text-4xl text-center font-extrabold text-gray-900 dark:text-white ${audiowide.className} pt-5`}
      >
        🌟 Empowering Creativity & Community
      </h2>

      {/* Gradient Text Block */}
      <div className="relative mx-auto flex justify-center w-full md:mt-4">
        <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 md:py-4 pt-2 w-full max-w-xl text-center px-2 sm:px-4">
          <span className={`${merienda.className} text-sm sm:text-base`}>
            Providing free photography, video production, and digital services
            for all{" "}
            <span className="font-bold text-blue-600"> CENTRE☠️ </span> members
            by
            <span className="font-bold text-blue-600"> CENTRE☠️ </span>{" "}
            members.
          </span>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        {[
          {
            title: "📸 Photography & Video",
            desc: "Professional photography & creative video production.",
            link: "https://instagram.com/centre_kec1",
            btnText: "Instagram Page",
          },
          {
            title: "🖼️ Google Photos Upload",
            desc: "Access high-quality images from our public albums.",
            link: "",
            btnText: "Google Photos",
          },
          {
            title: "🎥 YouTube Videos",
            desc: "Watch creative content from our YouTube channel.",
            link: "https://youtube.com/@CentreKEC",
            btnText: "YouTube Videos",
          },
          {
            title: "🌍 Community Channels",
            desc: "Join our Telegram, WhatsApp, and YouTube for updates.",
            link: "",
            btnText: "WhatsApp Group",
          },
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
          >
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
              {service.title}
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              {service.desc}
            </p>
            {service.link && (
              <a
                href={service.link}
                target="_blank"
                className="mt-4 block bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg text-sm font-semibold shadow-lg text-center"
              >
                {service.btnText}
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Explore Services Button */}
      <div className="mt-8 flex justify-center">
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
