"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-br from-gray-100 to-gray-200 px-6">
      <div className="max-w-md w-full text-center bg-gray-50 backdrop-blur border border-gray-700 rounded-2xl shadow-xl p-8">
        {/* Error Code */}
        <h1 className="text-5xl font-extrabold text-blue-500 tracking-wide">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-3 text-xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="mt-2 text-gray-600 leading-relaxed">
          Sorry, the page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Action */}
        <button
          onClick={() => router.push("/")}
          className="mt-6 w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          &larr; Go back home
        </button>
      </div>
    </div>
  );
}
