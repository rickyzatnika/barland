"use client";

import Aside from "@/components/Dashboard/Aside";
import ResizeAttention from "@/components/ResizeAttention";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  return (
    <>
      <ResizeAttention />
      <div className="w-full flex h-full gap-1">
        <div className=" relative flex-1">
          <Aside />
        </div>
        <div className="w-[87%] mx-auto  h-full px-4 py-4">{children}</div>
      </div>
    </>
  );
}
