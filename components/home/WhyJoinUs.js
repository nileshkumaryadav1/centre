"use client";

import Link from "next/link";
import {
  Users,
  Rocket,
  Trophy,
  Brain,
  CalendarCheck,
} from "lucide-react";

const reasons = [
  {
    icon: Brain,
    title: "Learn by Doing",
    desc: "Hands-on projects, workshops, and real-world problem solving beyond classrooms.",
  },
  {
    icon: Users,
    title: "Strong Community",
    desc: "Be part of a motivated student-driven team that grows together.",
  },
  {
    icon: Rocket,
    title: "Opportunities & Exposure",
    desc: "Participate in fests, hackathons, events, and competitions across colleges.",
  },
  {
    icon: Trophy,
    title: "Leadership & Growth",
    desc: "Build leadership, communication, and team management skills early.",
  },
  {
    icon: CalendarCheck,
    title: "Active & Consistent",
    desc: "Regular events, clubs, and sessions keep learning exciting and continuous.",
  },
];

export default function WhyJoinUs() {
  return (
    <section className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 py-20">
      <div className="max-w-6xl mx-auto px-4 space-y-14">
        {/* ================= HEADER ================= */}
        <div className="text-center space-y-4">
          <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
            ✨ Why Join Centre?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            More than an organization — it’s a platform to learn, lead, and grow.
          </p>
        </div>

        {/* ================= REASONS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reasons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 text-center hover:shadow-xl transition"
              >
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
                  <Icon size={26} className="text-blue-600 dark:text-blue-300" />
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= CTA ================= */}
        <div className="text-center">
          <Link
            href="/join-us"
            className="inline-block px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Join the Community →
          </Link>
        </div>
      </div>
    </section>
  );
}
