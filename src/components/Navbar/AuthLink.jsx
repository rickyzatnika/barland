"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";



const AuthLink = () => {

  const { data: session } = useSession();

  return (
    <div className=''>
      {!session ? (
        <Link className="uppercase rounded-md bg-gradient-to-tr from-green-500 to-lime-400 text-slate-100 hover:bg-green-500 px-4 py-2 hover:text-white " href={"/login"}>Login</Link>
      ) : (
        <button onClick={() => signOut()} className="uppercase rounded-md bg-gradient-to-tr from-green-500 to-lime-400 text-slate-100 hover:bg-green-500 px-4 py-2 hover:text-white ">Logout</button>
      )}
    </div>
  )
}

export default AuthLink