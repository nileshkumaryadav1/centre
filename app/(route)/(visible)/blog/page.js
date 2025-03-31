"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="md:min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-3 pb-5">
      <div className="max-w-4xl mx-auto">
        <h1 className="md:text-4xl text-2xl font-extrabold text-center text-gray-900">
          📝 Centre Blog
        </h1>
        <p className="text-gray-600 text-center mb-3">
          Stay updated with the latest blog posts from Centre.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                {blog.title}
              </h2>
              {/* <img src={blog.imageUrl} alt={blog.title} className="w-full mb-4" /> */}
              <p className="text-gray-600 text-sm">
                By{" "}
                <span className="text-blue-600 font-medium">{blog.author}</span>{" "}
                &middot; {new Date(blog.createdAt).toDateString()}
              </p>
              <p className="text-gray-700 mt-3">
                {blog.content.substring(0, 150)}...
              </p>
              <Link
                href={`/blog/${blog._id}`}
                className="inline-block mt-4 text-blue-600 hover:underline font-medium"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
