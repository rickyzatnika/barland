"use client"

import { usePathname } from "next/navigation";

const Wrapper = ({ children }) => {

    const pathname = usePathname();

    const isDashboard = pathname.startsWith('/dashboard');

    return (
        <div className={`${isDashboard ? "pt-0" : "pt-20"}`}>{children}</div>
    )
}

export default Wrapper