"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from storage

      if (!token) {
        router.push("/user/login"); // ✅ Redirect if no token
        return;
      }

      try {
        const response = await fetch("/api/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Send token properly
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          localStorage.removeItem("token"); // ✅ Remove invalid token
          router.push("/user/login"); // ✅ Redirect if unauthorized
        }
      } catch (error) {
        localStorage.removeItem("token");
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading)
    return <p className="text-center text-gray-400 mt-4">Loading...</p>;

  return (
    <div className="flex items-center justify-center md:min-h-screen p-5 bg-gray-900 text-white">
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg w-full max-w-md text-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {user ? (
          <>
            <img
              src={user.avatar || "/logo.jpg"}
              alt="User Avatar"
              className="w-20 h-20 rounded-full mx-auto mt-4 border-2 border-gray-600"
            />
            <p className="text-gray-400 mt-2 text-lg font-medium">
              Welcome, {user.name}!
            </p>
            <p className="text-gray-500 text-sm">{user.email}</p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition duration-300 w-full"
              onClick={() => {
                localStorage.removeItem("token"); // ✅ Logout functionality
                router.push("/user/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <p className="text-gray-400 mt-2">Not authorized</p>
        )}
      </div>
    </div>
  );
};

export default Page;
