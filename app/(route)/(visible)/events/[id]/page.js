"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

async function getEvents(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/events/${id}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.statusText}`);
  }

  return res.json();
}

export default function EventDetailPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEvent(id)
      .then((data) => setEvent(data))
      .catch((err) => {
        console.error("Error fetching event:", err);
        setError("Failed to load event details. Please try again later.");
      });
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center md:min-h-screen p-5">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex justify-center items-center p-3">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-xl p-3">
        <h1 className="text-xl font-serif font-bold text-gray-900 mb-1 text-center">
          {event.title}
        </h1>

        <img
          src={event.imageUrl}
          alt={`Image for ${event.title}`}
          className="mb-4 rounded-lg w-1/3 mx-auto"
        />

        <p className="text-gray-800 text-lg leading-relaxed border-l-4 border-blue-500 pl-4 italic">
          {event.description}
        </p>

        <div className="mt-5 mb-3 border-t pt-2 flex justify-center items-center text-gray-600 text-sm">
          <a
            href={event.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-blue-600 hover:text-blue-800 border px-2 py-1 md:px-4 md:py-2 border-blue-600 hover:bg-blue-600 hover:text-white rounded-md transition-colors duration-300 ease-in-out"
          >
            Join Now
          </a>
        </div>
      </div>
    </div>
  );
}
