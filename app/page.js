"use client";

import { BackgroundBeam } from "@/components/custom/BackgroundBeam";
import WhatWeDo from "@/components/home/WhatWeDo";
import UpcomingRecentEvents from "@/components/home/UpcomingRecentEvents";
import ClubsSnapshot from "@/components/home/ClubsSnapshot";
import WhyJoinUs from "@/components/home/WhyJoinUs";
import CallToAction from "@/components/home/CallToAction";

export default function Home() {
  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 `}
    >
      <div className="text-center">
        {/* Hero Section */}
        <BackgroundBeam />

        {/* What do we do? */}
        <WhatWeDo />

        {/* Upcoming / Recent Events */}
        <UpcomingRecentEvents />

        {/* Clubs Snapshot */}
        <ClubsSnapshot />

        {/* Why Join Us */}
        <WhyJoinUs />

        {/* Call To Action */}
        <CallToAction />

        {/* World Map Section */}
        {/* <WorldMapCard /> */}
      </div>
    </div>
  );
}
