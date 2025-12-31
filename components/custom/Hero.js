import Link from "next/link";
export default function Hero() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 md:py-8">
      {/* Heading */}

      <div className="text-center space-y-4">
        <h2 className="md:text-4xl text-2xl font-extrabold text-gray-900 dark:text-white">
          Empowering engineering students through events, clubs, and real
          exposure.
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Free creative and digital services for all — by our community.
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-4">
        <Link
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          href="/join-us"
        >
          Join Us
        </Link>
        <Link
          className="inline-block px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          href="/events"
        >
          View Events →
        </Link>
      </div>
    </div>
  );
}
