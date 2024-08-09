"use client"

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EventPage = () => {

  const [loading, setLoading] = useState(false);
  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_PRO}/api/event`, fetcher);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {

    if (!data) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
    }

    mutate();

  }, [data, mutate])



  return (
    <div className="w-full h-full py-8">
      <div className="flex items-center justify-between mb-6 ">
        <h1 className="text-3xl font-medium mb-6">{loading ? "loading data..." : <span className="border-b pb-1 border-lime-500">Berita Terbaru</span>}</h1>
        <input type="search" className="py-2 px-4 rounded-xl border-gray-400 text-gray-500 focus:border-lime-400 focus:outline-none focus:ring-0" placeholder="search" />
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-1">
        {data?.map((e, i) => (
          <Link href={`/events/${e?.slug}`} key={i} className={`w-full group overflow-hidden h-full   flex items-center flex-col gap-2 rounded-md shadow-lg ${theme === "light" ? "bg-gray-100 text-gray-600 shadow-slate-300" : "bg-slate-800 text-gray-300 shadow-gray-950"}`}>
            <div className="overflow-hidden w-full">
              <Image src={e?.imageUrl} alt={e?.title} width={384} height={384} className="w-full group-hover:scale-150 transition-all ease-in-out duration-[4000ms] object-contain" priority={true} />
            </div>
            <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-0 sm:items-center justify-between w-full px-1">
              <div className="flex items-center gap-1 ">
                <span className="text-xs text-gray-500 dark:text-gray-200" >Di posting :</span>
                <span className="text-xs px-1 py-0.5 rounded-full text-gray-500 bg-slate-200 shadow dark:bg-slate-700 dark:text-gray-200 w-fit">{e?.publishedAt}</span>
              </div>
              <div>{e?.category.map((c, i) => (<p className="text-xs text-gray-500 dark:text-gray-200" key={i}>Kategori : <span className="text-xs px-2 py-0.5 rounded-full text-gray-500 bg-slate-200 shadow dark:bg-slate-700 dark:text-gray-200 w-fit">{c.name}</span></p>))}</div>
            </div>

            <div className="w-full px-2 py-4 flex flex-col gap-4 antialiased">
              <h1 className="text-lg sm:text-xl font-medium">{e?.title}</h1>
              {/* <p className="text-sm pl-1 text-gray-500 font-medium dark:text-gray-300">{e?.desc}</p> */}
              <p className="py-1.5 px-5 group second shadow-md hover:bg-slate-950 hover:text-gray-50 text-gray-200  text-md w-fit rounded-lg" >
                Detail
              </p>
            </div>
          </Link>
        ))}
      </div>

    </div >
  )
}

export default EventPage