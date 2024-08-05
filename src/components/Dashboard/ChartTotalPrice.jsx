"use client"

import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import useSWR from 'swr';


const DoughnutChart = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_DEV}/api/daftar`, fetcher);

  const totalPrice = data?.reduce((sum, rider) => sum + rider.totalPrice, 0);



  return (
    <>
      <div className=''>
        <div className=''>
          <p>{formatCurrency(totalPrice)}</p>
        </div>
      </div>
    </>
  )
};

export default DoughnutChart;
