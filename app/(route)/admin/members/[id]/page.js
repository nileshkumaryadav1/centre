"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

async function getMember(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/members/${id}`
  );
  if (!res.ok) {
    throw new Error("Failed to fetch member data");
  }
  return res.json();
}

async function updateMember(id, updatedData) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/members/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update member");
  }
  return res.json();
}

export default function EditMemberPage() {
  const { id } = useParams();
  const router = useRouter();
  const [member, setMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    role: "",
    imageUrl: "",
    instagramLink: "",
    githubLink: "",
    linkedinLink: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch member details
  useEffect(() => {
    getMember(id)
      .then((data) => {
        setMember(data);
        setFormData({
          name: data.name,
          bio: data.bio,
          role: data.role,
          imageUrl: data.imageUrl,
          instagramLink: data.instagramLink || "",
          githubLink: data.githubLink || "",
          linkedinLink: data.linkedinLink || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedMember = await updateMember(id, formData);
      alert("Member updated successfully!");
      router.push(`/admin/members`); // Redirect after successful update
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex justify-center items-center p-3">
      <div className="max-w-3xl w-full bg-white shadow-2xl rounded-xl p-6">
        <h1 className="text-xl font-serif font-bold text-gray-900 mb-4 text-center">
          Edit Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-gray-700 font-medium">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-gray-700 font-medium">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            >
              <option value="">Select Role</option>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="block text-gray-700 font-medium"
            >
              Image URL
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label
              htmlFor="instagramLink"
              className="block text-gray-700 font-medium"
            >
              Instagram Link
            </label>
            <input
              type="text"
              id="instagramLink"
              name="instagramLink"
              value={formData.instagramLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="githubLink"
              className="block text-gray-700 font-medium"
            >
              GitHub Link
            </label>
            <input
              type="text"
              id="githubLink"
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="linkedinLink"
              className="block text-gray-700 font-medium"
            >
              LinkedIn Link
            </label>
            <input
              type="text"
              id="linkedinLink"
              name="linkedinLink"
              value={formData.linkedinLink}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none"
            >
              Update Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
