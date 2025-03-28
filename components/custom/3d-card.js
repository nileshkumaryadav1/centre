"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

export function ThreeDCardDemo({ services }) {
  return (
      <CardContainer className="inter-var">
        {services.map((service) => (
          <CardBody
            key={service._id}
            className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border"
          >
            <CardItem
              translateZ="50"
              className="text-xl font-bold text-neutral-600 dark:text-white"
            >
              {service.title}
            </CardItem>
            <CardItem
              as="p"
              translateZ="60"
              className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
            >
              {service.description}
            </CardItem>
            <CardItem translateZ="100" className=" mt-4">
              <img
                src={service.imageUrl}
                height="400"
                width="400"
                className="md:h-100 md:w-100 object-cover rounded-xl group-hover/card:shadow-xl"
                alt="thumbnail"
              />
            </CardItem>
            <div className="flex justify-end items-center mt-20">
              <CardItem
                translateZ={20}
                as={Link}
                href={service.link}
                target="__blank"
                className="px-4 py-2 rounded-xl font-normal dark:text-white text-white text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors duration-200"
              >
                Join →
              </CardItem>
            </div>
          </CardBody>
        ))}
      </CardContainer>
  );
}
