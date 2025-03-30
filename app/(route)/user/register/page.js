"use client";

import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Registering...");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        setFormData({ name: "", email: "", password: "" });
        const data = await response.json();
        localStorage.setItem('token', data.token); // ✅ Store token correctly
        setTimeout(() => {
          window.location.href = "/user/dashboard";
        });
      } else {
        setMessage("Registration failed. Try again.");
      }
    } catch (error) {
      setMessage("Error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex items-center justify-center md:min-h-screen bg-gray-900 text-white p-4">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold">User Registration</h1>
        <p className="text-gray-400 mt-2">Create an account to get started.</p>
        <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-semibold transition-all"
          >
            Register
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-gray-300">{message}</p>}

        <p className="mt-4 text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/user/login" className="text-blue-400 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
