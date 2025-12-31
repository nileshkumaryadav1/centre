"use client";

import ClubCard from "@/components/custom/ClubCard";
import { useState, useEffect } from "react";

export default function Clubs() {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    fetch(`/api/clubs`)
      .then((res) => res.json())
      .then((data) => {
        setClubs(data);
      })
      .catch((err) => console.error("Error fetching clubs:", err));
  }, []);

  return (
    <div className="md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center md:p-10 p-4">
      <div className="max-w-5xl w-full space-y-12">
        {/* Heading */}
        <div className="text-center space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            Our Clubs
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Learn by doing. Build skills through real projects and
            collaboration.
          </p>
        </div>

        {/* Page Intro */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow text-center">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Our clubs are designed to help students grow through practice, not
            theory. Whether you&apos;re a beginner or experienced, each club
            offers hands-on sessions, mentorship, and opportunities to explore
            your interests deeply.
          </p>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ClubCard
            title="💻 Coding Club"
            description="Learn programming through weekly sessions and monthly mini-projects."
            points={[
              "Weekly hands-on coding sessions",
              "Monthly mini-projects",
              "Open to all skill levels",
            ]}
            joinLink="#"
          />

          <ClubCard
            title="🚀 Startup Club"
            description="Explore ideas, entrepreneurship, and problem-solving."
            points={[
              "Idea discussions & brainstorming",
              "Pitch sessions",
              "Guest talks by founders",
            ]}
            joinLink="#"
          />

          <ClubCard
            title="🎨 Design & Media Club"
            description="Create visuals, videos, and media for events and branding."
            points={[
              "Graphic design & UI basics",
              "Photography & videography",
              "Social media & branding work",
            ]}
            joinLink="#"
          />
        </div>

        {/* How to Join */}
        <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow text-center">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            How to Join a Club
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Each club has its own joining form. Click on{" "}
            <strong>“Join Club”</strong> and fill out the form — our team will
            reach out to you soon.
          </p>
        </div>
      </div>
    </div>
  );
}
