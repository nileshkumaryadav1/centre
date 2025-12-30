"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { SkeletonCard } from "@/components/custom/SkeletonCard";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function MemberDetailPage() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch member data using the provided schema
    fetch(`/api/members/${id}`)
      .then((response) => response.json())
      .then((data) => setMember(data))
      .catch((error) => console.error("Error fetching member details:", error));

    // Fetch blogs written by the member
    fetch(`/api/blogs/author-name?authorId=${id}`)
      .then((response) => response.json())
      .then((data) => setBlogs(data))
      .catch((error) => console.error("Error fetching blogs:", error));
  }, [id]);

  if (!member) {
    return (
      <div className="flex items-center justify-center p-20">
        {Array.from({ length: 1 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 text-center border border-gray-200">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-md"
        />
        <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
        <p className="text-indigo-600 font-medium">{member.role || "Member"}</p>
        <p className="text-gray-700 mt-3">{member.bio}</p>

        <div className="mt-4 flex justify-center gap-3">
          <a
            href={member.instagramLink}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 hover:text-4xl text-3xl"
          >
            <FaInstagram />
          </a>
          <a
            href={member.linkedinLink}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 hover:text-4xl text-3xl"
          >
            <FaLinkedin />
          </a>
          <a
            href={member.githubLink}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 hover:text-4xl text-3xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>

      <div className="mt-8 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Blogs by {member.name}
        </h3>
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="bg-white shadow-md p-4 rounded-lg border border-gray-200"
              >
                <h4 className="text-lg font-bold text-gray-900">
                  {blog.title}
                </h4>
                <p className="text-gray-600 mt-2">{blog.content.split("\n")[0]}</p>
                <Link
                  href={`/blog/${blog._id}`}
                  className="text-indigo-500 mt-3 inline-block"
                >
                  Read more →
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No blogs written yet.</p>
        )}
      </div>
    </div>
  );
}

export default MemberDetailPage;
