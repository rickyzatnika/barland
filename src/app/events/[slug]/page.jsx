import Image from 'next/image';
import Link from 'next/link';
import React from 'react'


const getEvent = async (slug) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_PRO}/api/event/${slug}`);
  const data = await res.json();
  return data;
};


const DetailsEvent = async ({ params }) => {

  const event = await getEvent(params?.slug);

  return (
    <div className='w-full max-w-4xl mx-auto relative flex  justify-center flex-col gap-3 py-6 sm:py-14  '>
      <h1 className='text-xl sm:text-3xl lg:text-5xl font-bold leading-relaxed tracking-wide'>{event?.title}</h1>
      <div className='relative w-full h-full my-2 sm:my-6'>
        <Image src={event?.imageUrl} width={600} height={600} style={{ width: "100%", height: "100%" }} priority={true} className='object-contain' alt={event?.title} />
        <div className="flex items-center justify-between w-full px-2 pt-2">
          <div className="flex items-center gap-1 ">
            <span className="text-sm" >Di posting :</span>
            <span className="text-xs px-2 py-0.5 rounded-full text-white second shadow dark:bg-gray-200 dark:text-gray-700 w-fit">{event?.publishedAt}</span>
          </div>
          <div>{event?.category.map((c, i) => (<p className="text-sm" key={i}>Kategori : <span className="text-xs px-2 py-0.5 rounded-full text-white second shadow dark:bg-gray-200 dark:text-gray-700 w-fit">{c.name}</span></p>))}</div>
        </div>
      </div>
      <p>{event?.desc}</p>
      <p className='leading-relaxed'>{event?.content}</p>
      {event?.url === "" ? <p className='hidden'></p> : <Link className='underline w-fit text-blue-500 hover:text-blue-600' href={event?.url}>Formulir Pendaftaran</Link>}
    </div>
  )
}

export default DetailsEvent;