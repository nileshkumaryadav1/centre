"use client";
import React, { useState, useEffect } from "react";

export default function NameLinkPage() {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/api/name-link")
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/name-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, link }),
    });

    const data = await res.json();
    setItems([...items, data]);
    setName("");
    setLink("");
  };

  const handleDelete = async (id) => {
    await fetch(`/api/name-link/${id}`, { method: "DELETE" });
    setItems(items.filter((item) => item._id !== id));
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Name & Link</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border p-2 w-full"
          type="text"
          placeholder="Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Add
        </button>
      </form>

      <ul className="mt-6 space-y-2">
        {items.map((item) => (
          <li
            key={item._id}
            className="border p-2 flex justify-between items-center"
          >
            <div>
              <strong>{item.name}</strong>:{" "}
              <a
                href={item.link}
                target="_blank"
                className="text-blue-600 hover:underline hover:text-blue-800 w-2/3"
              >
                {item.link.slice(55, 120)}
              </a>
            </div>
            <button
              className="text-red-500 cursor-pointer"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
