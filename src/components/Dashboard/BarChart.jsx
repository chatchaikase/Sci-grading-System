"use client"

import React, { useState, useEffect } from 'react';
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

export default function BarChart({ data }) {
    const gradeLabels = ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'I', 'F'];
    const totalStudents = data.length;
    const grades = data.map((student) => student.grade);
    const gradeCounts = grades.reduce((acc, grade) => {
        acc[grade] = (acc[grade] || 0) + 1;
        return acc;
    }, {});

    const percentageData = gradeLabels.map((grade) => ((gradeCounts[grade] || 0) / totalStudents) * 100);

    const chartData = {
        labels: gradeLabels,
        datasets: [
            {
                label: 'Percentage of Grade',
                data: percentageData,
                backgroundColor: "rgba(255,622,99,1)",
                borderColor: "rgba(25,66,440,1)",
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
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
                        const grade = gradeLabels[context.dataIndex];
                        const percentage = context.parsed.y.toFixed(2);
                        return `Grade ${grade}: ${percentage}%`;
                    },
                },
            },
        },
    };

    return (
        <Bar data={chartData} options={chartOptions} />
    )
}
