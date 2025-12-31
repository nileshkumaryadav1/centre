"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AdminEventsManagePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  // ======================
  // STATE
  // ======================
  const [events, setEvents] = useState([]);
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    // Core
    title: "",
    slug: "",
    description: "",

    // Media
    imageUrl: "",
    coverImageUrl: "",

    // Event details
    venue: "",
    mode: "offline",
    eventDate: "",
    startTime: "",
    endTime: "",

    // Registration
    registrationLink: "",
    registrationDeadline: "",
    isRegistrationOpen: true,

    // Relations
    club: "",
    organizers: [{ name: "", role: "" }],

    // Meta
    status: "upcoming",
    isFeatured: false,
    priority: 0,
  });

  // ======================
  // FETCH DATA
  // ======================
  useEffect(() => {
    Promise.all([
      fetch("/api/events").then((r) => r.json()),
      fetch("/api/clubs").then((r) => r.json()),
    ])
      .then(([eventsData, clubsData]) => {
        setEvents(eventsData);
        setClubs(clubsData);
      })
      .finally(() => setLoading(false));

    if (id) {
      fetch(`/api/events/${id}`)
        .then((res) => res.json())
        .then((data) =>
          setFormData({
            ...data,
            eventDate: data.eventDate?.slice(0, 10),
            registrationDeadline: data.registrationDeadline?.slice(0, 10),
          })
        );
    }
  }, [id]);

  // ======================
  // HANDLERS
  // ======================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOrganizerChange = (index, field, value) => {
    const updated = [...formData.organizers];
    updated[index][field] = value;
    setFormData({ ...formData, organizers: updated });
  };

  const addOrganizer = () =>
    setFormData({
      ...formData,
      organizers: [...formData.organizers, { name: "", role: "" }],
    });

  const removeOrganizer = (index) =>
    setFormData({
      ...formData,
      organizers: formData.organizers.filter((_, i) => i !== index),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = id ? "PUT" : "POST";
    const url = `/api/events${id ? `/${id}` : ""}`;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to save event");
      return;
    }

    router.push("/admin/events");
    router.refresh();
  };

  const handleDelete = async (eventId) => {
    if (!confirm("Delete this event?")) return;

    await fetch(`/api/events/${eventId}`, { method: "DELETE" });
    setEvents((prev) => prev.filter((e) => e._id !== eventId));
  };

  // ======================
  // UI
  // ======================
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <h1 className="text-2xl font-bold">
        {id ? "Edit Event" : "Create Event"}
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
          placeholder="Unique Slug"
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
          name="imageUrl"
          placeholder="Thumbnail Image URL"
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

        <input
          name="venue"
          placeholder="Venue"
          value={formData.venue}
          onChange={handleChange}
        />

        <div className="grid grid-cols-3 gap-3">
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            required
          />
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

        <select name="mode" value={formData.mode} onChange={handleChange}>
          <option value="offline">Offline</option>
          <option value="online">Online</option>
          <option value="hybrid">Hybrid</option>
        </select>

        <select name="club" value={formData.club} onChange={handleChange}>
          <option value="">Select Club</option>
          {clubs.map((c) => (
            <option key={c._id} value={c._id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          name="registrationLink"
          placeholder="Registration Link"
          value={formData.registrationLink}
          onChange={handleChange}
        />
        <input
          type="date"
          name="registrationDeadline"
          value={formData.registrationDeadline}
          onChange={handleChange}
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isRegistrationOpen"
            checked={formData.isRegistrationOpen}
            onChange={handleChange}
          />
          Registration Open
        </label>

        {/* ORGANIZERS */}
        <div className="space-y-2">
          <p className="font-semibold">Organizers</p>
          {formData.organizers.map((org, i) => (
            <div key={i} className="flex gap-2">
              <input
                placeholder="Name"
                value={org.name}
                onChange={(e) =>
                  handleOrganizerChange(i, "name", e.target.value)
                }
              />
              <input
                placeholder="Role"
                value={org.role}
                onChange={(e) =>
                  handleOrganizerChange(i, "role", e.target.value)
                }
              />
              <button type="button" onClick={() => removeOrganizer(i)}>
                ✕
              </button>
            </div>
          ))}
          <button type="button" onClick={addOrganizer}>
            + Add Organizer
          </button>
        </div>

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="upcoming">Upcoming</option>
          <option value="ongoing">Ongoing</option>
          <option value="completed">Completed</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isFeatured"
            checked={formData.isFeatured}
            onChange={handleChange}
          />
          Featured Event
        </label>

        <input
          type="number"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          placeholder="Priority (higher = top)"
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          {id ? "Update Event" : "Create Event"}
        </button>
      </form>

      {/* LIST */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Events</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid gap-4">
            {events.map((e) => (
              <div
                key={e._id}
                className="p-4 bg-gray-100 rounded flex justify-between"
              >
                <div>
                  <h3 className="font-semibold">{e.title}</h3>
                  <p className="text-sm">
                    {e.status} • {e.mode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => router.push(`/admin/events?id=${e._id}`)}
                    className="bg-yellow-500 px-3 py-1 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(e._id)}
                    className="bg-red-600 px-3 py-1 text-white rounded"
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

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminEventsManagePage />
    </Suspense>
  );
}
