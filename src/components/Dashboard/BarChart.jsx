"use client"

import { Bar } from 'react-chartjs-2';
import useSWR from 'swr';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {

  const [sortData, setSortData] = useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  // const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_DEV}/api/daftar`, fetcher);


  const { data, mutate } = useSWR(`${process.env.NEXT_PUBLIC_API_PRO}/api/daftar`, fetcher);

  useEffect(() => {
    if (data) {

      const dataSort = data.sort((a, b) => a.name.localeCompare(b.name))
      return setSortData(dataSort);
    }
    mutate();

  }, [data, mutate])

  const chartData = {
    labels: sortData?.map(rider => rider.name),
    datasets: [
      {
        label: 'Rp.',
        data: data?.map(item => item.totalPrice),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className='px-6 py-4 w-full'>
      <Bar data={chartData} />
    </div>
  )
};

export default BarChart;