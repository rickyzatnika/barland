"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { TbEyeClosed } from "react-icons/tb";
import { MdOutlineRemoveRedEye } from "react-icons/md";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormRegister from "@/components/FormRegister";
import Image from "next/image";

const Login = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [activeButton, setActiveButton] = useState("login");

  const handlePasswordVisible = () => {
    setPasswordVisible(prev => !prev);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const password = e.target[1].value;

    try {
      if (name === "" || password === "") {
        toast.error("Field required!");
        return;
      }

      if (password.length < 5) {
        toast.error("Password must be at least 5 characters");
        return;
      }

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      })

      if (res.status === 200) {
        signIn("credentials", {
          name: name,
          password: password,
        });
      }
      const errorData = await res.json();
      toast.error(errorData.message);
      return;

    } catch (error) {
      toast.error(error.message);
    }

  };

  if (status === "authenticated") {
    return router.push("/");
  }

  return (
    <>
      <div className="w-full h-[calc(100vh-80px)] relative px-2 py-20 sm:py-8 flex flex-col gap-2 items-center justify-center">
        <div className="w-full h-full absolute left-0 top-0 -z-50">
          <Image src="/race-flag.png" alt="race-flag" fill className="object-cover object-top sm:object-bottom" />
        </div>
        <div className="w-full  bg-white max-w-md rounded-xl shadow-lg  ">
          <h2 className="text-center text-md pt-4 text-gray-600 font-bold">LOGIN FORM</h2>
          <div className="w-full text-sm md:text-md flex p-5 flex-col gap-2 h-full px-6 ">
            <div className=" flex items-center gap-1 justify-center w-full overflow-hidden text-center">
              <button className={`text-sm sm:text-md rounded-tl-xl text-center w-full py-3 sm:py-4 ${activeButton === "login" ? "bg-gradient-to-tr from-green-500 to-lime-400 text-white" : "bg-lime-100/70 hover:bg-lime-100 text-gray-400"}`} onClick={() => setActiveButton("login")}>MASUK</button>
              <button className={`text-sm sm:text-md rounded-tr-xl  text-center w-full py-3 sm:py-4 ${activeButton === "register" ? "bg-gradient-to-tr from-green-500 to-lime-400 text-white" : "bg-lime-100/70 hover:bg-lime-100 text-gray-400"}`} onClick={() => setActiveButton("register")}>DAFTAR</button>
            </div>

            {activeButton === "login" &&
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Nama Pengguna"
                  name="name"
                  required
                  className="px-4 py-3 rounded placeholder:text-zinc-400  w-full border-gray-300 border-2 bg-transparent text-zinc-500 outline-none focus:outline-none focus:ring-0 focus:border-2  focus:border-green-400"
                />
                <div className="flex items-center justify-between relative">
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    name="password"
                    className="px-4 py-3 rounded  w-full border-gray-300 border-2 bg-transparent text-zinc-500 outline-none focus:outline-none focus:ring-0 focus:border-2  focus:border-green-400"
                  />
                  <div className="absolute right-3 cursor-pointer">
                    {!passwordVisible ? <TbEyeClosed className="text-gray-400/80" onClick={() => handlePasswordVisible()} /> : <MdOutlineRemoveRedEye className="text-green-400" onClick={handlePasswordVisible} />}
                  </div>

                </div>
                <button className="py-3 px-6 uppercase text-slate-100 transition-all duration-150 ease-linear bg-gradient-to-tr from-green-500 to-lime-400  hover:bg-green-500 hover:text-white rounded-md" type="submit">
                  {status === "loading" ? "Loading..." : "Login"}
                </button>
              </form>
            }

            {activeButton === "register" &&
              <FormRegister setActiveButton={setActiveButton} />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
