"use client";

import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import AuthLink from "./AuthLink";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { theme } = useContext(ThemeContext);
  const [showMenu, setShowMenu] = useState(false);
  const isDashboard = pathname.startsWith("/dashboard");

  return (
    <div
      className={`w-full h-20 second  flex items-center justify-between fixed top-0 right-0 left-0 z-50 shadow-md  px-4 sm:px-12 md:px-20 lg:px-28 2xl:px-32 ${isDashboard ? "hidden" : "fixed"
        } ${theme === "light" ? "shadow-gray-600" : "shadow-gray-900"} `}
    >
      <div onClick={() => setShowMenu(false)} className="flex flex-1">
        <Link prefetch={false} href={"/"}>
          <Image
            src="/logo.png"
            alt=""
            width={45}
            height={45}
            style={{ width: "auto", height: "auto" }}
            priority={true}
          />
        </Link>
      </div>

      <div className="hidden text-center sm:flex flex-1 mr-auto items-center gap-6 tracking-widest text-sm uppercase">
        <Link
          className={`font-medium ${pathname === "/"
            ? "text-lime-500 border-b border-lime-500 pb-1"
            : " text-gray-400 hover:text-lime-500 pb-1"
            }`}
          prefetch={false}
          href="/"
        >
          Home
        </Link>
        <Link
          className={`font-medium ${pathname === "/events"
            ? "text-lime-500 border-b border-lime-500 pb-1"
            : " text-gray-400 hover:text-lime-500 pb-1"
            }`}
          prefetch={false}
          href="/events"
        >
          Event
        </Link>
        <Link
          className={`font-medium ${pathname === "/about"
            ? "text-lime-500 border-b border-lime-500 pb-1"
            : " text-gray-400 hover:text-lime-500 pb-1"
            }`}
          prefetch={false}
          href="/about"
        >
          About
        </Link>
        <Link
          className={`font-medium ${pathname === "/help"
            ? "text-lime-500 border-b border-lime-500 pb-1"
            : " text-gray-400 hover:text-lime-500 pb-1"
            }`}
          prefetch={false}
          href="/help"
        >
          Help
        </Link>

        {status === "authenticated" && session?.user?.role === "user" ? (
          <>
            <Link
              className={`font-medium ${pathname === "/profile"
                ? "text-lime-500 border-b border-lime-500 pb-1"
                : "text-gray-400 hover:text-lime-500 pb-1"
                }`}
              prefetch={false}
              href="/profile"
            >
              Profile
            </Link>
          </>
        ) : (
          ""
        )}
        {session?.user?.role === "admin" ||
          session?.user?.role === "master" && (
            <Link
              className={`font-medium ${pathname === "/dashboard"
                ? "text-lime-500 border-b border-green-500 pb-1"
                : "text-gray-400 hover:text-lime-500 pb-1"
                }`}
              prefetch={false}
              href="/dashboard"
            >
              Dashboard
            </Link>
          )}
      </div>

      <div className="flex flex-1 gap-3 items-center">
        <AuthLink />
        <MobileNav showMenu={showMenu} setShowMenu={setShowMenu} />
      </div>
    </div>
  );
};

export default Navbar;
