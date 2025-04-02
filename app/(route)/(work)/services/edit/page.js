"use client"; // Ensure this is a Client Component

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function ServiceManagerComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Get service ID from URL query parameters

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    link: "",
  });

  const [services, setServices] = useState([]); // Store all services
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Fetch all services
    fetch(`/api/services`)
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching services:", err));

    // Fetch existing service details for editing
    if (id) {
      fetch(`/api/services/${id}`)
        .then((res) => res.json())
        .then((data) => setFormData(data))
        .catch((err) => console.error("Error fetching service:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = id ? "PUT" : "POST"; // Use PUT for editing, POST for new service
    const response = await fetch(`/api/services${id ? `/${id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Service saved:", data);

      // Update UI without reload
      if (id) {
        setServices((prev) =>
          prev.map((service) => (service._id === id ? data : service))
        );
      } else {
        setServices((prev) => [...prev, data]);
      }

      setFormData({ title: "", description: "", imageUrl: "", link: "" });
      router.push("/services");
    } else {
      console.error("Error saving service");
    }
  };

  const handleDelete = async (serviceId) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    const response = await fetch(`/api/services/${serviceId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setServices(services.filter((service) => service._id !== serviceId)); // Remove from UI
    } else {
      console.error("Error deleting service");
    }
  };

  return (
    <div className="min-h-screen p-8">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Service" : "Add Service"}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <label className="block mb-2">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Image URL:
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <label className="block mb-2">
          Service Link:
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
            required
          />
        </label>

        <button type="submit" className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Existing Services</h2>

        {loading ? (
          <p>Loading services...</p>
        ) : (
          <ul>
            {services.map((service) => (
              <li key={service._id} className="mb-4 bg-gray-100 p-4 rounded shadow">
                <h3 className="font-bold">{service.title}</h3>
                <p>{service.description}</p>
                <img src={service.imageUrl} alt={service.title} className="w-32 h-32 mt-2" />
                <a href={service.link} target="_blank" className="block text-blue-600 mt-2">
                  Visit Service
                </a>
                <div className="mt-2">
                  <button
                    onClick={() => router.push(`/services/edit?id=${service._id}`)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ✅ Wrap useSearchParams inside a Suspense boundary
export default function ServiceManager() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ServiceManagerComponent />
    </Suspense>
  );
}
