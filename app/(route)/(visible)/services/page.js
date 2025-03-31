"use client";

import { ThreeDCardDemo } from "@/components/custom/3d-card";
import { useState, useEffect } from "react";

export default function Services() {
  const [services, setServices] = useState([]);
  
  useEffect(() => {
    fetch(`/api/services`)
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  if (services.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center md:p-10 p-3">
      <div className="max-w-4xl w-full text-center md:space-y-6">
        <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
          🚀 Our Services
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          We provide top-notch services to help you achieve your goals.
        </p>

        <div>
          <ThreeDCardDemo services={services} />
        </div>
      </div>
    </div>
  );
}
