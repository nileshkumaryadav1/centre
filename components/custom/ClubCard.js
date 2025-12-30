import React from "react";

function ClubCard({ title, description, points = [], joinLink }) {
  return (
    <div className="bg-white/70 dark:bg-gray-900/60 backdrop-blur rounded-2xl p-6 md:p-8 shadow flex flex-col justify-between hover:scale-[1.02] transition">

      {/* Header */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Points */}
      {points.length > 0 && (
        <ul className="mt-4 space-y-2 text-left">
          {points.map((point, index) => (
            <li
              key={index}
              className="text-gray-700 dark:text-gray-300 flex items-start gap-2"
            >
              <span className="text-green-600 dark:text-green-400">✔</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <div className="mt-6">
        <a
          href={joinLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full text-center px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Join Club
        </a>
      </div>
    </div>
  );
}

export default ClubCard;
