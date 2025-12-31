"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import MobileNavbar from "@/components/navigation/MobileNavbar";
import Footer from "@/components/navigation/Footer";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <main className={isAdminRoute ? "" : "mt-12 md:mt-16"}>{children}</main>
      {!isAdminRoute && <MobileNavbar />}
      {!isAdminRoute && <Footer />}
    </>
  );
}
