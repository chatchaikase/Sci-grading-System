"use server";
import IconOption from '../../../../components/Admin/IconOption';
import {
  CountListStudent,
  GetStudent,
} from '../../../../function/listStudent';
import { auth } from '../../../../lib/auth';
import SearchData from '../../../../components/SearchData/SearchData';
import Pageination from '../../../../components/Pageination/Pageination';
import Link from 'next/link';

export default async function StudentListPage({ searchParams }) {
  const session = await auth();
  const userId = session.user.userId;
  const query = searchParams?.id || "";
  const additionalQuery = searchParams?.name || "";
  const page = searchParams?.page || 1;
  const itemList = await GetStudent(
    query,
    additionalQuery,
    page,
    userId
  );
  const countPage = await CountListStudent(query, additionalQuery, userId);
  const startingIndex = (page - 1) * 10;


  return (
    <div>
      <div>
        <SearchData
          placeholder1={"ค้นหาตาม รหัสนิสิต"}
          placeholder2={"ค้นหาตาม ชื่อ"}
        />
      </div>
      <div className="table-container table-responsive overflow-x-auto mt-5 max-h-screen bg-gray-100 rounded-lg shadow">
        <table className="w-full">
          {/* head */}
          <thead className="border-b-2 border-gray-200 sticky top-0 bg-white">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide ">
                No.
              </th>
              <th className="text-left p-3 text-lg font-semibold tracking-wide ">
                รหัสนิสิต
              </th>
              <th className="text-left p-3 text-lg font-semibold tracking-wide ">
                ชื่อ
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide ">
                รายวิชาที่ลงทะเบียน
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                <IconOption />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {itemList.map((item, index) =>
              <tr key={index}>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="15%" >
                  <a className="font-bold text-blue-400">{startingIndex + index + 1}</a>
                </td>
                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="20%">
                  {item.id}
                </td>
                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="25%">
                  {item.name}
                </td>
                <td className="text-center p-3 text-xl font-semibold text-red-400 whitespace-nowrap"
                  width="20%">
                  {item.count}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="15%">
                  <Link href={`/list/studentlist/detail/${item.id}`}>
                    <button className="btn bg-green-600 text-white">
                      รายละเอียด
                    </button>
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Pageination rows={10} count={countPage} />
      </div>
    </div>
  )
}
