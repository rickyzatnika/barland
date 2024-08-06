"use client";

import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { SiMicrosoftexcel } from "react-icons/si";
import { toast } from "react-toastify";
import { IoMdClose } from "react-icons/io";
import { RiDeleteBin2Line } from "react-icons/ri";


const TABLE_HEAD = ["No", "Nama", "Nomor Start", "Team", "Kelas", "Action"];
const fetcher = (...args) => fetch(...args).then((res) => res.json());

const SeklomPage = () => {
  const [riders, setRiders] = useState([]);
  const [noData, setNoData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [team, setTeam] = useState("");
  const [numberStart, setNumberStart] = useState("");
  const [raceClass, setRaceClass] = useState([]);
  const [loading, setLoading] = useState(false);


  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar?q=${searchQuery}`, fetcher);


  // Get all data rider and sorter by name
  useEffect(() => {
    if (data) {
      // Mengurutkan data hanya jika data ada
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setRiders(sortedData);
      mutate(); // Update data
    }

    if (!data?.length) {
      setNoData(true);
    } else {
      setNoData(false);
    }

  }, [data, mutate, searchQuery]); // Tambahkan data ke dependency array

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };



  // async Function Export Data to excel
  const exportExcel = async () => {
    try {
      const response = await fetch(`/api/daftar/seklom/export-excel`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'daftar-riders.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };


  const handleShowModal = (id) => {
    setUpdateId(id); // Menyimpan ID yang akan dihapus
    setShowModal(true);
  }

  // Get Rider by id
  useEffect(() => {
    if (updateId) {
      async function getRiderById() {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/${updateId}`);
        const rider = await res.json();

        setName(rider?.name);
        setTeam(rider?.team);
        setNumberStart(rider?.numberStart);
        setRaceClass(rider?.raceClass);
      }
      getRiderById();
    } else {
      return;
    }
  }, [updateId]);


  // Handle raceClass change
  const handleRaceClassChange = (index, field, value) => {
    const newRaceClass = [...raceClass];
    newRaceClass[index][field] = value;
    setRaceClass(newRaceClass);
  };

  // Form submit Edit User By user._id
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {

      const riderToDelete = riders.find(rider => rider._id === updateId);
      const riderName = riderToDelete ? riderToDelete.name : "Rider";

      const body = { name, team, numberStart, raceClass };

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/${updateId}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.status === 200) {
        const setTimeoutId = setTimeout(() => {
          toast.success(`${riderName} berhasil diperbaharui`);
          setLoading(false);
          setShowModal(false);
          mutate();
        }, 3000);

        return () => clearTimeout(setTimeoutId);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error("Ups something went wrong", error);
    }
  };


  return (
    <>
      <div className="w-full flex items-center justify-between border-b pb-1">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold antialiased text-gray-600 dark:text-gray-200">DAFTAR RIDERS</h1>
          {noData ? <h3 className="w-full text-gray-600 font-medium text-sm">Belum ada data yang masuk...</h3> :
            <div className="flex gap-2 items-center">
              <h2 className="text-sm antialiased text-gray-500 dark:text-gray-200">
                Total Riders :
              </h2>
              <p className="text-sm antialiased text-gray-500 dark:text-gray-200">{riders?.length} Orang</p>
            </div>
          }
        </div>

        <div className="flex items-center justify-center gap-6">
          <form className=" max-w-xs ">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4  text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={handleSearch}
                type="search"
                id="default-search"
                className="block text-xs w-full p-4 ps-10 placeholder:text-xs text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-lime-500 focus:border-lime-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-400 dark:focus:border-gray-400"
                placeholder="Cari Nama Riders"

              />
            </div>
          </form>
          <div className="flex flex-col items-center justify-center  ">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Export :</p>
            <div className="flex gap-2 pt-1">
              <button className="group hover:text-gray-300 relative second p-2 rounded dark:text-gray-400 text-green-500" onClick={exportExcel}><SiMicrosoftexcel size={14} />
                <span className="hidden group-hover:block absolute -top-3 -left-8 rounded py-0.5 px-1 text-xs bg-white text-gray-600">Excel</span>
              </button>
            </div>
          </div>

        </div>
      </div>
      <div className="relative overflow-x-auto my-8 sm:rounded-lg">
        <table className="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase second ">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className=" text-white px-6 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riders?.map((rider, i) => (
              <React.Fragment key={rider?._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 bg-slate-100/60 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </td>
                  <td className="px-6 bg-slate-100/60 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                    {rider?.name}
                  </td>
                  <td className="bg-slate-100/60 px-6 py-4 text-gray-600 whitespace-nowrap dark:text-white font-medium text-md">
                    {rider?.numberStart}
                  </td>
                  <td className="bg-slate-100/60 px-6 py-4 text-gray-600 whitespace-nowrap dark:text-white font-medium text-md">
                    {rider?.team}
                  </td>
                  <td className="px-6 py-4 capitalize antialiased leading-relaxed ">
                    <p className="w-64">{rider?.raceClass
                      .map((cls) => `${cls?.name}`)
                      .join("-")}</p>
                  </td>
                  <td className="bg-slate-100/60 px-6 py-4 text-gray-600 whitespace-nowrap dark:text-white font-medium text-md">
                    <button onClick={() => handleShowModal(rider?._id)} >
                      Edit
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>

        </table>
        {showModal && updateId && (
          <div className="fixed top-0 left-0 w-full py-8 h-screen shadow-lg z-50 bg-black/30 text-white flex items-center justify-center">
            <div className="bg-white h-full shadow-xl overflow-y-auto py-4 px-4 rounded max-w-md w-full">
              <div className=" mb-6 flex items-center justify-between">
                <h3 className="text-md text-gray-700 font-medium antialiased -tracking-wide">Edit {name}</h3>
                <button onClick={() => setShowModal(false)} className=" text-sm p-1 rounded-lg hover:bg-gray-200 text-gray-400 hover:text-gray-800 font-medium">
                  <IoMdClose size={22} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="w-full relative">
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Nama</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white " />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Nama Team</label>
                  <input type="text" value={team} onChange={(e) => setTeam(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white " />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Nomor Start</label>
                  <input type="text" value={numberStart} onChange={(e) => setNumberStart(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white " />
                </div>
                <div className="mb-5">
                  <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-white">Kelas Balap</label>
                  {raceClass?.map((cls, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={cls.name}
                        onChange={(e) => handleRaceClassChange(index, 'name', e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-lime-500 focus:border-lime-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Nama Kelas"
                      />
                      <button type="button" onClick={() => setRaceClass(raceClass.filter((_, i) => i !== index))} className="text-red-400 text-xs shadow transition-all duration-100 ease-linear px-3 bg-gray-100 hover:bg-gray-200 hover:text-red-500 rounded-xl "><RiDeleteBin2Line className="hover:text-red-500" size={20} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => setRaceClass([...raceClass, { name: '' }])} className="text-gray-50 second text-xs px-3 py-2 transition-all duration-100 ease-linear antialiased rounded hover:scale-95">Tambah Kelas</button>
                </div>
                <button type="submit" className="text-white hover:scale-95 transition-all duration-200 ease-linear  bg-gradient-to-tr from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500  font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">
                  {loading ? <div className="flex gap-2 items-center justify-center">
                    <span>Loading..</span>
                    <span className="loader"></span>
                  </div> : "Simpan"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SeklomPage;
