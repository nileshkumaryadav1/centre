"use client";

import EventCard from "@/components/custom/EventCard";
import { useState, useEffect } from "react";

export default function Events() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`/api/services`)
      .then((res) => res.json())
      .then((data) => {
        // Add CentreFest service to the fetched data
        const centreFestService = {
          id: "centrefest",
          title: "🎉 CentreFest 2025",
          description:
            "Join us for 3 days of fun, learning, and creativity featuring gaming, coding, cultural & literary events with exciting prizes!",
          imageUrl: "/ad/logo.png",
          link: "https://centrefest.vercel.app/",
        };
        setServices([centreFestService, ...data]);
      })
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // if (services.length === 0) {
  //   return (
  //     <div className="flex items-center justify-center h-screen">
  //       <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
  //     </div>
  //   );
  // }

return (
  <div className="md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center md:p-10 p-4">
    <div className="max-w-5xl w-full space-y-14">

      {/* Heading */}
      <div className="text-center space-y-4">
        <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
          Events
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          From workshops to flagship fests — experiences that matter.
        </p>
      </div>

      {/* Upcoming Events */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          🚀 Upcoming Events
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            title="🎉 CentreFest 2025"
            date="March 2025"
            description="A 3-day flagship fest with gaming, coding, cultural & literary events."
            actionLabel="Register Now"
            actionLink="https://centrefest.vercel.app/"
            highlight
          />

          <EventCard
            title="💻 Coding Bootcamp"
            date="Coming Soon"
            description="Hands-on sessions to strengthen problem-solving and development skills."
            actionLabel="Notify Me"
            actionLink="#"
          />
        </div>
      </section>

      {/* Past Events */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          🕒 Past Events
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <EventCard
            title="⚙️ Git & GitHub Workshop"
            date="Jan 2025"
            description="An introductory workshop on version control and collaboration."
            actionLabel="View Recap"
            actionLink="#"
            past
          />

          <EventCard
            title="🚀 Startup Ideathon"
            date="Dec 2024"
            description="Students pitched ideas and received mentorship from seniors."
            actionLabel="View Recap"
            actionLink="#"
            past
          />
        </div>
      </section>
    </div>
  </div>
);
}