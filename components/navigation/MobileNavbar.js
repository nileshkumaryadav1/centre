"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  UsersRound,
  UserPlus,
  PenLine,
} from "lucide-react";

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white dark:bg-gray-900 border-t shadow-lg sm:hidden">
      <div className="flex justify-around items-center p-2">
        <NavItem href="/" icon={Home} label="Home" active={pathname === "/"} />

        <NavItem
          href="/events"
          icon={CalendarDays}
          label="Events"
          active={pathname === "/events"}
        />

        <NavItem
          href="/clubs"
          icon={UsersRound}
          label="Clubs"
          active={pathname === "/clubs"}
        />

        <NavItem
          href="/join-us"
          icon={UserPlus}
          label="Join Us"
          active={pathname === "/join-us"}
        />

        <NavItem
          href="/blog"
          icon={PenLine}
          label="Blogs"
          active={pathname === "/blog"}
        />
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon: Icon, label, active }) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all
        ${
          active
            ? "text-blue-500 bg-blue-50 dark:bg-gray-800"
            : "text-gray-700 dark:text-gray-400 hover:text-blue-400"
        }`}
    >
      <Icon size={20} strokeWidth={active ? 2.5 : 2} />
      <span className="text-[11px] font-medium">{label}</span>
    </Link>
  );
};

export default MobileNavbar;
