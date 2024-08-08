"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Footer = () => {

  const pathname = usePathname();
  const isDashboard = pathname.startsWith('/dashboard');


  return (
    <div className={`${pathname === "/login" || isDashboard ? "hidden" : " block w-full"}`}>
      <footer className="second rounded-tr-2xl rounded-tl-2xl shadow dark:bg-slate-800 ">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link prefetch={false} href="/" className="w-fit flex flex-col gap-3 items-start mb-4 sm:mb-0  rtl:space-x-reverse">
              <Image src="/logo.png" priority={true} width={60} height={60} style={{ width: "auto", height: "auto" }} className="object-cover" alt="Logo Barland" />
              <span className="text-xs sm:text-sm text-gray-400" >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Error, magnam.</span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-400 sm:mb-0">
              <li>
                <Link prefetch={false} href="/about" className="hover:underline me-4 md:me-6">About</Link>
              </li>
              <li>
                <Link prefetch={false} href="/contact" className="hover:underline me-4 md:me-6">Contact</Link>
              </li>
              <li>
                <Link prefetch={false} href="/terms-conditions" className="hover:underline me-4 md:me-6">Terms & Conditions</Link>
              </li>
              <li>
                <Link prefetch={false} href="/privacy-police" className="hover:underline me-4 md:me-6">Privacy Policy</Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-lime-500 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-400 sm:text-center ">© 2024 <Link href="/" className="hover:underline">Barland™</Link>. All Rights Reserved.</span>
        </div>
      </footer>
    </div>
  )
}

export default Footer