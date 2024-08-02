
"use client"


import { formatCurrency } from "@/utils/formatCurrency";
import Image from "next/image";
import { useState } from "react";

const TABLE_HEAD = ["Nama", "Alamat", "Phone", "No.KIS", "NIK", "Team", "Nomor Start", "Kelas Yang diikuti", "Bukti Transfer"];


const TableRiders = ({ riders }) => {


  const [showImage, setShowImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (imgSrc) => {
    setSelectedImage(imgSrc);
    setShowImage(true);
  };





  return (

    <>
      {showImage && selectedImage && (
        <div className="fixed backdrop-blur-sm z-50 top-0 bottom-0 left-0 right-0 w-full h-full py-24" >
          <div className="relative w-full py-24 h-full" onClick={() => setShowImage(false)}>
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

      <table className="w-full max-w-7xl table-auto text-left">
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
                <p variant="small" color="blue-gray" className="font-normal">
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
                  {rider?.raceClass.map(cls => `${cls.name} - ${formatCurrency(cls.price)})`).join(", ")}
                </p>
              </td>
              <td className="p-4">
                {!rider?.img ? <div className="bg-red-500 w-max p-6"></div> : <Image onClick={() => handleImageClick(rider.img)} src={rider?.img} alt="bukti-transfer" width={48} height={48} className="object-cover w-12 h-12 cursor-pointer" />}
              </td>
              <td className="p-4">
                <p as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                  Edit
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>

  )
}

export default TableRiders