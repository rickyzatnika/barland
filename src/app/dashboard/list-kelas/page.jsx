"use client"
import FormAddClass from "@/components/Dashboard/FormAddClass";
import { formatCurrency } from "@/utils/formatCurrency";
import useSWR from "swr";
import React, { useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";


const TABLE_HEAD = ["Kelas", "Harga", "Action"];

const TableListClass = () => {
  const [showModal, setShowModal] = useState(false);


  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_PRO}/api/raceClasses`, fetcher);


  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/raceClasses/${id}`, {
        'method': "DELETE",
      });

      if (res.status === 200) {
        toast.success("Post deleted successfully");
      }
    } catch (error) {
      toast.error("Ups something went wrong", error);
    }
    mutate();
  };




  return (
    <>
      <button onClick={() => setShowModal(prev => !prev)} className="text-gray-200 second py-2 px-5 rounded shadow-lg hover:bg-[#000]" type="button">
        Buat Kelas
      </button>

      <div class="relative overflow-x-auto shadow-md my-14">
        {showModal &&

          <FormAddClass setShowModal={setShowModal} />

        }
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="second text-white px-6 py-4 text-[16px]">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((list) => (
              <React.Fragment key={list?._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 bg-lime-200 py-4 uppercase font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                    {list?.title}
                  </td>
                  <td className="bg-lime-200"></td>
                  <td className="px-10 py-4 bg-lime-200 ">
                    <button className="relative group" onClick={() => handleDelete(list?._id)}><RiDeleteBin2Line className="hover:text-red-500" size={28} />
                      <span className="absolute top-0 -right-12 text-sm hidden font-medium text-red-500 group-hover:block"> delete</span>
                    </button>
                  </td>
                </tr>
                {list?.classes?.map((cls) => (
                  <tr key={cls?.name} className="odd:bg-white  odd:dark:bg-gray-900 even:bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-8 py-4 uppercase ">{cls?.name}</td>
                    <td className="px-6 py-4">{formatCurrency(cls?.price)}</td>
                    {/* Anda bisa menambahkan kolom kosong jika ingin menyelaraskan dengan kolom tombol aksi */}
                    <td className="px-6 py-4"></td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>


    </>
  );
};

export default TableListClass;
