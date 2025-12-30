import React from "react";

function EventCard({
  title,
  date,
  description,
  actionLabel,
  actionLink,
  highlight = false,
  past = false,
}) {
  return (
    <div
      className={`relative rounded-2xl p-6 md:p-8 shadow backdrop-blur bg-white/70 dark:bg-gray-900/60 flex flex-col justify-between transition hover:scale-[1.02]
        ${
          highlight
            ? "border-2 border-blue-600"
            : "border border-gray-200 dark:border-gray-700"
        }
        ${past ? "opacity-80" : ""}
      `}
    >
      {/* Highlight Badge */}
      {highlight && (
        <span className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
          Featured
        </span>
      )}

      {/* Content */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h3>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          📅 {date}
        </p>

        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {description}
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-block w-full text-center px-5 py-3 rounded-xl font-semibold transition
            ${
              past
                ? "border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {actionLabel}
        </a>
      </div>
    </div>
  );
}

export default EventCard;
