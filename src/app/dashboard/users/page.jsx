"use client";
import useSWR from "swr";
import React, { useEffect, useState } from "react";
import { RiDeleteBin2Line } from "react-icons/ri";
import { toast } from "react-toastify";
import FormAddUser from "@/components/Dashboard/FormAddUser";

const TABLE_HEAD = ["Nama", "No.Handphone", "Role", "Action"];

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const UserPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [users, setUsers] = useState([]);


  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_DEV}/api/user`, fetcher);

  useEffect(() => {
    if (data) {
      // Mengurutkan data hanya jika data ada
      const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(sortedData);
      mutate(); // Update data
    }

  }, [data]);


  const handleShowModal = (id) => {
    setDeleteId(id); // Menyimpan ID yang akan dihapus
    setShowDeleteModal(true);
  }

  const handleDelete = async () => {
    if (!deleteId) return; // Jika tidak ada ID yang diset, tidak lakukan apa-apa

    try {
      // Cari nama rider yang akan dihapus dari state
      const userToDelete = users.find(user => user._id === deleteId);
      const userName = userToDelete ? userToDelete.name : "User";

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_DEV}/api/user/${deleteId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        toast.success(`${userName} dihapus`);
        setShowDeleteModal(false);
        // Perbarui state riders jika diperlukan
        setUsers(prevUsers => prevUsers.filter(user => user._id !== deleteId));
        mutate(); // Memuat ulang data
      } else {
        toast.error("Gagal menghapus user");
      }
    } catch (error) {
      toast.error("Ups, sesuatu yang salah");
    }
  };



  // const handleDelete = async (id) => {
  //   try {
  //     const res = await fetch(`/api/user/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (res.status === 200) {
  //       toast.success("User deleted.");
  //       mutate();
  //     }
  //   } catch (error) {
  //     toast.error("maaf sepertinya ada kesalahan pada server.", error);
  //   }

  // };

  return (
    <>
      <div className="w-full flex items-center justify-between border-b pb-4">
        <button
          onClick={() => setShowModal((prev) => !prev)}
          className="text-gray-200 second py-2 px-5 rounded shadow-lg hover:bg-[#000]"
          type="button"
        >
          Add User
        </button>
      </div>
      <div className="relative overflow-x-auto my-8 sm:rounded-lg">
        {showModal && <FormAddUser setShowModal={setShowModal} />}
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
            {users?.map((user) => (
              <React.Fragment key={user?._id}>
                <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <td className="px-6 bg-slate-100/60 py-4 font-medium text-gray-600 whitespace-nowrap dark:text-white">
                    {user?.name}
                  </td>
                  <td className="bg-slate-100/60 px-6 py-4 text-gray-600 whitespace-nowrap dark:text-white font-medium text-md">
                    {user?.phone}
                  </td>
                  <td className="bg-slate-100/60 px-6 py-4 text-gray-600 whitespace-nowrap dark:text-white font-medium text-md">
                    {user?.role}
                  </td>
                  <td className="px-8 py-4 bg-slate-100/60 ">

                    <button
                      className="relative group"
                      onClick={() => handleShowModal(user?._id)}
                    >
                      <RiDeleteBin2Line
                        className="hover:text-red-500"
                        size={28}
                      />
                      <span className="absolute top-0 -right-12 text-sm hidden font-medium text-red-500 group-hover:block">
                        {" "}
                        delete
                      </span>
                    </button>
                  </td>
                </tr>

              </React.Fragment>
            ))}
          </tbody>
        </table>
        {showDeleteModal && deleteId && (
          <div className="fixed top-0 left-0 w-full h-screen shadow-lg z-50 bg-black/30 text-white flex items-center justify-center">
            <div className="second py-8 px-6 rounded">
              <p className="text-lg py-2">Anda akan menghapus {users.find(r => r._id === deleteId)?.name}</p>
              <div className="flex gap-3 pt-6">
                <button className="py-1.5 px-4 bg-gradient-to-tr rounded from-green-400 to-lime-500 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500" onClick={handleDelete}>Ya Hapus</button>
                <button className="py-1.5 px-4 bg-red-500 hover:bg-red-600 rounded" onClick={() => setShowDeleteModal(false)}>Batal</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserPage;
