"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function ManageBlogs() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs");
    const data = await res.json();
    setBlogs(data);
  };

  // Add or Update Blog
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const method = editId ? "PUT" : "POST";
    const url = editId ? `/api/blogs/${editId}` : "/api/blogs";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, imageUrl, content, author }),
    });

    alert(editId ? "Blog Updated!" : "Blog Added!");
    setTitle("");
    setImageUrl("");
    setContent("");
    setAuthor("");
    setEditId(null);
    fetchBlogs();
  };

  // Edit Blog
  const handleEdit = (blog) => {
    setTitle(blog.title);
    setImageUrl(blog.imageUrl);
    setContent(blog.content);
    setAuthor(blog.author);
    setEditId(blog._id);
  };

  // Delete Blog
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      alert("Blog Deleted!");
      fetchBlogs();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 {editId ? "Edit Blog" : "Write a Blog"}</h1>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="text" placeholder="Title" className="border p-2" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Image URL" className="border p-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
        <textarea placeholder="Content" className="border p-2" value={content} onChange={(e) => setContent(e.target.value)} required />
        <input type="text" placeholder="Author" className="border p-2" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <button type="submit" className="bg-blue-500 text-white p-2">
          {editId ? "Update Blog" : "Publish"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-6">📋 Manage Blogs</h2>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold">{blog.title}</h2>
          <div className="w-full h-50 relative mb-2">
            <img src={blog.imageUrl} alt={blog.title} className="rounded-lg h-50 w-50" />
          </div>
          <p className="text-gray-700">{blog.content.substring(0, 150)}...</p>
          <p className="text-sm text-gray-500">By {blog.author}</p>
          <button onClick={() => handleEdit(blog)} className="bg-yellow-500 text-white px-3 py-1 m-1">Edit</button>
          <button onClick={() => handleDelete(blog._id)} className="bg-red-500 text-white px-3 py-1 m-1">Delete</button>
        </div>
      ))}
    </div>
  );
}
