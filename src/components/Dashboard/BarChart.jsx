"use client"
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChart({ data }) {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

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
          label: (tooltipItem) => {
            const grade = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
            const percentage = tooltipItem.parsed.y.toFixed(2);
            return `Grade ${grade}: ${percentage}%`;
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Grade',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Percentage',
        },
        ticks: {
          callback: (value) => {
            return value.toFixed(2) + '%';
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
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgb(53, 162, 235, 0.4)',
        },
      ]
    }))
  }, [data]);

  useEffect(() => {
    setChartOptions((prevChartOptions) => ({
      ...prevChartOptions,
      tooltips: {
        callbacks: {
          label: (tooltipItem) => {
            const grade = tooltipItem.chart.data.labels[tooltipItem.dataIndex];
            const percentage = tooltipItem.parsed.y.toFixed(2);
            return `Grade ${grade}: ${percentage}%`;
          },
        },
      },
    }));
  }, [chartData]);

  return (
    <div className='w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white'>
      <Bar data={chartData} options={chartOptions} />
    </div>
  )

}
