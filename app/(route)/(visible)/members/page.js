"use client";

import { SkeletonCard } from "@/components/custom/SkeletonCard";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function MembersPage() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching members:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = members.filter((member) => {
      const matchesSearch = member.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole === "All" || member.role === selectedRole;
      return matchesSearch && matchesRole;
    });

    setFilteredMembers(filtered);
  }, [searchTerm, selectedRole, members]);

  const uniqueRoles = ["All", ...new Set(members.map((m) => m.role))];

  return (
    <div className="p-5 md:px-16 pb-10 bg-gray-100 min-h-screen">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-indigo-700 mb-2 tracking-tight">
        Meet Our Members
      </h2>
      <p className="text-center text-gray-600 mb-6">
        A glimpse into the amazing Centre crew ✨
      </p>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white w-full md:w-1/3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 bg-white w-full md:w-1/4 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {uniqueRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 m-10">
          {Array.from({ length: 4 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      ) : filteredMembers.length === 0 ? (
        <p className="text-center text-gray-600 text-lg font-medium">
          No matching members found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-xl text-center border border-gray-200 group"
            >
              <img
                src={member.imageUrl || "/logo.jpg"}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-xl font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-indigo-600 font-medium">{member.role}</p>
              <p className="text-gray-600 text-sm mt-1">{member.bio}</p>

              <div className="mt-4 flex justify-center gap-4 text-2xl">
                {member.instagramLink && (
                  <a
                    href={member.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-500 hover:text-pink-700 transition"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.linkedinLink && (
                  <a
                    href={member.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 transition"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.githubLink && (
                  <a
                    href={member.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-800 hover:text-black transition"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>

              <Link
                href={`/members/${member._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded mt-5 inline-block hover:bg-indigo-700 transition duration-200"
              >
                View Profile
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="text-center mt-4 mb-10">
        <h3 className="text-xl md:text-2xl font-bold text-gray-700 mb-2">
          What makes Centre different?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
          We are a group of passionate creators exploring the world of design,
          dev, content, gaming, events, and beyond. Every member brings a unique
          spark 🔥 to the team.
        </p>
      </div>
    </div>
  );
}

export default MembersPage;
