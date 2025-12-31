"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function MemberDetailPage() {
  const { id } = useParams();

  const [member, setMember] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch member + blogs
  useEffect(() => {
    async function fetchData() {
      try {
        const [memberRes, blogsRes] = await Promise.all([
          fetch(`/api/members/${id}`),
          fetch(`/api/blogs`),
        ]);

        const memberData = await memberRes.json();
        const blogsData = await blogsRes.json();

        setMember(memberData);
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchData();
  }, [id]);

  // Filter blogs by member name
  useEffect(() => {
    if (!member || blogs.length === 0) return;

    const filtered = blogs.filter(
      (blog) => blog.author === member.name
    );

    setFilteredBlogs(filtered);
  }, [blogs, member]);

  // Loading state
  if (loading || !member) {
    return (
      <div className="flex justify-center p-20">
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ================= Member Card ================= */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 text-center border">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-md"
        />

        <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
        <p className="text-indigo-600 font-medium">
          {member.role || "Member"}
        </p>

        {member.bio && (
          <p className="text-gray-700 mt-3">{member.bio}</p>
        )}

        {/* Social Links */}
        <div className="mt-4 flex justify-center gap-4 text-3xl">
          {member.instagramLink && (
            <a
              href={member.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:scale-110 transition"
            >
              <FaInstagram />
            </a>
          )}

          {member.linkedinLink && (
            <a
              href={member.linkedinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>
          )}

          {member.githubLink && (
            <a
              href={member.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:scale-110 transition"
            >
              <FaGithub />
            </a>
          )}
        </div>
      </div>

      {/* ================= Blogs Section ================= */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Blogs by {member.name}
        </h3>

        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold mb-2">
                  {blog.title}
                </h2>

                <div className="text-sm text-gray-500 flex justify-between">
                  <span>
                    {new Date(blog.createdAt).toDateString()}
                  </span>
                  <span className="text-blue-600 font-medium">
                    {blog.author}
                  </span>
                </div>

                <p className="text-gray-700 mt-3">
                  {blog.content?.substring(0, 140)}...
                </p>

                <Link
                  href={`/blog/${blog._id}`}
                  className="block mt-4 text-center px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Read More →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No blogs written yet.
          </p>
        )}
      </div>
    </div>
  );
}
