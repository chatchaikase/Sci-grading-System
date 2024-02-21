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
    const [chartData, setChartData] = useState(getInitialChartData(data));
    useEffect(() => {
        // Update chart data when the data prop changes
        setChartData(getInitialChartData(data));
      }, [data]);
    
      function getInitialChartData(data) {
          const backgroundColor = Array.from({ length: data.length }, () =>
              `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
          );
    
        return {
          labels: data.map(item => item.gradeString),
          datasets: [
            {
              label: 'Percentage of Grade',
              data: data.map(item => item.percentage),
              backgroundColor: backgroundColor,
            },
          ],
        };
      }
    
      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
              callbacks: {
                label: (context) => {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return `${label}: ${value.toFixed(2)}%`;
                },
              },
            },
          },
      };
    return (
        <Pie data={chartData} options={chartOptions} />
    )
}
