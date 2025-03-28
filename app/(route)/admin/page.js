"use client";

import Link from "next/link";

export default function Admin() {

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
      <Link
        href={"/services/edit"}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add New Service
      </Link>

      <Link
        href={"/admin/blogs"}
        className="bg-blue-600 text-white px-4 py-2 rounded ml-4"
      >
        Add New Blog
      </Link>
    </div>
  );
}
