"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto';

export default function BarChart({ data }) {
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
        type: "bar",
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
                label: (tooltipItem) => {
                  const grade = newChart.data.labels[tooltipItem.dataIndex];
                  const percentage = tooltipItem.parsed.y.toFixed(2);
                  return `Grade ${grade}: ${percentage}%`;
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
