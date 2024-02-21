"use server"

import React from 'react';
import BarChartComponent from '../components/Dashboard/BarChart'
import PieChart from '../components/Dashboard/PieChart'
import { GetDataDashboard, GetCourseNameList } from '../function/dashboard.js'
import FormSubmit from '../components/Dashboard/FormSubmit.jsx'

export default async function Home({searchParams}) {
  const query_CourseID = searchParams?.CourseID || "";
  const query_DateRange = searchParams?.DateRange || "";
  const query_CourseName = searchParams?.CourseName || "";

  const dashBoard = await GetDataDashboard(query_CourseID,query_DateRange,query_CourseName);
  const courseName = await GetCourseNameList();

  console.log(dashBoard);

  return (
    <div className='h-full w-full'>
      <span className="font-bold text-4xl">Home</span>
      <FormSubmit data={dashBoard} courseName={courseName}/>
      <div className="border-dashed border border-zinc-500 w-full h-auto rounded-lg">
        <div className="flex flex-col w-full mx-auto my-2 lg:flex-row">
          <div className="grid flex-grow h-auto card rounded-box place-items-center shadow-sm">
            <BarChartComponent data={dashBoard} />
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow h-auto card rounded-box place-items-center shadow-sm">
            <PieChart data={dashBoard} />
          </div>
        </div>
      </div>
      <div className="border-dashed border border-zinc-500 w-full h-auto rounded-lg">
        
      </div>
      <div className="border-dashed border border-zinc-500 w-full h-64 rounded-lg">
        <div className="stats shadow">

          <div className="stat place-items-center">
            <div className="stat-title">Downloads</div>
            <div className="stat-value">31K</div>
            <div className="stat-desc">From January 1st to February 1st</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Users</div>
            <div className="stat-value text-secondary">4,200</div>
            <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">New Registers</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>

        </div>
      </div>
    </div>
  );
}