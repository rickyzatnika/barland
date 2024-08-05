// pages/dashboard.js
import React from 'react';
import dynamic from 'next/dynamic';
import BarChart from '@/components/Dashboard/BarChart';

const ChartTotalPrice = dynamic(() => import('@/components/Dashboard/ChartTotalPrice'), { ssr: false });
const HeaderInformation = dynamic(() => import('@/components/Dashboard/HeaderInformation'), { ssr: false });

const Dashboard = () => {
  return (
    <div className='w-full '>
      <h1>Dashboard</h1>

      <div className='my-8'>
        <HeaderInformation />
        <div className='flex gap-6 items-center my-12'>
          <div className="flex-1">
            <h2>Riders Total Price</h2>
            <BarChart />
          </div>
          <div className="flex-1 max-w-sm">
            <h2>Total Price of All Riders</h2>
            <ChartTotalPrice />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
