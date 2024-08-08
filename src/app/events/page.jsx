"use client"

import { ThemeContext } from "@/context/ThemeContext";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import useSWR from "swr";
import moment from "moment";

const EventPage = () => {


  const fetcher = (...agate) => fetch(...agate).then((res) => res.json());
  const { data } = useSWR(`https://newsapi.org/v2/top-headlines?country=id&apiKey=dc81d810995240b7b85d6f866138cdb3`, fetcher);
  const [news, setNews] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (data) {
      return setNews(data?.articles);
    }
  }, [data])

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <h1 className="text-3xl font-medium mb-2 sm:mb-8">Berita Terbaru</h1>
      <div className="flex flex-col gap-8 ">
        {news?.map((art, i) => (
          <div key={i} className={`p-4 sm:p-6 flex flex-col gap-4 rounded-md shadow-lg ${theme === "light" ? "bg-gray-100 text-gray-600 shadow-slate-300" : "bg-slate-800 text-gray-300 shadow-gray-950"}`}>
            <div className="flex flex-col sm:flex-row gap-2 py-2 ">
              <p className="text-xs shadow-md shadow-gray-300 w-fit dark:shadow-slate-900 capitalize py-1 px-3 bg-gray-200 rounded-full dark:bg-slate-700 dark:text-slate-100">Sumber : {art?.author}</p>
              <p className="text-xs shadow-md shadow-gray-300 w-fit dark:shadow-slate-900 py-1 px-3 bg-gray-200 rounded-full dark:bg-slate-700 dark:text-slate-100">Publish : {moment(art?.publishedAt).format('lll')}</p>
            </div>
            <h3 className="text-lg font-medium mb-3">{art?.title}</h3>
            <Link className="text-xs rounded py-2 px-4 w-fit second text-white dark:bg-gray-50 dark:text-gray-600 hover:bg-slate-700 hover:text-slate-200 dark:hover:bg-slate-900 dark:hover:text-gray-50 transition-all duration-150" target="_blank" href={art?.url}>Lihat berita</Link>
            {/* <Image src={art?.urlToImage} alt="news" width={70} height={70} style={{ width: "auto", height: "auto" }} /> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventPage