"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageUploader from "./ImageUploader";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

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
    githubLink: "",
    linkedinLink: "",
  });

  // 📌 Load imageUrl from Local Storage on page load
  useEffect(() => {
    const loadImageUrl = () => {
      const uploadedImageUrl = localStorage.getItem("imageUrl");
      if (uploadedImageUrl) {
        setFormData((prev) => ({ ...prev, imageUrl: uploadedImageUrl }));
      }
    };

    loadImageUrl();

    // 🔄 Listen for changes in localStorage
    const handleStorageChange = (event) => {
      if (event.key === "imageUrl") {
        window.location.reload(); // Refresh the page when imageUrl changes
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

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
        setLoading(false);
        router.refresh();
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

        <p className="text-yellow-400 mb-3">
          Please fill your details carefully, because your Card is going to be
          made by these details.
        </p>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col border justify-center items-center p-2 gap-2">
            <div className="hidden">
              <ImageUploader />
            </div>
            <Link
              href={"/upload"}
              className="border rounded p-1 bg-blue-500 text-white m-2"
            >
              Upload Profile Pic
            </Link>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded hidden"
              required
            />
            <img
              src={
                formData.imageUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              className="w-32 h-32 object-cover rounded"
            />
          </div>
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
            type="text"
            name="bio"
            value={formData.bio || ""}
            onChange={handleChange}
            placeholder="Bio"
            className="w-full p-2 border rounded"
            required
          />
          <select
            name="role"
            value={formData.role || ""}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="" className="hidden">
              Select Role
            </option>
            <option value="Member">Member</option>
            <option value="Web-Manager">Web Manager</option>
            <option value="Video-Manager">Video Manager</option>
            <option value="Fund-Manager">Fund Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink || ""}
            onChange={handleChange}
            placeholder="Instagram Link"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="githubLink"
            value={formData.githubLink || ""}
            onChange={handleChange}
            placeholder="GitHub Link"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="linkedinLink"
            value={formData.linkedinLink || ""}
            onChange={handleChange}
            placeholder="LinkedIn Link"
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
                    <p className="text-sm text-blue-900">{member.role}</p>
                    <p>
                      <a
                        className="text-sm text-blue-600 flex items-center gap-2"
                        href={member.instagramLink}
                        target="_blank"
                      >
                        <FaInstagram />
                        {member.instagramLink.split("/")[3]}
                      </a>
                    </p>
                    <p>
                      <a
                        className="text-sm text-blue-600 flex items-center gap-2"
                        href={member.githubLink}
                        target="_blank"
                      >
                        <FaGithub />
                        {member.githubLink.split("/")[3]}
                      </a>
                    </p>
                    <p>
                      <a
                        className="text-sm text-blue-600 flex items-center gap-2"
                        href={member.linkedinLink}
                        target="_blank"
                      >
                        <FaLinkedin />{member.linkedinLink.split("/")[4]}
                      </a>
                    </p>
                  </div>
                </div>
                {/* <div className="flex gap-2">
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
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
