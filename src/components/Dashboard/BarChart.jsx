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

export default function BarChart({ data }) {
  const [chartData, setChartData] = useState(getInitialChartData(data));

  useEffect(() => {
    // Update chart data when the data prop changes
    setChartData(getInitialChartData(data));
  }, [data]);

  function getInitialChartData(data) {
  
    return {
      labels: data.map(item => item.gradeString),
      datasets: [
        {
          label: 'Percentage of Grade',
          data: data.map(item => item.percentage),
          backgroundColor: 'rgb(0, 166, 255)',
          borderColor: 'rgb(60, 60, 60)',
          borderWidth: 1,
        },
      ],
    };
  }

  const chartOptions = {
    responsive: true, // Make the chart responsive
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
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const grade = chartData.labels[context.dataIndex];
            const percentage = context.parsed.y.toFixed(2);
            return `Grade ${grade}: ${percentage}%`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
}
