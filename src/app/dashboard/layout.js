"use client";

import Aside from "@/components/Dashboard/Aside";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function DashboardLayout({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 620 && window.innerWidth <= 1920) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Set visibility on initial load
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!isVisible) {
    return (
      <div className="w-full px-3 h-screen gap-6 fixed top-0 left-0 z-[9999] flex flex-col items-center justify-evenly">
        <div className="text-center flex flex-col items-center">
          <Image
            src="/sad.svg"
            alt="sad-emoticon"
            width={100}
            height={100}
            priority={true}
            className="animate-spin-slow mb-2"
          />
          <h1 className="text-lg font-semibold antialiased leading-relaxed text-gray-600 dark:text-gray-400">
            Mohon maaf, halaman Dashboard hanya bisa dilihat pada layar
            laptop/PC .
          </h1>
        </div>
        <Link
          className="text-gray-500 text-lg dark:text-gray-400 underline"
          href="/"
        >
          {" "}
          Kembali ke Beranda
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex">
      <div className="basis-52">
        <Aside />
      </div>
      <div className="relative flex-grow w-full h-full px-4 py-4">
        {children}
      </div>
    </div>
  );
}
