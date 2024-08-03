"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import React from "@heroicons/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { SiMicrosoftexcel } from "react-icons/si";
import { GrDocumentPdf } from "react-icons/gr";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const TABLE_HEAD = [
  "No",
  "Nama",
  "Alamat",
  "No.Handphone",
  "No.KIS",
  "No.Identitas/NIK",
  "Nama Team",
  "Nomor Start",
  "Kelas Yang diikuti",
  "Pembayaran/Bukti Transfer",
  "Biaya Pendaftaran",
  "Action",
];

const TableRiders = () => {
  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [riders, setRiders] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar?q=${searchQuery}`);
        const data = await response.json();
        // Mengurutkan data berdasarkan nama
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setRiders(sortedData);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchRiders();
  }, [searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowImage(true);
  };

  const exportPDF = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/export-pdf`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'riders.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  const exportExcel = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/export-excel`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'riders.xlsx';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error exporting Excel:", error);
    }
  };


  const handleShowModal = (id) => {
    setDeleteId(id); // Menyimpan ID yang akan dihapus
    setShowModal(true);
  }

  const handleDelete = async () => {
    if (!deleteId) return; // Jika tidak ada ID yang diset, tidak lakukan apa-apa

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/${deleteId}`, {
        method: "DELETE",
      });
      if (res.status === 200) {
        toast.success("Post deleted successfully");
        setShowModal(false);
        setDeleteId(null);
        router.push('/dashboard/list-riders'); // Navigasi setelah hapus berhasil
      } else {
        toast.error("Failed to delete item");
      }
    } catch (error) {
      toast.error("Ups something went wrong");
    }
  };

  return (
    <>

      {showImage && selectedImage && (
        <div className="fixed backdrop-blur-sm z-50 top-0 bottom-0 left-0 right-0 w-full h-full py-24">
          <div
            className="relative w-full py-24 h-full"
            onClick={() => setShowImage(false)}
          >
            <Image
              src={selectedImage}
              alt="bukti-transfer"
              fill
              priority={true}
              sizes="100%" // Sesuaikan ukuran modal
              className="object-contain"
            />
          </div>
        </div>
      )}

      <div className="w-full flex items-center justify-between border-b-2 py-0.5">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-semibold antialiased text-gray-900 dark:text-gray-200">DAFTAR RIDERS</h1>
          <div className="flex gap-2 items-center">
            <h2 className="text-sm font-semibold antialiased text-gray-700 dark:text-gray-200">
              Total Riders :
            </h2>
            <p className="text-sm font-semibold antialiased text-gray-700 dark:text-gray-200">{riders?.length} Orang</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-2 ">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Export :</p>
            <div className="flex gap-4 ">
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700" onClick={exportPDF}><GrDocumentPdf size={20} /></button>
              <button className="text-gray-500 dark:text-gray-400 hover:text-gray-700" onClick={exportExcel}><SiMicrosoftexcel size={20} /></button>
            </div>
          </div>
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
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
        </div>
      </div>
      <div class="my-8 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full table-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs uppercase second text-white dark:bg-gray-700 dark:text-gray-400">
            <tr className="">
              {TABLE_HEAD.map((head) => (
                <th key={head} className="px-6 py-3">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, i) => (
              <tr
                key={rider?._id}
                className="bg-white text-xs font-medium border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{i + 1}.</td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed"><p className="w-32">{rider?.name}</p></td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed"><p className="w-52">{rider?.address}</p></td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{rider?.phone}</td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{rider?.kis}</td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{rider?.nik}</td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed"><p className="w-32">{rider?.team}</p></td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{rider?.numberStart}</td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed ">
                  <p className="w-64">{rider?.raceClass
                    .map((cls) => `${cls?.name}`)
                    .join(", ")}</p>
                </td>
                <td className="px-6 py-4 text-center flex justify-center flex-col gap-2 ">
                  {!rider?.img || rider?.img === "" ? (
                    <div className="w-max px-6 py-4 ">Bayar dilokasi</div>
                  ) : (
                    <Image
                      onClick={() => handleImageClick(rider?.img)}
                      src={rider?.img}
                      alt="bukti-transfer"
                      width={52}
                      height={52}
                      className="object-contain mx-auto cursor-pointer"
                    />
                  )}

                </td>
                <td className="px-6 py-4 capitalize antialiased leading-relaxed">{formatCurrency(rider?.totalPrice)}</td>
                <td className="px-6 py-4 ">
                  <div className="flex gap-2 items-center justify-center">

                    <Link href={`/dashboard/list-riders/edit/${rider?._id}`}>Edit</Link>
                    <button onClick={() => handleShowModal(rider?._id)} >Hapus</button>
                  </div>
                </td>


              </tr>
            ))}
          </tbody>
          {showModal && deleteId && (
            <div className="fixed top-0 left-0 w-full h-screen shadow-lg z-50 bg-black/30 text-white flex items-center justify-center">
              <div className="second py-8 px-6 rounded">
                <p className="text-lg py-2">Anda akan menghapus Rider {riders.find(r => r._id === deleteId)?.name}</p>
                <div className="flex gap-3 pt-6">
                  <button className="py-1.5 px-4 bg-gradient-to-tr rounded from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500" onClick={handleDelete}>Ya Hapus</button>
                  <button className="py-1.5 px-4 bg-red-500 hover:bg-red-600 rounded" onClick={() => setShowModal(false)}>Batal</button>
                </div>
              </div>
            </div>
          )}
        </table>
      </div>
    </>
  );
};

export default TableRiders;

{
  /* <table className="w-full max-w-7xl table-auto text-left">
        <thead className="border-b border-gray-100 bg-gray-50 ">
          <tr className="">
            {TABLE_HEAD.map((head) => (
              <th key={head} className="">
                <p
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70 capitalize"
                >
                  {head}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="px-4">
          {riders.map((rider) => (
            <tr key={rider?._id} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal capitalize">
                  {rider?.name}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.address}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.phone}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.kis}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.nik}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.team}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.numberStart}
                </p>
              </td>
              <td className="p-4">
                <p variant="small" color="blue-gray" className="font-normal">
                  {rider?.raceClass
                    .map((cls) => `${cls.name} - ${formatCurrency(cls.price)})`)
                    .join(", ")}
                </p>
              </td>
              <td className="p-4">
                {!rider?.img ? (
                  <div className="bg-red-500 w-max p-6"></div>
                ) : (
                  <Image
                    onClick={() => handleImageClick(rider.img)}
                    src={rider?.img}
                    alt="bukti-transfer"
                    width={48}
                    height={48}
                    className="object-cover w-12 h-12 cursor-pointer"
                  />
                )}
              </td>
              <td className="p-4">
                <p
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  Edit
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
