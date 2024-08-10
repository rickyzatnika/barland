"use client";

import Aside from "@/components/Dashboard/Aside";
import ResizeAttention from "@/components/ResizeAttention";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useSWR from "swr";

const fetcher =
  (...args) =>
  () =>
    fetch(...args).then((res) => res.json());

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();

  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PRO}/api/daftar`,
    fetcher
  );

  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.role === "user") {
      router.push("/");
    } else if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  // NOTIFICATIONS
  const [notifiedRiders, setNotifiedRiders] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("notifiedRiders");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    const checkForNewRiders = () => {
      if (data && data.riders) {
        const newRidersToNotify = newRiders.filter(
          (rider) => !notifiedRiders.includes(rider._id)
        );
        mutate(); // Ensure data is updated

        if (newRidersToNotify.length > 0) {
          toast.info(`Yeay ${newRidersToNotify.length} rider baru mendaftar!`);

          const updatedNotifiedRiders = [
            ...notifiedRiders,
            ...newRidersToNotify.map((rider) => rider._id),
          ];
          setNotifiedRiders(updatedNotifiedRiders);

          localStorage.setItem(
            "notifiedRiders",
            JSON.stringify(updatedNotifiedRiders)
          );
        }
      }
    };

    checkForNewRiders();
    const intervalId = setInterval(checkForNewRiders, 10000); // Check every minute

    return () => clearInterval(intervalId);
  }, [data, mutate, notifiedRiders]);

  return (
    <>
      <ResizeAttention />
      <ToastContainer theme="dark" />
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
