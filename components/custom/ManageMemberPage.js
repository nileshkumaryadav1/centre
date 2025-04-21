"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import ImageUploader from "./ImageUploader";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ManageMemberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id");

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    role: "",
    imageUrl: "",
    instagramLink: "",
    githubLink: "",
    linkedinLink: "",
  });

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const uploadedImageUrl = localStorage.getItem("imageUrl");
    if (uploadedImageUrl) {
      setFormData((prev) => ({ ...prev, imageUrl: uploadedImageUrl }));
    }

    const handleStorageChange = (event) => {
      if (event.key === "imageUrl") {
        window.location.reload();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

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

  useEffect(() => {
    if (!memberId) return;
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
    <div className="max-w-4xl mx-auto mt-10 space-y-10">
      {/* Profile Card Instruction */}
      <div className="bg-yellow-50 p-6 border-l-4 border-yellow-400 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-2">📝 Profile Card Instructions</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>💡 First <strong>upload your profile picture</strong>.</li>
          <li>📸 Make sure your picture is clear and centered (square image works best).</li>
          <li>✍️ Fill your <strong>name, role, and bio</strong> properly. This will be shown publicly.</li>
          <li>🌐 You can add your Instagram, GitHub, and LinkedIn links (optional).</li>
          <li>✅ Click <strong>Add</strong> or <strong>Update</strong> to save your profile.</li>
        </ul>
      </div>

      {/* Centre Features Section */}
      {/* <div className="bg-blue-50 p-6 border-l-4 border-blue-400 rounded-md shadow-sm">
        <h2 className="text-xl font-bold mb-2">🚀 Centre Features</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>🎥 Dedicated <strong>Video Team</strong> for event recordings and promos.</li>
          <li>📸 Expert <strong>Photography Unit</strong> capturing every memory.</li>
          <li>💻 <strong>Tech & Web Team</strong> powering all our digital presence.</li>
          <li>🎮 Entering the world of <strong>Gaming and Hackathons</strong> under “Centre”.</li>
          <li>🧠 <strong>Strategy, Planning & Execution</strong> handled by passionate students.</li>
        </ul>
      </div> */}

      {/* Form Section */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">
          {memberId ? "Edit Member" : "Add Member"}
        </h2>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col border justify-center items-center p-4 gap-2">
            <div className="hidden">
              <ImageUploader />
            </div>
            <Link
              href={"/upload"}
              className="border rounded p-2 bg-blue-500 text-white"
            >
              Upload Profile Pic
            </Link>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl || ""}
              onChange={handleChange}
              placeholder="Image URL"
              className="hidden"
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
            <option value="Member">Member</option>
            <option value="Web-Manager">Web Manager</option>
            <option value="Video-Manager">Video Manager</option>
            <option value="Fund-Manager">Fund Manager</option>
            <option value="Admin">Admin</option>
          </select>
          <input
            type="text"
            name="instagramLink"
            value={formData.instagramLink}
            onChange={handleChange}
            placeholder="Instagram Link (Optional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            placeholder="GitHub Link (Optional)"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="linkedinLink"
            value={formData.linkedinLink}
            onChange={handleChange}
            placeholder="LinkedIn Link (Optional)"
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

      {/* Members List */}
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">Manage Members</h2>
        {members.length === 0 ? (
          <p className="text-gray-600">No members found.</p>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <div
                key={member._id}
                className="flex justify-between items-start bg-gray-100 p-4 rounded-lg"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-16 h-16 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-gray-600">{member.bio}</p>
                    <p className="text-sm text-blue-900">{member.role}</p>
                    {member.instagramLink && (
                      <p>
                        <a
                          className="text-sm text-pink-500 flex items-center gap-2"
                          href={member.instagramLink}
                          target="_blank"
                        >
                          <FaInstagram />
                          {member.instagramLink.slice(22, 40)}
                        </a>
                      </p>
                    )}
                    {member.githubLink && (
                      <p>
                        <a
                          className="text-sm text-black flex items-center gap-2"
                          href={member.githubLink}
                          target="_blank"
                        >
                          <FaGithub />
                          {member.githubLink.slice(19, 40)}
                        </a>
                      </p>
                    )}
                    {member.linkedinLink && (
                      <p>
                        <a
                          className="text-sm text-blue-700 flex items-center gap-2"
                          href={member.linkedinLink}
                          target="_blank"
                        >
                          <FaLinkedin />
                          {member.linkedinLink.slice(28, 50)}
                        </a>
                      </p>
                    )}
                  </div>
                </div>
                {/* Optional buttons (Edit/Delete) */}
                {/* 
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
                */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
