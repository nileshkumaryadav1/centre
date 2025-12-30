"use client";

import Link from "next/link";
import { ArrowRight, Users, Calendar } from "lucide-react";

export default function CallToAction() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-20">
      {/* Decorative blur */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative max-w-5xl mx-auto px-4 text-center space-y-8">
        {/* ================= HEADLINE ================= */}
        <h2 className="md:text-4xl text-3xl font-extrabold text-white">
          Ready to Build, Learn & Lead?
        </h2>

        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
          Join a student-driven community that believes in action, creativity,
          and real growth beyond classrooms.
        </p>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/join-us"
            className="flex items-center gap-2 px-8 py-4 rounded-full bg-white text-blue-700 font-semibold hover:bg-gray-100 transition"
          >
            Join Centre
            <ArrowRight size={18} />
          </Link>

          <Link
            href="/events"
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition"
          >
            Explore Events
            <Calendar size={18} />
          </Link>
        </div>

        {/* ================= MICRO TRUST TEXT ================= */}
        <p className="text-sm text-blue-200 pt-2">
          Open for all motivated students • No prior experience needed
        </p>
      </div>
    </section>
  );
}
