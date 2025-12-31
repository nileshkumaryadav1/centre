"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const links = [
    { name: "Dashboard", href: "/admin" },
    { name: "Events", href: "/admin/events" },
    { name: "Clubs", href: "/admin/clubs" },
    { name: "Blogs", href: "/admin/blogs" },
    { name: "Members", href: "/admin/members" },
    { name: "Birthday", href: "/admin/birthday" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= Sidebar ================= */}
      <aside className="w-64 bg-white border-r shadow-sm fixed inset-y-0 left-0">
        <div className="p-6 font-bold text-xl text-blue-600">Admin Panel</div>

        <nav className="flex flex-col gap-1 px-4">
          {links.map((link) => {
            const active = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
