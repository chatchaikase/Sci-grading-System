import SearchUser from "../../components/Admin/SearchUser"
import Pageination from "../../components/Pageination/Pageination"
import Link from "next/link";
import IconOption from "../../components/Admin/IconOption"
import {getAllUser} from "../../function/admin"

export default async function AdminPage() {
  const users = await getAllUser();
  return (
    <div className="flex flex-col p-5 h-screen bg-gray-100">
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <div className="flex-col">
        <div className="flex-1">
            <div className="my-4 flex items-center justify-between">
              <div className="flex gap-5">
                <SearchUser placeholder={"ค้นหาตาม username"} />
                <SearchUser placeholder={"ค้นหาตาม email"} />
              </div>
              <div className="flex mr-2">
                <Link href={'/admin/user/add'}>
                <div>
                  <button
                    className="btn bg-green-600 text-white"
                  >
                    เพิ่มผู้ใช้งาน
                  </button>
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                    No.
                  </th>
                  <th className="text-center p-3 text-lg font-semibold tracking-wide">
                    username
                  </th>
                  {/* <th className="text-left w-15 p-3 text-lg font-semibold tracking-wide">
                    password
                  </th> */}
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    ชื่อ
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    นามสกุล
                  </th>
                  <th className="text-center tw-15 p-3 text-lg font-semibold tracking-wide">
                    email
                  </th>
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide">
                    สถานะ
                  </th>               
                  <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                   <IconOption />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
              {users.map((item, index) => (
                  <tr className="bg-white" key={index} >
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      <a className="font-bold text-blue-500">
                        {/* {startIndex + index + 1} */} {index + 1}
                      </a>
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.username}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.firstname}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.lastname}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                    {item.email}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      {item.isAdmin === 1 ? (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-white bg-blue-600 rounded-lg bg-opacity-50">
                          Admin
                        </span>
                      ) : (
                        <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                          User
                        </span>
                      )}
                    </td>
                    <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                      <Link href={`/admin/user/${item.userId}`}>
                      <button
                        className="btn bg-orange-500 text-white"
                        // onClick={() => editUserClickHandler(item)}
                      >
                        เเก้ไข
                      </button>
                      </Link>
                      <button
                        className="btn bg-red-500 text-white"
                        // onClick={() =>
                        //   deleteUserClickHandler(item.username, item.userId)
                        // }
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pageination />
          </div>
      </div>
    </div>
  );
}
