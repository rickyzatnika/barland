"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

const EditRiders = ({ params }) => {
  const CLOUD_NAME = "inkara-id";
  const UPLOAD_PRESET = "myBlog_project_nextjs";


  const router = useRouter();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nik, setNik] = useState("");
  const [kis, setKis] = useState("");
  const [team, setTeam] = useState("");
  const [numberStart, setNumberStart] = useState("");
  const [totalPrice, setTotalPrice] = useState("");

  const [photo, setPhoto] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getRiderById() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/${params.id}`);
      const rider = await res.json();

      setName(rider?.name);
      setAddress(rider?.address);
      setPhone(rider?.phone);
      setNik(rider?.nik);
      setKis(rider?.kis);
      setTeam(rider?.team);
      setNumberStart(rider?.numberStart);
      setTotalPrice(rider?.totalPrice);
      setPhoto(rider?.img);
    }
    getRiderById();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let img = null;
      if (photo) {
        img = await uploadImage();
      }

      const body = { name, address, kis, nik, phone, team, numberStart, totalPrice };

      if (img !== null) {
        body.img = img;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar/${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        toast.error("Terjadi kesalahan saat menyimpan data");
        return;
      }

      await res.json();
      const setTimeoutId = setTimeout(() => {
        toast.success("Berhasil menyimpan data");
        setLoading(false);
        router.push(`/dashboard/list-riders`);
      }, 3000);

      return () => clearTimeout(setTimeoutId);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadImage = async () => {
    if (!photo) return;
    const formData = new FormData();

    formData.append("file", photo);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      const img = data["secure_url"];

      return img;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full h-full">
        <h2 className="mb-6">Edit</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="text"
            placeholder="Title"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
          />
          <input
            type="text"
            placeholder="Description"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
          />
          <input
            value={nik}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
            onChange={(e) => setNik(e.target.value)}
          />

          <input
            value={kis}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
            onChange={(e) => setKis(e.target.value)}
          />

          <input
            value={team}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
            onChange={(e) => setTeam(e.target.value)}
          />
          <input
            value={totalPrice}
            className="px-4 py-3 bg-zinc-100 focus:outline-indigo-400"
            onChange={(e) => setTotalPrice(e.target.value)}
          />

          {
            photo && (
              <Image src={photo} alt="" width={45} height={45} />
            )
          }
          <input
            type="file"
            id="image"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="file-input text-sm text-zinc-500 bg-zinc-100 file-input-bordered w-full max-w-xs"
          />

          <button
            className="uppercase text-sm w-max px-6 py-2 rounded-md border-none bg-gradient-to-tr from-green-400 to-lime-500  text-white "
            type="submit"
          >
            {loading ? (
              <div className="flex items-center gap-1">
                <span className="capitalize">Loading...</span>{" "}
                <span className="loading loading-spinner loading-xs "></span>
              </div>
            ) : (
              <p>Simpan</p>
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditRiders;
