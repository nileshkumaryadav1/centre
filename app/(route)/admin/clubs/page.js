"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminClubsManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    location: "",
    imageUrl: "",
    coverImageUrl: "",
    links: {
      website: "",
      instagram: "",
      linkedin: "",
      github: "",
    },
    coordinators: [{ name: "", role: "Coordinator", email: "" }],
    isActive: true,
    priority: 0,
  });

  // =====================
  // Fetch Clubs
  // =====================
  useEffect(() => {
    fetch("/api/clubs")
      .then((res) => res.json())
      .then(setClubs)
      .finally(() => setLoading(false));

    if (id) {
      fetch(`/api/clubs/${id}`)
        .then((res) => res.json())
        .then(setFormData);
    }
  }, [id]);

  // =====================
  // Handlers
  // =====================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleLinkChange = (e) => {
    setFormData({
      ...formData,
      links: { ...formData.links, [e.target.name]: e.target.value },
    });
  };

  const handleCoordinatorChange = (index, field, value) => {
    const updated = [...formData.coordinators];
    updated[index][field] = value;
    setFormData({ ...formData, coordinators: updated });
  };

  const addCoordinator = () => {
    setFormData({
      ...formData,
      coordinators: [
        ...formData.coordinators,
        { name: "", role: "", email: "" },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = `/api/clubs${id ? `/${id}` : ""}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to save club");
      return;
    }

    router.push("/admin/clubs");
    router.refresh();
  };

  const handleDelete = async (clubId) => {
    if (!confirm("Delete this club?")) return;

    await fetch(`/api/clubs/${clubId}`, { method: "DELETE" });
    setClubs((prev) => prev.filter((c) => c._id !== clubId));
  };

  // =====================
  // UI
  // =====================
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Club" : "Add Club"}
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 bg-white p-6 rounded shadow"
      >
        <input
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          name="slug"
          placeholder="Slug (unique)"
          value={formData.slug}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />

        <input
          name="imageUrl"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
        <input
          name="coverImageUrl"
          placeholder="Cover Image URL"
          value={formData.coverImageUrl}
          onChange={handleChange}
        />

        {/* LINKS */}
        <h3 className="font-semibold mt-4">Links</h3>
        <input
          name="website"
          placeholder="Website"
          value={formData.links.website}
          onChange={handleLinkChange}
        />
        <input
          name="instagram"
          placeholder="Instagram"
          value={formData.links.instagram}
          onChange={handleLinkChange}
        />
        <input
          name="linkedin"
          placeholder="LinkedIn"
          value={formData.links.linkedin}
          onChange={handleLinkChange}
        />
        <input
          name="github"
          placeholder="GitHub"
          value={formData.links.github}
          onChange={handleLinkChange}
        />

        {/* COORDINATORS */}
        <h3 className="font-semibold mt-4">Coordinators</h3>
        {formData.coordinators.map((c, i) => (
          <div key={i} className="grid grid-cols-3 gap-2">
            <input
              placeholder="Name"
              value={c.name}
              onChange={(e) =>
                handleCoordinatorChange(i, "name", e.target.value)
              }
            />
            <input
              placeholder="Role"
              value={c.role}
              onChange={(e) =>
                handleCoordinatorChange(i, "role", e.target.value)
              }
            />
            <input
              placeholder="Email"
              value={c.email}
              onChange={(e) =>
                handleCoordinatorChange(i, "email", e.target.value)
              }
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addCoordinator}
          className="text-blue-600 text-sm"
        >
          + Add Coordinator
        </button>

        {/* META */}
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
          />
          Active Club
        </label>

        <input
          type="number"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          placeholder="Priority"
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          {id ? "Update Club" : "Create Club"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-bold mt-10 mb-4">All Clubs</h2>

      {loading ? (
        <p>Loading clubs...</p>
      ) : (
        <div className="grid gap-4">
          {clubs.map((club) => (
            <div key={club._id} className="p-4 bg-gray-100 rounded">
              <h3 className="font-semibold">{club.title}</h3>
              <p>{club.location}</p>

              <p>{club.description}</p>

              <img src={club.coverImageUrl} alt={club.title} className="h-50 w-50"/>

              <img src={club.imageUrl} alt={club.title} className="h-50 w-50" />

              <div className="mt-2">
                <h4 className="font-semibold">Coordinators</h4>
                <ul>
                  {club.coordinators.map((c) => (
                    <li key={c._id}>
                      {c.name} ({c.role})
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => router.push(`/admin/clubs?id=${club._id}`)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(club._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClubManager() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminClubsManagePage />
    </Suspense>
  );
}
