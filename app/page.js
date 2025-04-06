"use client";

import MembersPage from "./(route)/(visible)/members/page";
import Blogs from "./(route)/(visible)/blog/page";
import About from "./(route)/(visible)/about/page";
import Services from "./(route)/(visible)/services/page";
import { BackgroundBeam } from "@/components/custom/BackgroundBeam";

export default function Home() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 `}
    >
      <div className="text-center">
        {/* Hero Section */}
        <BackgroundBeam />

        {/* 3D Services Section */}
        <Services />

        {/* members section */}
        <MembersPage />

        {/* Blogs Section */}
        <Blogs />

        {/* about us section */}
        <About />

        {/* World Map Section */}
        {/* <WorldMapCard /> */}
      </div>
    </div>
  );
}
