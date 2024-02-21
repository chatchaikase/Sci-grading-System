'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Bar, Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export default function PieChart({ data }) {
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  const backgroundColor = Array.from({ length: data.length }, () =>
    `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`
  );

  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy()
      }
      const context = chartRef.current.getContext("2d");

      const newChart = new Chart(context, {
        type: "pie",
        data: {
          labels: data.map(item => item.gradeString),
          datasets: [{
            label: "Info",
            data: data.map(item => item.percentage),
            backgroundColor: backgroundColor,
            borderWidth: 1,
          }]
        },
        options: {
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
        }
      }
      )
      chartRef.current.chart = newChart;
    }
  }, [])

  return (
    <div className='w-full xl:h-full'>
      <canvas ref={chartRef} ></canvas>
    </div>
  )

}
