"use client";

import { SkeletonCard } from "@/components/custom/SkeletonCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/members")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 md:gap-40 md:m-20 m-10 gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center text-xl font-bold mt-10">
        No members found.
      </div>
    );
  }

  return (
    <div className="p-5 bg-gray-100 md:min-h-screen">
      <h2 className="md:text-3xl text-xl font-extrabold text-center text-gray-800 md:mb-6 mb-3">
        Meet Our Members
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 md:p-6 p-2 rounded-xl text-center border border-gray-200"
          >
            <img
              src={member.imageUrl || "/default-avatar.png"}
              alt={member.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-md object-cover"
            />
            <h3 className="text-xl font-semibold text-gray-900">
              {member.name}
            </h3>
            <p className="text-blue-600">{member.role}</p>
            <p className="text-gray-600">{member.bio}</p>

            <div className="mt-4 flex justify-center gap-3">
              {member.instagramLink && (
                <a
                  href={member.instagramLink}
                  target="_blank"
                  className="text-pink-500 hover:text-pink-700 text-lg"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
            </div>

            <div className="mt-1 flex justify-center gap-3">
              <a
                href={member.instagramLink}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 text-3xl"
              >
                <FaInstagram />
              </a>
              <a
                href={member.linkedinLink}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 text-3xl"
              >
                <FaLinkedin />
              </a>
              <a
                href={member.githubLink}
                target="_blank"
                className="text-blue-500 hover:text-blue-700 text-3xl"
              >
                <FaGithub />
              </a>
            </div>

            <Link
              href={`/members/${member._id}`}
              className="bg-indigo-600 text-white px-4 py-2 rounded mt-4 block hover:bg-indigo-700 transition duration-200"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MembersPage;
