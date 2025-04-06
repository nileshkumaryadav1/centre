import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import Hero from "./Hero";

export function BackgroundBeam() {
  return (
    <BackgroundBeamsWithCollision>
      <Hero />
    </BackgroundBeamsWithCollision>
  );
}
