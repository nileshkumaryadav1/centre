"use client";

import Link from "next/link";
import { Code, Rocket, Palette, Camera } from "lucide-react";

const clubs = [
  {
    id: "coding",
    title: "💻 Coding Club",
    description:
      "Learn by building. Weekly sessions, problem solving & mini projects.",
    icon: Code,
    highlights: ["DSA", "Web Dev", "Projects"],
  },
  {
    id: "startup",
    title: "🚀 Startup Club",
    description:
      "Turn ideas into reality. Pitching, ideation & founder mindset.",
    icon: Rocket,
    highlights: ["Ideation", "Pitching", "Execution"],
  },
  {
    id: "design",
    title: "🎨 Design & Media Club",
    description: "Design, branding, photography & content creation.",
    icon: Palette,
    highlights: ["UI/UX", "Branding", "Media"],
  },
  {
    id: "media",
    title: "📸 Media & Coverage",
    description: "Capture moments. Event coverage, reels & storytelling.",
    icon: Camera,
    highlights: ["Photography", "Video", "Editing"],
  },
];

export default function ClubsSnapshot() {
  return (
    <section className=" bg-gradient-to-br from-gray-100 to-gray-200  dark:bg-gray-900 py-16">
      <div className="max-w-6xl mx-auto px-4 space-y-12">
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            🧠 Our Clubs
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn by doing. Our clubs focus on practical skills, teamwork and
            real growth.
          </p>
        </div>

        {/* ================= CLUB CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {clubs.map((club) => {
            const Icon = club.icon;
            return (
              <div
                key={club.id}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 hover:shadow-xl transition"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 mb-4 mx-auto">
                  <Icon
                    className="text-blue-600 dark:text-blue-300"
                    size={24}
                  />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white text-center">
                  {club.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 text-center mt-2">
                  {club.description}
                </p>

                <div className="flex flex-wrap justify-center gap-2 mt-4">
                  {club.highlights.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <Link
            href="/clubs"
            className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Explore All Clubs →
          </Link>
        </div>
      </div>
    </section>
  );
}
