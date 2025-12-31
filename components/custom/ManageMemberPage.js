"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import ImageUploader from "./ImageUploader";

export default function ManageMemberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id");

  // =========================
  // FORM STATE (MODEL SYNCED)
  // =========================
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    role: "Member",
    bio: "",
    birthday: "",
    imageUrl: "",

    socialLinks: {
      instagram: "",
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },

    isActive: true,
    priority: 0,
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

  // =========================
  // FETCH MEMBERS
  // =========================
  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then(setMembers)
      .catch(() => setError("Failed to fetch members"));
  }, []);

  // =========================
  // FETCH SINGLE MEMBER (EDIT)
  // =========================
  useEffect(() => {
    if (!memberId) return;

    fetch(`/api/members/${memberId}`)
      .then((res) => res.json())
      .then((data) =>
        setFormData({
          ...data,
          birthday: data.birthday?.slice(0, 10),
        })
      )
      .catch(() => setError("Failed to load member"));
  }, [memberId]);

  // =========================
  // HANDLERS
  // =========================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSocialChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const method = memberId ? "PUT" : "POST";
    const url = memberId ? `/api/members/${memberId}` : "/api/members";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Save failed");

      router.push("/admin/members");
      router.refresh();
    } catch {
      setError("Failed to save member");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this member?")) return;

    await fetch(`/api/members/${id}`, { method: "DELETE" });
    setMembers((prev) => prev.filter((m) => m._id !== id));
  };
  
  // =========================
  // UI
  // =========================
  return (
    <div className="max-w-5xl mx-auto p-8 space-y-10">
      {/* ================= FORM ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          {memberId ? "Edit Member" : "Add Member"}
        </h2>

        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input"
          />
          <input
            name="slug"
            placeholder="Unique Slug (john-doe)"
            value={formData.slug}
            onChange={handleChange}
            required
            className="input"
          />
          <div>
            <label className="label">Birthday</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
          >
            <option>Member</option>
            <option>Web-Manager</option>
            <option>Video-Manager</option>
            <option>Fund-Manager</option>
            <option>Admin</option>
          </select>
          <textarea
            name="bio"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            required
            className="input"
          />
          {/* PROFILE IMAGE */}
          <div className="border flex flex-col gap-2 items-center justify-center p-2">
            <div className="hidden">
              <ImageUploader />
            </div>

            <img
              src={
                formData.imageUrl ||
                "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
              }
              className="w-32 h-32 object-cover rounded"
            />

            <Link
              href={"/admin/members/upload"}
              className="border rounded p-2 bg-blue-500 text-white"
            >
              Upload Profile Picture
            </Link>

            <input
              name="imageUrl"
              placeholder="Profile Image URL"
              value={formData.imageUrl}
              onChange={handleChange}
              required
              className="input"
            />
          </div>
          {/* SOCIAL LINKS */}
          <input
            name="instagram"
            placeholder="Instagram"
            value={formData.socialLinks.instagram}
            onChange={handleSocialChange}
            className="input"
          />
          <input
            name="github"
            placeholder="GitHub"
            value={formData.socialLinks.github}
            onChange={handleSocialChange}
            className="input"
          />
          <input
            name="linkedin"
            placeholder="LinkedIn"
            value={formData.socialLinks.linkedin}
            onChange={handleSocialChange}
            className="input"
          />
          {/* CONTROL */}
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
            />
            Active Member
          </label>
          <input
            type="number"
            name="priority"
            placeholder="Priority"
            value={formData.priority}
            onChange={handleChange}
            className="input"
          />
          <button
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded"
          >
            {loading ? "Saving..." : memberId ? "Update Member" : "Add Member"}
          </button>
        </form>
      </div>

      {/* ================= LIST ================= */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Members</h2>

        <div className="grid gap-4">
          {members.map((m) => (
            <div
              key={m._id}
              className="flex justify-between bg-gray-100 p-4 rounded"
            >
              <div className="flex gap-4">
                <img
                  src={m.imageUrl}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{m.name}</h3>
                  <p className="text-sm">{m.role}</p>

                  <div className="flex gap-2 mt-1">
                    {m.socialLinks?.instagram && (
                      <a href={m.socialLinks.instagram} target="_blank">
                        <FaInstagram />
                      </a>
                    )}
                    {m.socialLinks?.github && (
                      <a href={m.socialLinks.github} target="_blank">
                        <FaGithub />
                      </a>
                    )}
                    {m.socialLinks?.linkedin && (
                      <a href={m.socialLinks.linkedin} target="_blank">
                        <FaLinkedin />
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin/members?id=${m._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(m._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
