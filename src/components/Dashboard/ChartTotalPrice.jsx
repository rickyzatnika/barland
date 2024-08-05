"use client"

import { formatCurrency } from '@/utils/formatCurrency';
import React from 'react';
import useSWR from 'swr';


const DoughnutChart = () => {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_DEV}/api/daftar`, fetcher);

  // PRODUCTION_DATA_API_URL is a constant with the URL of your API endpoint
  const { data } = useSWR(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar`, fetcher);

  const totalPrice = data?.reduce((sum, rider) => sum + rider.totalPrice, 0);



  return (
    <>

      <div className='antialiased text-gray-700 text-xs '>
        <p>Total : {formatCurrency(totalPrice)}</p>
      </div>

    </>
  )
};

export default DoughnutChart;
