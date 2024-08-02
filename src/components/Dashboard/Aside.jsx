"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { FaUserCog } from "react-icons/fa";
import { RiCalendarEventFill } from "react-icons/ri";
import { IoIosHome } from "react-icons/io";
import { LuActivitySquare } from "react-icons/lu";
import { MdFeaturedPlayList } from "react-icons/md";



const asideLink = [
  {
    id: "1",
    title: "dashboard",
    icon: <IoIosHome size={24} />,
    link: "/dashboard",
  },
  {
    id: "2",
    title: "activity",
    icon: <LuActivitySquare size={24} />,
    link: "/dashboard/activity",
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
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session?.user || status === "unauthenticated") {
      router.push("/");
    }
  }, [router, session, status]);

  return (
    <div className="fixed py-5 px-4 left-0 top-3 z-10 ">
      <p>{session?.user?.name}</p>
      {asideLink.map((item) => (
        <div key={item?.id}>
          <Link href={item?.link} className="flex  gap-2">
            <span>{item?.icon}</span>
            <h3>{item?.title}</h3>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Aside;
