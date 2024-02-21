"use server"

import React from 'react';
import BarChartComponent from '../components/Dashboard/BarChart'
import PieChart from '../components/Dashboard/PieChart'
import { GetDataDashboard, GetCourseNameList } from '../function/dashboard.js'
import FormSubmit from '../components/Dashboard/FormSubmit.jsx'

import { auth } from '../lib/auth';
import {
  GetHomePageList,
} from '../function/listhomepage';
import { formatDate} from '../function/formatDate';


export default async function Home({ searchParams }) {
  const query_CourseID = searchParams?.CourseID || "";
  const query_DateRange = searchParams?.DateRange || "";
  const query_CourseName = searchParams?.CourseName || "";

  const dashBoard = await GetDataDashboard(query_CourseID, query_DateRange, query_CourseName);
  const courseName = await GetCourseNameList();

  const session = await auth();
  const userId = session.user.userId;
  const itemList = await GetHomePageList(userId);

  return (
    <div className='h-full w-full'>
      <span className="font-bold text-4xl">Home</span>
      <FormSubmit data={dashBoard} courseName={courseName} />
      <div className="border-dashed border border-zinc-500 w-full h-auto rounded-lg my-5">
        <div className="flex flex-col w-full mx-auto my-2 lg:flex-row">
          <div className="grid flex-grow w-auto h-auto card rounded-box place-items-center shadow-sm">
            <BarChartComponent data={dashBoard} />
          </div>
          <div className="divider lg:divider-horizontal"></div>
          <div className="grid flex-grow w-auto h-auto card rounded-box place-items-center shadow-sm">
            <PieChart data={dashBoard} />
          </div>
        </div>
      </div>
      <div className="table-container table-responsive mt-5 border border-solid max-h-[6z 00px] overflow-y-auto rounded-lg shadow">
        <table className="w-full">
          <thead className="border-b-2 border-gray-200 sticky top-0 bg-gray-50">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                No.
              </th>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                หมายเลขอัปโหลด
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                รหัสวิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                วิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                ภาคการศึกษา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                จำนวนนิสิต
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                อัพโหลดวันที่
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                A
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                B+
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                B
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                C+
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                C
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                D+
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                D
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                I
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                F
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                W
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {itemList.length > 0 ? (
              itemList.map((item, index) =>
                <tr key={index}>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%" >
                    <a className="font-bold text-blue-400">{index + 1}</a>
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="">
                    {item.importHeaderNumber}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="10%">
                    {item.courseID}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="18%">
                    {item.courseName}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="8%">
                    {item.semester}
                  </td>
                  <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="7%">
                    {item.total}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="7%">
                    {formatDate(item.dateCreated)}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.a ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.bplus ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.b ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.cplus ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.c ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.dplus ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.d ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.f ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.i ?? 0}
                  </td>
                  <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                    width="3%">
                    {item.w ?? 0}
                  </td>
                </tr>
              )) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                >
                  <div className="mx-4 my-2 mt-2 text-xl">
                    ไม่มีรายการของฉัน กรุณาอัปโหลด
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
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