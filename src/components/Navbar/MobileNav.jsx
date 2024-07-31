"use client"

import Link from "next/link"
import { useState } from "react"
import { IoIosHome } from "react-icons/io";
import { MdOutlineEmojiEvents, MdOutlineSpaceDashboard } from "react-icons/md";
import { BiSolidBookContent } from "react-icons/bi";
import { FaRegAddressBook } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";


const MobileNav = () => {


  const [showMenu, setShowMenu] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <div className='block sm:hidden '>
      <div onClick={() => setShowMenu(prev => !prev)} className="flex flex-col items-center gap-[4.5px] cursor-pointer ">
        <div className={` w-6 h-1 bg-gray-700 transition-all duration-150 ease-linear rounded-md  ${showMenu ? "rotate-45" : ""} origin-left`} />
        <div className={` w-4 h-1 bg-gray-700 ml-auto transition-all duration-150 ease-linear rounded-md ${showMenu ? "opacity-0" : "opacity-100"} `} />
        <div className={` w-6 h-1 bg-gray-700  transition-all duration-150 ease-linear rounded-md ${showMenu ? "-rotate-45" : ""} origin-left`} />
      </div>


      <div className={`w-full fixed border-t-2 border-green-500 px-6 py-18 bg-white z-40 top-20 left-0 transition-all duration-200 ease-linear flex flex-col items-start h-96 justify-center overflow-hidden gap-8 ${showMenu ? " translate-x-0 opacity-100  " : "top-20 opacity-0 -translate-x-[100%] -z-50"}`}>
        <div onClick={() => setShowMenu(false)} className={` flex gap-2 w-full border-b pb-2 ${pathname === "/" ? "text-green-500 border-green-500" : "border-gray-400 text-gray-400/80"}`}>
          <IoIosHome size={24} />
          <Link className="text-md  uppercase" href={"/"}>Home</Link>
        </div>
        <div onClick={() => setShowMenu(false)} className={` flex gap-2 w-full border-b pb-2 ${pathname === "/event" ? "text-green-500 border-green-500" : "border-gray-400 text-gray-400/80"}`}>
          <MdOutlineEmojiEvents size={24} />
          <Link className="text-md  uppercase" href={"/events"}>Event</Link>
        </div>
        <div onClick={() => setShowMenu(false)} className={` flex gap-2 w-full border-b pb-2 ${pathname === "/about" ? "text-green-500 border-green-500" : "border-gray-400 text-gray-400/80"}`}>
          <BiSolidBookContent size={24} />
          <Link className="text-md  uppercase" href={"/about"}>About</Link>
        </div>
        <div onClick={() => setShowMenu(false)} className={` flex gap-2 w-full border-b pb-2 ${pathname === "/help" ? "text-green-500 border-green-500" : "border-gray-400 text-gray-400/80"}`}>
          <FaRegAddressBook size={24} />
          <Link className="text-md  uppercase" href={"/help"}>Help</Link>
        </div>
        {session?.user?.role === "admin" &&
          <div onClick={() => setShowMenu(false)} className="flex gap-2 w-full border-b pb-2 border-gray-400 text-gray-400/80">
            <MdOutlineSpaceDashboard size={24} />
            <Link className={`${pathname === "/dashboard" ? "text-green-500 border-b border-green-500 pb-1" : "text-gray-400/70 hover:text-green-500 pb-1"}`} prefetch={false} href="/dashboard">Dashboard</Link>
          </div>

        }
        {!session ? (
          <div onClick={() => setShowMenu(false)} className="flex gap-2 w-full border-b pb-2 border-gray-400 text-gray-400/80">
            <FaRegAddressBook size={24} />
            <Link className="text-md  uppercase" href={"/login"}>Login</Link>
          </div>
        ) : (
          <div onClick={() => setShowMenu(false)} className="text-gray-600 flex gap-2 w-full border-b pb-2 border-gray-400">
            <FaRegAddressBook size={24} />
            <button className="cursor-pointer">Logout</button>
          </div>
        )}
      </div>


    </div>
  )
}

export default MobileNav