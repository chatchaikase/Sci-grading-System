"use server";
import {
  GetimportDetail,
  GetiExcelDetail,
} from "../../../../../../function/listSubject";
import {formatDate} from "../../../../../../function/formatDate.js"
import { auth } from "../../../../../../lib/auth";
import { redirect } from 'next/navigation'

const SubjectDetailPage = async ({ params }) => {
  const session = await auth();
  const userId = session.user.userId;
  const { id } = params;
  const [importH] = await GetimportDetail(id, userId);
  if (!importH) {
    redirect('/')
  }
  const listItem = await GetiExcelDetail(id,userId);
  if (!listItem) {
    redirect('/')
  }

  return (
    <div>
      <h1 className="text-[40px] mb-3">ข้อมูลรายวิชา</h1>
      <div className="w-full h-[300px] bg-base-200 rounded-lg flex flex-col md:flex-row">
        <div className="w-full md:w-[100%] h-[300px] z-1 bg-accent rounded-lg">
          <div className="px-5 py-10">
            <table className="w-[90%] mx-auto">
              <thead>
                <tr>
                  <th className="w-[10%] text-white text-lg text-left flex-shrink-0">
                    หมายเลขอัปโหลด
                  </th>
                  <th className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center w-[60%]"
                      value={importH.importHeaderNumber}
                      readOnly={true}
                    />
                  </th>
                  <th className="w-[10%] text-white text-lg text-left flex-shrink-0">
                    รหัสวิชา
                  </th>
                  <th className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center w-[60%]"
                      value={importH.courseID}
                      readOnly={true}
                    />
                  </th>
                </tr>
                <tr>
                  <th className="h-4"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="w-[10%] text-white text-lg flex-shrink-0 text-left font-bold">
                    วิชา
                  </td>
                  <td className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center font-bold w-[60%]"
                      value={importH.courseName}
                      readOnly={true}
                    />
                  </td>
                  <td className="w-[10%] text-white text-lg flex-shrink-0 text-left font-bold">
                    ปีการศึกษา
                  </td>
                  <td className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center font-bold w-[60%]"
                      value={importH.yearEducation}
                      readOnly={true}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="h-4"></td>
                </tr>
                <tr>
                  <td className="w-[10%] text-white text-lg flex-shrink-0 text-left font-bold">
                    ภาคการศึกษา
                  </td>
                  <td className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center font-bold w-[60%]"
                      value={importH.semester}
                      readOnly={true}
                    />
                  </td>
                  <td className="w-[10%] text-white text-lg flex-shrink-0 text-left font-bold">
                    อัปโหลดเมื่อ
                  </td>
                  <td className="w-[30%] text-left">
                    <input
                      name="Importnumber"
                      type="text"
                      className="input input-bordered text-center font-bold w-[60%]"
                      value={formatDate(importH.dateCreated)}
                      readOnly={true}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="table=responsive mt-5 border border-solid max-h-[800px] overflow-y-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No.
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
                วันที่อัปโหลด (วัน/เดือน/ปี)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y bg-white divide-gray-100">
            {listItem.map((item, index) => (
              <tr key={index}>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  <a className="font-bold text-blue-500">{index + 1}</a>
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  {item.id}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  {item.name}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  {item.grade}
                </td>
                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
                  {formatDate(item.dateCreated)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubjectDetailPage;
