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
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
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
      <h2 className="md:text-3xl text-2xl font-extrabold text-center text-gray-800 mb-4">
        Meet Our Members
      </h2>

      <div className="text-center mb-4 text-lg text-gray-700 font-medium">
        Total Members: {members.length}
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-6">
        <input
          type="text"
          placeholder="Search members by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 w-full md:w-1/3"
        />

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 w-full md:w-1/4"
        >
          {uniqueRoles.map((role, index) => (
            <option key={index} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      {filteredMembers.length === 0 ? (
        <p className="text-center text-gray-600">No matching members found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 md:p-6 p-4 rounded-xl text-center border border-gray-200"
            >
              <img
                src={member.imageUrl || "logo.jpg"}
                alt={member.name}
                className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 shadow-md object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900">
                {member.name}
              </h3>
              <p className="text-blue-600">{member.role}</p>
              <p className="text-gray-600">{member.bio}</p>

              <div className="mt-4 flex justify-center gap-3 text-2xl">
                {member.instagramLink && (
                  <a
                    href={member.instagramLink}
                    target="_blank"
                    className="text-pink-500 hover:text-pink-700"
                  >
                    <FaInstagram />
                  </a>
                )}
                {member.linkedinLink && (
                  <a
                    href={member.linkedinLink}
                    target="_blank"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {member.githubLink && (
                  <a
                    href={member.githubLink}
                    target="_blank"
                    className="text-gray-800 hover:text-gray-900"
                  >
                    <FaGithub />
                  </a>
                )}
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
      )}
    </div>
  );
}

export default MembersPage;
