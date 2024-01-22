import React from "react";
import { getAllListSubject } from "../../function/listSubject";

export default async function ImportListTable() {
  const importlist = await getAllListSubject();
  
  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split('T')[0].split('-').reverse().join('/');
    return DDMMYYYY;
  }

  return (
    <div>
      {importlist ? (
        <div className="table=responsive mt-5 border border-solid">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th className="text-center w-10 p-3 text-sm font-semibold tracking-wide">
                  No.
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  รหัสไฟล์
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  รหัสวิชา
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  ชื่อวิชา
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  ภาคการศึกษา
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  ปีการศึกษา
                </th>
                <th className="text-center p-3 text-sm font-semibold tracking-wide">
                  วันที่อัปโหลด (วัน/เดือน/ปี)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {importlist.map((item, index) => (
                <tr key={index}>
                <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                  <a className="font-bold text-blue-500">{index + 1}</a>
                </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.importHeaderNumber}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.courseID}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.courseName}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.semester}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {item.yearEducation}
                  </td>
                  <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                    {formatDate(item.dateCreated)}
                  </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>ไม่มีข้อมูลจากอัปโหลดไฟล์</div>
      )}
    </div>
  );
}
