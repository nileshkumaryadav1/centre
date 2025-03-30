'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center md:min-h-screen bg-gray-900 text-white p-5">
      <div className="text-center p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p className="text-gray-400 mt-2">Oops! The page you are looking for does not exist.</p>
        <button
          onClick={() => router.push('/')}
          className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
