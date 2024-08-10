"use client"

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import Image from "next/image";


const fetcher = (...args) => fetch(...args).then((res) => res.json());

const EventPage = () => {

  const [query, setQuery] = useState(""); // State untuk query pencarian
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false); // State untuk mencatat pencarian yang tidak ditemukan
  const { theme } = useContext(ThemeContext);
  const { data, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_PRO}/api/event${query ? `?q=${query}` : ""}`,
    fetcher
  );

  useEffect(() => {
    if (!data) {
      setLoading(true);
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timeoutId);
    } else {
      setLoading(false);
      setNotFound(data?.events?.length === 0); // Atur notFound jika tidak ada hasil pencarian
    }

    mutate();
  }, [data, mutate]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setLoading(true);
  };



  return (
    <div className="w-full h-full pb-12 py-2 sm:py-4 md:py-8">
      <div className="flex items-start justify-between mb-6 ">
        <h1 className="text-xl md:text-3xl font-medium mb-6">{loading ? "loading data..." : <span className="border-b pb-1 border-lime-500">Berita Terbaru</span>}</h1>
        <input onChange={handleSearch} type="search" className="w-28 sm:w-36 md:w-3/12 lg:w-4/12 py-1 md:py-2 px-4 placeholder:text-sm rounded-xl border-gray-400 text-gray-500 focus:border-lime-400 focus:outline-none focus:ring-0" placeholder="cari kategori" />
      </div>
      {/* Pesan peringatan jika tidak ada hasil pencarian */}
      {notFound && (
        <div className="w-full text-center py-8">
          <p className="text-lg text-red-500">Pencarian tidak ditemukan</p>
        </div>
      )}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-1">
        {data?.events?.map((e, i) => (
          <Link href={`/events/${e?.slug}`} key={i} className={`w-full group overflow-hidden h-full   flex items-center flex-col gap-2 rounded-md shadow-lg ${theme === "light" ? "bg-gray-100 text-gray-600 shadow-slate-300" : "bg-slate-800 text-gray-300 shadow-gray-950"}`}>
            <div className="overflow-hidden w-full">
              <Image src={e?.imageUrl} alt={e?.title} width={384} height={384} className="w-full group-hover:scale-150 transition-all ease-in-out duration-[4000ms] object-contain" priority={true} />
            </div>
            <div className="flex flex-col md:flex-row items-start gap-2 md:gap-0 md:items-center justify-between w-full px-1">
              <div className="flex items-center gap-1 ">
                <span className="text-xs text-gray-500 dark:text-gray-200" >Di posting :</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-gray-500 bg-slate-200 shadow dark:bg-slate-700 dark:text-gray-200 w-fit">{e?.publishedAt}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 dark:text-gray-200" >Kategory :</span>
                <span className="text-xs px-2 py-0.5 rounded-full text-gray-500 bg-slate-200 shadow dark:bg-slate-700 dark:text-gray-200 w-fit">{e?.category}</span>
              </div>
            </div>

            <div className="w-full px-2 py-4 flex flex-col gap-4 antialiased">
              <h1 className="text-lg md:text-xl font-medium">{e?.title}</h1>
              {/* <p className="text-sm pl-1 text-gray-500 font-medium dark:text-gray-300">{e?.desc}</p> */}
              <p className="py-1.5 px-5 group second shadow-md hover:bg-slate-950 hover:text-gray-50 text-gray-200 text-sm md:text-md w-fit rounded-lg" >
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