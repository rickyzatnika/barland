import Image from "next/image"
import Link from "next/link"

const EventPage = () => {
  return (
    <div className='w-full h-full py-4 sm:py-14 mb-8 flex flex-col gap-6 items-center justify-center'>
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-2 items-start justify-center">
        <div className="w-full flex flex-col flex-1 gap-3 p-4 md:p-8">
          <h1 className="text-2xl text-gray-700 font-bold md:text-3xl">IKUTI BALAP NASIONAL PIALA PRESIDEN 2024</h1>
          <p className="text-sm px-1 text-gray-500">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad exercitationem totam aspernatur alias harum nesciunt!</p>
          <Link className="text-center w-max py-3 antialiased font-semibold text-sm shadow-lg px-4 bg-gradient-to-tr from-green-400 to-lime-500 text-gray-50 hover:bg-gradient-to-tl hover:from-green-400 hover:to-lime-500 hover:text-white transition-all ease-linear duration-150 hover:scale-95 rounded-xl " href="/pendaftaran">DAFTAR SEKARANG</Link>
        </div>
        <div className="w-full h-full relative flex-1">
          <Image src="/event.jpg" alt="" sizes="100%" width={500} height={900} priority={true} className="object-right object-cover w-[500px] sm:w-full h-full " />
        </div>
      </div>


    </div>
  )
}

export default EventPage