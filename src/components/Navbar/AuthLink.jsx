"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



const AuthLink = () => {

  const { data: session, status } = useSession();

  return (
    <div className='w-full flex ml-auto items-center gap-3 flex-1'>
      <div className="mx-auto"></div>
      {status == "authenticated" && (<div className="ml-auto ">
        <p className="text-gray-300 capitalize antialiased font-medium dark:text-gray-300">Hi, {session?.user?.name}</p>
      </div>)}
      {!session ? (
        <Link className="rounded-md bg-gradient-to-tr from-green-500 to-lime-400 text-slate-100 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 px-4 py-2 transition-colors ease-linear duration-200 hover:text-white" href={"/login"}>Login/Register</Link>
      ) : (
        <button onClick={() => signOut()} className="uppercase rounded-md bg-gradient-to-tr from-green-500 to-lime-400 text-slate-100 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 px-4 py-2 transition-colors ease-linear duration-200 hover:text-white ">Logout</button>
      )}
    </div>
  )
}

export default AuthLink