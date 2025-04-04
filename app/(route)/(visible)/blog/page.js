"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setFilteredBlogs(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = blogs;

    if (searchTerm.trim() !== "") {
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (authorFilter !== "All") {
      filtered = filtered.filter((blog) => blog.author === authorFilter);
    }

    setFilteredBlogs(filtered);
  }, [searchTerm, authorFilter, blogs]);

  const allAuthors = [...new Set(blogs.map((blog) => blog.author))];

  if (loading) {
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
        <p className="text-gray-600 text-center mb-2">
          Stay updated with the latest blog posts from Centre.
        </p>
        <p className="text-center text-sm text-gray-500 mb-4">
          Total Blogs: <span className="font-semibold">{blogs.length}</span>
        </p>

        {/* Search & Filter Controls */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-6 mb-6 items-center justify-between">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full md:w-1/2 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full md:w-1/4 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={authorFilter}
            onChange={(e) => setAuthorFilter(e.target.value)}
          >
            <option value="All">All Authors</option>
            {allAuthors.map((author) => (
              <option key={author} value={author}>
                {author}
              </option>
            ))}
          </select>
        </div>

        {/* Blog Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  By{" "}
                  <span className="text-blue-600 font-medium">
                    {blog.author}
                  </span>{" "}
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
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-2">
              No blogs found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
