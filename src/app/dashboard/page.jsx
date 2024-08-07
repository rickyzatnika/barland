"use client"

// pages/dashboard.js
import React, { useContext, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import BarChart from '@/components/Dashboard/BarChart';

import { TbLogout } from "react-icons/tb";
import { signOut } from 'next-auth/react';


const ChartTotalPrice = dynamic(() => import('@/components/Dashboard/ChartTotalPrice'), { ssr: false });
const HeaderInformation = dynamic(() => import('@/components/Dashboard/HeaderInformation'), { ssr: false });

const Dashboard = () => {

  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      };
      const formattedTime = now.toLocaleString('id-ID', options);
      setCurrentTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);


  return (
    <div className='w-full '>
      <div className="flex items justify-between pb-4 px-2 w-full border-b border-gray-400 dark:border-gray-800 ">
        <div>
          <h1 className='text-lg font-medium uppercase'>Dashboard</h1>
          <p className='text-xs italic'>{currentTime}</p>
        </div>
        <div className='flex justify-between items-center gap-3'>
          <h3>Admin</h3>
          <div className='relative group'>
            <TbLogout size={28} onClick={() => signOut()} className='cursor-pointer ' />
            <span className='hidden group-hover:block text-[10px] absolute -top-2 -left-12 py-1 px-2 bg-black rounded-lg text-gray-200'>Logout</span>
          </div>
        </div>
      </div>
      <div className='w-full my-8 flex gap-3'>
        <div className='flex flex-col basis-9/12 '>
          <HeaderInformation />
          <div className='flex flex-col shadow-lg gap-4 w-full my-6  py-6 rounded-lg px-6'>
            <h2 className='text-sm font-medium'>Data Transaksi Keseluruhan Pembayaran Tunai dan Transfer </h2>
            <div className='flex flex-col gap-6'>
              <BarChart />
              <ChartTotalPrice />
            </div>
          </div>
        </div>
        <div className='basis-3/12'>rightbar</div>
      </div>
    </div>
  );
};

export default Dashboard;
