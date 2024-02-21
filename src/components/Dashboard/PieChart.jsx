'use client'
import React, { useEffect, useState } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function PieChart({ data }) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const backgroundColor = Array.from({ length: data.length }, () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
  );

  const borderColor = Array.from({ length: data.length }, () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 5)`
  );

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Daily Revenue',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `Grade ${label}: ${value.toFixed(2)}%`;
          },
        },
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    setChartData((prevChartData) => ({
      ...prevChartData,
      labels: data.map(item => item.gradeString),
      datasets: [
        {
          label: 'Percentage of Grade',
          data: data.map(item => item.percentage),
          borderColor: borderColor,
          backgroundColor: backgroundColor,
          borderWidth: 1
        },
      ]
    }))
  }, [data]);

  return (
    <div className='w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
      <Pie data={chartData} options={chartOptions} />
    </div>
  )

}
