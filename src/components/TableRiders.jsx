
"use client"


import Image from "next/image";

const TABLE_HEAD = ["Nama", "Alamat", "Phone", "No.KIS", "NIK", "Team", "Nomor Start", "Kelas", "Bukti Transfer"];


const TableRiders = ({ riders }) => {
  return (

    <table className="w-full max-w-7xl table-auto text-left">
      <thead>
        <tr>
          {TABLE_HEAD.map((head) => (
            <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <p
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head}
              </p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
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
                {rider?.raceClass.category} {rider?.raceClass.subcategory}
              </p>
            </td>
            <td className="p-4">
              <Image src={rider?.img} alt="bukti-transfer" width={48} height={48} className="object-cover w-12 h-12" />
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

  )
}

export default TableRiders