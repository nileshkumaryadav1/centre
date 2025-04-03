"use client";

import Link from "next/link";

export default function Admin() {

  return (
    <div className="md:min-h-screen p-8 bg-gray-100 flex flex-col justify-start items-center space-y-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">Admin Panel</h2>
      <Link
        href={"/services/edit"}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Manage Service
      </Link>

      <Link
        href={"/admin/birthday"}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Manage Birthday
      </Link>

      <Link
        href={"/admin/blogs"}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Manage Blog
      </Link>

      <Link
        href={"/admin/members"}
        className="bg-blue-600 text-white p-3 rounded"
      >
        Manage Members
      </Link>
    </div>
  );
}
