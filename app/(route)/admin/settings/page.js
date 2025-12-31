// "use client";

// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Loader2, LogOut, UserPlus, Trash2, SunMoon } from "lucide-react";

// export default function AdminSettingsPage() {
//   const [admin, setAdmin] = useState(null);
//   const [theme, setTheme] = useState("light");
//   const [newAdmin, setNewAdmin] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [allAdmins, setAllAdmins] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const adminData = JSON.parse(localStorage.getItem("admin"));
//     setAdmin(adminData);
//     setTheme(localStorage.getItem("theme") || "light");
//     fetchAllAdmins();
//   }, []);

//   const fetchAllAdmins = async () => {
//     try {
//       const res = await axios.get("/api/admin/login");
//       setAllAdmins(res.data.admins || []);
//     } catch (err) {
//       console.error("Failed to fetch admins:", err);
//     }
//   };

//   const handleAddAdmin = async () => {
//     if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
//       alert("Please fill all fields.");
//       return;
//     }

//     setLoading(true);
//     try {
//       await axios.post("/api/admin/add", newAdmin);
//       alert("✅ New admin added!");
//       setNewAdmin({ name: "", email: "", password: "" });
//       fetchAllAdmins();
//     } catch (err) {
//       alert("❌ Failed to add admin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteAdmin = async (id, email) => {
//     if (email === admin?.email) {
//       alert("⚠️ You cannot delete your own admin account.");
//       return;
//     }
//     if (!window.confirm(`Delete admin: ${email}?`)) return;

//     setLoading(true);
//     try {
//       const response = await axios.delete(`/api/admin/delete/${id}`);
//       if (response.data?.success) {
//         alert("✅ Admin deleted successfully.");
//         fetchAllAdmins();
//       } else {
//         alert(`❌ Failed: ${response.data?.error || "Unknown error"}`);
//       }
//     } catch (err) {
//       console.error("Delete admin error:", err);
//       alert("❌ Unexpected error while deleting admin.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("admin");
//     window.location.href = "/admin/login";
//   };

//   return (
//     <div className="md:p-8 p-4 space-y-6 text-[color:var(--foreground)]">
//       {/* Header */}
//       <h1 className="md:text-3xl text-2xl font-bold text-center text-[color:var(--highlight)]">
//         Admin Settings ⚙️
//       </h1>

//       {/* Admin Details */}
//       <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/60 backdrop-blur-xl p-5 shadow-md space-y-2">
//         <p>
//           <strong>Name:</strong> {admin?.name}
//         </p>
//         <p>
//           <strong>Email:</strong> {admin?.email}
//         </p>
//         <p>
//           <strong>Role:</strong> {admin?.role}
//         </p>
//       </div>

//       {/* Superadmin-only Actions */}
//       {admin?.role === "superadmin" && (
//         <>
//           {/* Add Admin */}
//           <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/60 backdrop-blur-xl p-6 shadow-md space-y-4">
//             <h2 className="text-lg font-semibold flex items-center gap-2 text-[color:var(--accent)]">
//               <UserPlus className="w-5 h-5" /> Add New Admin
//             </h2>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 value={newAdmin.name}
//                 onChange={(e) =>
//                   setNewAdmin({ ...newAdmin, name: e.target.value })
//                 }
//                 className="p-2 border border-[color:var(--border)] rounded-lg bg-transparent focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
//               />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={newAdmin.email}
//                 onChange={(e) =>
//                   setNewAdmin({ ...newAdmin, email: e.target.value })
//                 }
//                 className="p-2 border border-[color:var(--border)] rounded-lg bg-transparent focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
//               />
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={newAdmin.password}
//                 onChange={(e) =>
//                   setNewAdmin({ ...newAdmin, password: e.target.value })
//                 }
//                 className="p-2 border border-[color:var(--border)] rounded-lg bg-transparent focus:ring-2 focus:ring-[color:var(--accent)] outline-none"
//               />
//             </div>
//             <button
//               onClick={handleAddAdmin}
//               disabled={loading}
//               className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:scale-105 transition disabled:opacity-60"
//             >
//               {loading ? (
//                 <Loader2 className="w-4 h-4 animate-spin" />
//               ) : (
//                 <UserPlus className="w-4 h-4" />
//               )}
//               {loading ? "Adding..." : "Add Admin"}
//             </button>
//           </div>

//           {/* List All Admins */}
//           <div className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card)]/60 backdrop-blur-xl p-6 shadow-md space-y-4">
//             <h2 className="text-lg font-semibold text-center text-[color:var(--accent)]">
//               👥 All Admins
//             </h2>
//             <ul className="divide-y divide-[color:var(--border)]">
//               {allAdmins.map((a) => (
//                 <li
//                   key={a._id}
//                   className="flex items-center justify-between py-3"
//                 >
//                   <div>
//                     <p className="font-medium">
//                       {a.name} ({a.role})
//                     </p>
//                     <p className="text-sm text-[color:var(--secondary)]">
//                       {a.email}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => handleDeleteAdmin(a._id, a.email)}
//                     disabled={loading || a.email === admin?.email}
//                     className="flex items-center gap-2 text-red-600 border border-red-600 px-3 py-1 rounded-lg text-sm hover:bg-red-600 hover:text-white transition disabled:opacity-50"
//                   >
//                     <Trash2 className="w-4 h-4" />
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </>
//       )}

//       {/* Logout */}
//       <div className="pt-4 flex justify-center">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition cursor-pointer"
//         >
//           <LogOut className="w-5 h-5" />
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

import React from "react";

export default function AdminSettingsPage() {
  return <div>AdminSettingsPage</div>;
}
