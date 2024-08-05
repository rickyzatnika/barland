"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCog } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { MdFeaturedPlayList } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";



const asideLink = [
  {
    id: "1",
    title: "dashboard",
    icon: <IoIosHome size={24} />,
    link: "/dashboard",
  },
  {
    id: "2",
    title: "List riders",
    icon: <LuActivitySquare size={24} />,
    link: "/dashboard/list-riders",
  },
  {
    id: "3",
    title: "event",
    icon: <RiCalendarEventFill size={24} />,
    link: "/dashboard/event",
  },
  {
    id: "4",
    title: "class",
    icon: <MdFeaturedPlayList size={24} />,
    link: "/dashboard/list-kelas",
  },
  {
    id: "5",
    title: "user",
    icon: <FaUserCog size={24} />,
    link: "/dashboard/users",
  },
];

const Aside = () => {
  const { data: session } = useSession();

  const pathname = usePathname();



  return (
    <div className="h-screen w-full bg-gray-50 max-h-full flex items-center gap-8 flex-col justify-between sticky pt-6 left-0 top-0 z-10 ">
      <Link href="/" className="flex items-center  border-b pb-2 w-full">
        <MdAdminPanelSettings size={40} className="w-full text-lime-500" />
        <p className="uppercase w-full">{session?.user?.name}</p>
      </Link>
      <div className="w-full">
        {asideLink.map((item) => (
          <div key={item?.id} className="w-full flex flex-col  gap-3 justify-between">
            <Link href={item?.link} className={`w-full text-sm overflow-hidden relative uppercase flex items-center text-gray-600 dark:text-gray-400 gap-2 py-2.5 px-4 mb-6 transition-all ease-linear duration-100 ${pathname === item?.link ? "second text-white" : " hover:bg-[#081225]  hover:shadow-md hover:text-white "}`}>
              <span className={`${pathname === item?.link ? "absolute w-4 h-full my-auto shadow-inner bg-gray-100 right-0 triangle" : "hidden"}`} />
              <span>{item?.icon}</span>
              <h3>{item?.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div></div>
      <div></div>
      <button onClick={() => signOut()} type="button" className="w-full focus:outline-none text-white bg-gradient-to-tr from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 focus:ring-4 focus:ring-green-300 font-medium text-sm py-2.5  dark:bg-lime-600 dark:hover:bg-lime-700 dark:focus:ring-green-800">Logout</button>
    </div>
  );
};

export default Aside;
