"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ThreeDCardDemo } from "@/components/custom/3d-card";
import EventCard from "../custom/EventCard";

export default function UpcomingRecentEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        const centreFest = {
          id: "centrefest",
          title: "🎉 CentreFest 2025",
          description:
            "3 days of gaming, coding, cultural & literary events with exciting prizes.",
          imageUrl: "/ad/logo.png",
          link: "https://centrefest.vercel.app/",
          type: "upcoming",
        };

        // Take only a few for home showcase
        const limited = data.slice(0, 3).map((item) => ({
          ...item,
          type: "recent",
        }));

        setEvents([centreFest, ...limited]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            Upcoming / Recent Events
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            From flagship fests to skill-building workshops — experience
            learning beyond classrooms.
          </p>
        </div>

        {/* ================= CARDS ================= */}
        <div className="flex justify-center gap-6">
          <EventCard
            title="🎉 CentreFest 2025"
            date="March 2025"
            description="A 3-day flagship fest with gaming, coding, cultural & literary events."
            actionLabel="Register Now"
            actionLink="https://centrefest.vercel.app/"
            highlight
          />

          <EventCard
            title="⚙️ Git & GitHub Workshop"
            date="Jan 2025"
            description="An introductory workshop on version control and collaboration."
            actionLabel="View Recap"
            actionLink="#"
            past
          />
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center pt-6">
          <Link
            href="/events"
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            View All Events →
          </Link>
        </div>
      </div>
    </section>
  );
}
