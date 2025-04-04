"use client";

import {Merienda, Unbounded, Audiowide} from "next/font/google";

import { ThreeDCardDemo } from "@/components/custom/3d-card";
import MovingBG from "@/components/custom/MovingBG";
import WorldMapCard from "@/components/custom/WorldMapCard";
import Link from "next/link";
import { useState, useEffect } from "react";
import MembersPage from "./(route)/(visible)/members/page";
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import Blogs from "./(route)/(visible)/blog/page";
import About from "./(route)/(visible)/about/page";
import { BackgroundBeam } from "@/components/custom/BackgroundBeam";

const merienda = Merienda({ weight: "400", subsets: ["latin"] });
const unbounded = Unbounded({ weight: "400", subsets: ["latin"] });
const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Home() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 `}>
      <main className="md:p-10 p-3 text-center">
        {/* <MovingBG /> */}
        <h2 className={`md:text-4xl text-xl font-extrabold text-gray-900 dark:text-white ${audiowide.className}`}>
          🌟 Empowering Creativity & Community
        </h2>

        <p className={`text-md text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-4 font-medium ${merienda.className}`}>
          Providing free photography, video production, and digital services for all 
          <span className="font-bold text-blue-600"> CENTRE☠️ </span> members by 
          <span className="font-bold text-blue-600"> CENTRE☠️ </span> members.
        </p>

        {/* <div className="flex justify-center mt-6">
          <Link
            href={"/services"}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out rounded-lg text-white font-semibold shadow-md transform hover:scale-105"
          >
            Explore Services
          </Link>
        </div> */}

        {/* Services Grid */}
        <div className="md:mt-12 mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              title: "📸 Photography & Video",
              desc: "Professional photography & creative video production.",
              // link: "https://t.me/yourchannel",
              btnText: "Telegram Channel",
            },
            {
              title: "🖼️ Google Photos Upload",
              desc: "Access high-quality images from our public albums.",
              // link: "https://photos.google.com/youralbum",
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
              // link: "https://chat.whatsapp.com/yourgroup",
              btnText: "WhatsApp Group",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {service.desc}
              </p>
              <a
                href={service.link}
                target="_blank"
                className="mt-4 block bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg"
              >
                {service.btnText}
              </a>
            </div>
          ))}
        </div>

        {/* 3D Services Section */}
        <div className="md:mt-12 mt-6">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-40">
              {Array.from({ length: 2 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : (
            <ThreeDCardDemo services={services} />
          )}
        </div>

        {/* Explore More Services Button */}
        <div className="mt-6">
          <Link
            href="/services"
            className="bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white px-6 py-3 rounded-lg font-semibold shadow-md transform hover:scale-105"
          >
            Explore All Services
          </Link>
        </div>

        {/* members section */}
        <div className="mt-12">
          <MembersPage />
        </div>

        {/* Blogs Section */}
        <div className="mt-12">
          <Blogs />
        </div>

        {/* about us section */}
        <div className="mt-12">
          <About />
        </div>

        {/* World Map Section */}
        <div className="mt-12">
          {/* <WorldMapCard /> */}
        </div>
      </main>
    </div>
  );
}
