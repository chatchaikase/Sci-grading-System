"use server";
import IconOption from '../../../../components/Admin/IconOption';
import {
  GetStudent,
} from '../../../../function/listStudent'
import { auth } from '../../../../lib/auth';

export default async function StudentListPage() {
  const session = await auth();
  const userId = session.user.userId;
  const itemList = await GetStudent(userId);



  return (
    <div>StudentListPage
      <div className="overflow-x-auto mt-5 max-h-screen bg-gray-100 rounded-lg shadow">
        <table className="w-full">
          {/* head */}
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No.
              </th>
              <th className="text-left p-3 text-lg font-semibold tracking-wide">
                รหัสนิสิต
              </th>
              <th className="text-left p-3 text-lg font-semibold tracking-wide">
                ชื่อ
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                รายวิชาที่ลงทะเบียน
              </th>
              <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                <IconOption />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {itemList.map((item, index) =>
              <tr key={index}>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="15%" >
                  {index + 1}
                </td>
                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="20%">
                  {item.id}
                </td>
                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="25%">
                  {item.name}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="20%">
                  {item.count}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap"
                  width="15%">
                  <button className="btn bg-green-600 text-white">
                    รายละเอียด
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
