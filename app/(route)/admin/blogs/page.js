"use client";

import { useState, useEffect } from "react";

export default function ManageBlogs() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);

  // ==============================
  // Load Admin Name from localStorage
  // ==============================
  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (admin?.name) {
      setAuthor(admin.name);
    }
  }, []);

  // ==============================
  // Fetch Blogs
  // ==============================
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  // ==============================
  // Add or Update Blog
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/blogs/${editId}` : "/api/blogs";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        imageUrl,
        content,
        author, // 🔥 auto-filled from localStorage
      }),
    });

    alert(editId ? "Blog Updated!" : "Blog Published!");

    // Reset form (keep admin author)
    setTitle("");
    setImageUrl("");
    setContent("");

    const admin = JSON.parse(localStorage.getItem("admin"));
    setAuthor(admin?.name || "");

    setEditId(null);
    fetchBlogs();
  };

  // ==============================
  // Edit Blog
  // ==============================
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setImageUrl(blog.imageUrl);
    setContent(blog.content);
    setAuthor(blog.author); // preserve original author
    setEditId(blog._id);
  };

  // ==============================
  // Delete Blog
  // ==============================
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      alert("Blog Deleted!");
      fetchBlogs();
    }
  };

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">
        📝 {editId ? "Edit Blog" : "Write a Blog"}
      </h1>

      {/* ================= Form ================= */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Image URL"
          className="border p-2 rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          required
        />

        <textarea
          placeholder="Content"
          className="border p-2 rounded min-h-[120px]"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />

        {/* Read-only Author */}
        <div className="text-sm text-gray-600">
          Author: <span className="font-medium text-gray-800">{author}</span>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {editId ? "Update Blog" : "Publish Blog"}
        </button>
      </form>

      {/* ================= Blog List ================= */}
      <h2 className="text-xl font-bold mt-8 mb-3">📋 Manage Blogs</h2>

      {blogs.map((blog) => (
        <div
          key={blog._id}
          className="border p-4 mb-4 rounded-lg shadow-sm bg-white"
        >
          <h2 className="text-lg font-semibold">{blog.title}</h2>

          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="rounded-lg w-full max-w-xs my-2"
          />

          <p className="text-gray-700">{blog.content.substring(0, 150)}...</p>

          <p className="text-sm text-gray-500 mt-1">By {blog.author}</p>

          <div className="mt-3 flex gap-2">
            <button
              onClick={() => handleEdit(blog)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
