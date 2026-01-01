"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";
import { useEffect, useState } from "react";

import {
  LayoutDashboard,
  Calendar,
  Users,
  FileText,
  Settings,
  Gift,
  Layers,
  Menu,
  X,
  Home,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ Validate admin directly with DB
  const validateAdmin = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("admin"));

      // Skip check if already on login page
      if (pathname === "/admin/login") {
        setAuthChecked(true);
        return;
      }

      // No localStorage user → redirect
      if (!user || (user.role !== "admin" && user.role !== "superadmin")) {
        localStorage.removeItem("admin");
        router.replace("/admin/login");
        return;
      }

      // Fetch all admins from DB
      const res = await axios.get("/api/admin/login");
      const admins = res.data.admins || [];

      // Check if localStorage admin exists in DB
      const match = admins.find((a) => a.email === user.email);

      if (!match) {
        // ❌ Not in DB → logout
        localStorage.removeItem("admin");
        router.replace("/admin/login");
        return;
      }

      // ✅ Valid admin
      setAdminUser(user);
      setAuthChecked(true);
    } catch (err) {
      console.error("Admin validation failed:", err);
      localStorage.removeItem("admin");
      router.replace("/admin/login");
    }
  };

  // Run validation on mount + pathname change
  useEffect(() => {
    validateAdmin();
  }, [pathname]);

  // ✅ Close sidebar with ESC
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && setSidebarOpen(false);
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleLogout = () => {
    if (!confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("admin");
    setAdminUser(null);
    router.replace("/admin/login");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(false);
        setMobileOpen(false);
      } else {
        setMobileOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!authChecked) {
    return (
      <div className="flex flex-col justify-center items-center px-6 py-10 gap-2 text-[color:var(--foreground)] bg-[color:var(--background)]">
        loading....
      </div>
    );
  }

  const links = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Events", href: "/admin/events", icon: Calendar },
    { name: "Clubs", href: "/admin/clubs", icon: Layers },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Members", href: "/admin/members", icon: Users },
    { name: "Birthday", href: "/admin/birthday", icon: Gift },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ================= Overlay (Mobile) ================= */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ================= Sidebar ================= */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-40 bg-white border-r shadow-sm
          transition-all duration-300
          ${sidebarWidth}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          {!collapsed && (
            <span className="font-bold text-lg text-blue-600 whitespace-nowrap">
              Admin Panel
            </span>
          )}

          <button
            onClick={() =>
              window.innerWidth < 768
                ? setMobileOpen(false)
                : setCollapsed(!collapsed)
            }
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="md:hidden" />
            <Menu className="hidden md:block" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-3">
          {links.map((link) => {
            const active = pathname === link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-lg transition
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-blue-50"
                  }
                `}
              >
                <Icon className="w-5 h-5 shrink-0" />

                {!collapsed && (
                  <span className="whitespace-nowrap">{link.name}</span>
                )}
              </Link>
            );
          })}

          {/* Back to Home */}
          <Link
            href="/"
            className="mt-20 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-medium bg-[var(--foreground)]/5 hover:bg-[var(--foreground)]/10 text-[var(--foreground)]/80 hover:text-[var(--foreground)] border border-[var(--border)] shadow transition-all active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>User Home</span>
          </Link>
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <main
        className={`
          flex-1 transition-all duration-300
          ${collapsed ? "md:ml-20" : "md:ml-64"}
        `}
      >
        {/* Mobile Top Bar */}
        <div className="md:hidden mb-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg bg-white shadow border"
          >
            <Menu />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
