"use client";

import { Suspense } from "react";
import ManageMemberPage from "@/components/custom/ManageMemberPage";
import { FaTruckLoading } from "react-icons/fa";

export default function Page() {
  return (
    <Suspense fallback={<FaTruckLoading />}>
      <ManageMemberPage />
    </Suspense>
  );
}
