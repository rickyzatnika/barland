// pages/dashboard.js
import React from 'react';
import dynamic from 'next/dynamic';
import BarChart from '@/components/Dashboard/BarChart';

const ChartTotalPrice = dynamic(() => import('@/components/Dashboard/ChartTotalPrice'), { ssr: false });
const HeaderInformation = dynamic(() => import('@/components/Dashboard/HeaderInformation'), { ssr: false });

const Dashboard = () => {
  return (
    <div className='w-full '>
      <div className='py-4 shadow-lg px-6 second text-gray-300 w-full rounded-md'>
        <h1>Dashboard</h1>
      </div>
      <div className='w-full my-8 flex gap-3'>
        <div className='flex flex-col basis-9/12 '>
          <HeaderInformation />
          <div className='flex flex-col shadow-lg gap-4 w-full my-6 bg-gray-50 py-6 rounded-lg px-6'>
            <h2 className='text-sm text-gray-700 font-medium'>Data Transaksi Keseluruhan Pembayaran Tunai dan Transfer </h2>
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
