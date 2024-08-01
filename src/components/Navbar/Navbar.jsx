"use client"

import Image from "next/image"
import Link from "next/link"
import MobileNav from "./MobileNav"
import AuthLink from "./AuthLink"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"

const Navbar = () => {

  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <div className='w-full h-20 bg-white  flex items-center justify-between fixed top-0 left-0 z-50 shadow-sm px-4 sm:px-12 md:px-20 lg:px-28 2xl:px-32'>
      <Link prefetch={false} href={"/"}>
        <Image src="/logo.jpeg" alt="" width={64} height={64} className="w-16 h-16" priority={true} />
      </Link>
      <div className="hidden sm:flex items-center gap-6 text-sm uppercase">
        <Link className={`${pathname === "/" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/">Home</Link>
        <Link className={`${pathname === "/events" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/events">Event</Link>
        <Link className={`${pathname === "/about" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/about">About</Link>
        <Link className={`${pathname === "/help" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/help">Help</Link>
        {session?.user?.role === "admin" &&
          <Link className={`${pathname === "/dashboard" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/dashboard">Dashboard</Link>
        }
        <AuthLink />
      </div>
      <MobileNav />
    </div>
  )
}

export default Navbar