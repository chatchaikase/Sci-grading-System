"use server"

import {
  deleteImportList,
  getAllListSubject,
  CountListSubject
} from "../../../../function/listSubject.js";
import { toast } from "react-toastify";
import ModalImportListDelete from "../../../../components/Modal/ModalImportListDelete.jsx";
import Drawer from "../../../../components/ListSubject/Drawer.jsx"
import SearchList from "../../../../components/ListSubject/SearchList.jsx"
import Pageination from "../../../../components/Pageination/Pageination.jsx"
import Link from "next/link";
import IconOption from "../../../../components/Admin/IconOption.jsx";
import FromDeleteList from "../../../../components/ListSubject/FromDeleteListSubject.jsx"
import { auth } from "../../../../lib/auth.js";


export default async function Home ({searchParams}) {
  const session = await auth();
  const userId = session.user.userId;
  const query = searchParams?.ImportHeaderNo || "";
  const additionalQuery = searchParams?.CourseID || "";
  const page = searchParams?.page || 1;
  const itemList = await getAllListSubject(query, additionalQuery,page);
  const countPage = await CountListSubject(query, additionalQuery,userId);
  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split('T')[0].split('-').reverse().join('/');
    return DDMMYYYY;
  };

  return (
    <div>
      <div className="flex gap-5">
        <SearchList placeholder1={"ค้นหาตาม Import No."} placeholder2={"ค้นหาตาม Course ID"} />
      </div>
      <Drawer/>
      <div className="overflow-x-auto mt-5 max-h-screen bg-gray-100 rounded-lg shadow" style={{ zIndex: 0 }}>
        <table className="w-full">
          {/* head */}
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No.
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                หมายเลขอัปโหลด
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                รหัสวิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                วิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                วันที่อัปโหลด (วัน/เดือน/ปี)
              </th>
              <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                <IconOption />
              </th>
            </tr>
          </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
            {/* row 1 */}
            {itemList.map((item, index) =>
              <tr key={index}>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  <a className="font-bold text-blue-500">{index + 1}</a>
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%" >
                  <Link legacyBehavior
                    href={{
                      pathname: '/list/subjectlist/[detail]/page',
                      query: {
                        importHeaderNumber: item.importHeaderNumber,
                      },
                    }}
                    as={`/list/subjectlist/detail/${item.importHeaderNumber}`}
                    passHref
                  >
                    <a className="text-blue-400 cursor-pointer hover:scale-105 hover:text-blue-600">
                      {item.importHeaderNumber}
                    </a>
                  </Link>
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
                  {item.courseID}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="22%">
                  {item.courseName}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
                  {formatDate(item.dateCreated)}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  <FromDeleteList importNo={item.importHeaderNumber}/>
                </td>
              </tr>
            )}
            </tbody>   
        </table>
        <Pageination count={countPage} />
      </div>
    </div>    
  );  
};
