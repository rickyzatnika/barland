"use client"

import { usePathname } from "next/navigation"

const Footer = () => {

    const pathname = usePathname

    return (
        <div className={`${pathname === "/login" ? "block" : "hidden"}`}>Footer</div>
    )
}

export default Footer