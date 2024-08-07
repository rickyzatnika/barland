"use client";

import Aside from "@/components/Dashboard/Aside";
import ResizeAttention from "@/components/ResizeAttention";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "user") {
      router.push("/");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
    console.log(session);
  }, [router, session, status]);

  return (
    <>
      <ResizeAttention />
      <div className="w-full flex h-full">
        <div className="basis-[14%]">
          <Aside />
        </div>
        <div className="w-full basis-[86%] border-l border-gray-400 dark:border-gray-800 overflow-x-auto h-full px-3 py-4">
          {children}
        </div>
      </div>
    </>
  );
}
