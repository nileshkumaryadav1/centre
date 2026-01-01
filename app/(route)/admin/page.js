"use client";

export default function AdminDashboard() {
  return (
    <div className="flex flex-col min-h-full w-full p-4">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-start bg-white rounded-xl shadow-sm p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome to Admin Dashboard 👋
        </h1>
        <p className="text-gray-600 mt-2">
          Manage blogs, events, clubs, and members from one place.
        </p>
      </div>

      {/* Stats Section */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="flex-1 min-w-[220px] bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm text-gray-500">Total Blogs</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">..</p>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm text-gray-500">Events</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">..</p>
        </div>

        <div className="flex-1 min-w-[220px] bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-sm text-gray-500">Members</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">..</p>
        </div>
      </div>

      {/* Quick Actions */}
      {/* <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            onClick={() => {
              alert("Use Sidebar Navigation.");
            }}
          >
            + Add Blog
          </button>

          <button
            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            onClick={() => {
              alert("Use Sidebar Navigation.");
            }}
          >
            Manage Events
          </button>

          <button
            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
            onClick={() => {
              alert("Use Sidebar Navigation.");
            }}
          >
            View Members
          </button>
        </div>
      </div> */}
    </div>
  );
}
