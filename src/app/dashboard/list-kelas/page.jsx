"use client"
import FormAddClass from "@/components/Dashboard/FormAddClass";
import Modal from "@/components/Modal";
import { formatCurrency } from "@/utils/formatCurrency";

import React, { useEffect, useState } from "react";

const TABLE_HEAD = ["Nama Kelas", "Harga", "Action"];

const TableListClass = () => {
  const [raceClasses, setRaceClasses] = useState([]);
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchRaceClasses = async () => {
      // const response = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/raceClasses`);
      const response = await fetch(`/api/raceClasses`);
      const data = await response.json();
      setRaceClasses(data);
    };

    fetchRaceClasses();
  }, []);




  return (
    <>
      <button onClick={() => setShowModal(prev => !prev)} className="text-gray-200 second py-2 px-5 rounded" type="button">
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
                <th key={head} className="px-6 py-4">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {raceClasses.map((list) => (
              <React.Fragment key={list?._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 bg-green-400 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" colSpan={3}>
                    {list?.title}
                  </td>
                </tr>
                {list?.classes?.map((cls) => (
                  <tr key={cls?.name} className=" odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 dark:bg-gray-800 border-b dark:border-gray-700">
                    <td className="px-6 py-4">
                      {cls?.name}
                    </td>
                    <td className="px-6 py-4">
                      {formatCurrency(cls?.price)}
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <button>Edit</button>
                      <button>Hapus</button>
                    </td>
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
