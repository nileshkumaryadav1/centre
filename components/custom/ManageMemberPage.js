"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ManageMemberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id"); // Use searchParams directly

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    role: "",
    imageUrl: "",
    instagramLink: "",
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch members for management
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await fetch("/api/members");
        if (!res.ok) throw new Error("Failed to fetch members");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMembers();
  }, []);

  // Fetch member details if editing
  useEffect(() => {
    if (!memberId) return; // Check if memberId exists

    const fetchMemberDetails = async () => {
      try {
        const res = await fetch(`/api/members/${memberId}`);
        if (!res.ok) throw new Error("Failed to fetch member details");
        const data = await res.json();
        setFormData(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchMemberDetails();
  }, [memberId]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = memberId ? "PUT" : "POST";
    const endpoint = memberId ? `/api/members/${memberId}` : "/api/members";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save member");

      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this member?")) return;

    try {
      const res = await fetch(`/api/members/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete member");

      setMembers((prev) => prev.filter((member) => member._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {memberId ? "Edit Member" : "Add Member"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
            required
          />
          <textarea
            rows="2"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Role</option>
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Image URL"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            placeholder="Instagram Link"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Saving..." : memberId ? "Update" : "Add"}
          </button>
        </form>
      </div>

      {/* View & Manage Members Section */}
      <div className="mt-10 p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Manage Members</h2>

        {error && <p className="text-red-500">{error}</p>}

        {members.length === 0 ? (
          <p className="text-gray-600">No members found.</p>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <div
                key={member._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/members?id=${member._id}`}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
