"use client";

import Aside from "@/components/Dashboard/Aside";
import ResizeAttention from "@/components/ResizeAttention";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { session, status } = useSession();
  const router = useRouter();

  if (session.user.role !== "admin" || status === "unauthenticated") {
    router.push("/");
  }

  return (
    <>
      <ResizeAttention />
      <div className="w-full flex h-full">
        <div className="basis-[14%]">
          <Aside />
        </div>
        <div className="w-full basis-[86%] overflow-x-auto bg-gray-100 h-full px-3 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
