import Image from "next/image"
import Link from "next/link"

const EventPage = () => {
    return (
        <div className='w-full h-[100vh] relative '>
            <div className="w-full h-full">
                <Image src="/event.jpg" alt="" fill className="object-cover" />
            </div>
            <Link className="text-center w-max py-3 px-6 bg-gradient-to-tr from-green-400 to-lime-500 absolute  bottom-8 left-80 text-white rounded-xl right-0" href="/pendaftaran">DAFTAR SEKARANG</Link>

        </div>
    )
}

export default EventPage