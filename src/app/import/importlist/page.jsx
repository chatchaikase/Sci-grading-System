"use server";
import React from "react";
import BtnDirectToImportListPage from "../../../components/Import/importlist/BtnDirectToImportListPage";
import Link from "next/link";
import {
  CountListimportheader,
  getAllListSubject,
  getListimportheaderForPage,
} from "../../../function/listSubject";
import Pagination from "../../../components/Pageination/Pageination";
import { auth } from "../../../lib/auth";

export default async function ImportListPage({ searchParams }) {
  const session = await auth();
  const userId = session.user.userId;
  const page = searchParams?.page || 1;
  const list = await getListimportheaderForPage(page, userId);
  const countPage = await CountListimportheader(userId);

  // จัดรูปเเบบเวลา
  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split("T")[0].split("-").reverse().join("/");
    return DDMMYYYY;
  };

  return (
    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <div className="px-4 pt-2 flex items-center justify-between">
        <p className="text-[30px]">รายการอัปโหลดล่าสุด</p>
        <BtnDirectToImportListPage />
      </div>
      <div>
        <div className="table=responsive mt-5 border border-solid">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                  No.
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  รหัสไฟล์
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  รหัสวิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  วิชา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  ภาคการศึกษา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  ปีการศึกษา
                </th>
                <th className="text-center p-3 text-lg font-semibold tracking-wide">
                  วันที่อัปโหลด (วัน/เดือน/ปี)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y bg-white divide-gray-100">
              {list.length > 0 ? (
                list.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      <a className="font-bold text-blue-500">{index + 1}</a>
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.importHeaderNumber}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.courseID}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.courseName}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.semester}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.yearEducation}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {formatDate(item.dateCreated)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  >
                    <div className="mx-4 my-2 mt-2 text-xl">
                      ไม่มีรายการอัปโหลด กรุณาอัปโหลด
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Pagination rows={5} count={countPage} />
        </div>
      </div>
    </div>
  );
}
