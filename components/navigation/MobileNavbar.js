"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Calendar,
  PenBoxIcon,
  BetweenHorizonalStart,
  Users,
} from "lucide-react";

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white shadow-lg border sm:hidden">
      <div className="flex justify-around items-center p-2 shadow-md">
        <NavItem href="/" icon={Home} label="Home" active={pathname === "/"} />
        <NavItem
          href="/services"
          icon={BetweenHorizonalStart}
          label="Services"
          active={pathname === "/services"}
        />
        <NavItem
          href="/calender"
          icon={Calendar}
          label="Calendar"
          active={pathname === "/calender"}
        />
        <NavItem
          href="/blog"
          icon={PenBoxIcon}
          label="C-Blog"
          active={pathname === "/blog"}
        />
        <NavItem
          href="/members"
          icon={Users}
          label="Members"
          active={pathname === "/members"}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center transition-all p-2 ${
        active ? "text-blue-400 bg-gray-700 rounded-full" : "text-gray-900"
      }`}
    >
      <Icon size={20} />
      <span className="text-xs font-small">{label}</span>
    </Link>
  );
};

export default MobileNavbar;
