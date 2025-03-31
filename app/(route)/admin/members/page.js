"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ManageMemberPage from "@/components/custom/ManageMemberPage";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ManageMemberPage />
    </Suspense>
  );
}
