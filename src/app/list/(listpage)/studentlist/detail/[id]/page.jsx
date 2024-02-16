"use server";
import {
    GetGradeStudent
} from "../../../../../../function/listStudent";
import { auth } from "../../../../../../lib/auth";

export default async function StudentDetailPage({ params }) {
    const session = await auth();
    const userId = session.user.userId;
    const { id } = params;
    const listItem = await GetGradeStudent(id, userId);
    const gradeStudent = (grade) => {
        const gradeColors = {
            'A': 'text-green-500',
            'B+': 'text-green-500',
            'B': 'text-green-500',
            'C+': 'text-green-500',
            'C': 'text-green-500',
            'D+': 'text-green-500',
            'D': 'text-green-500',
            'I': 'text-red-500',
            'F': 'text-red-500',
            'W': 'text-red-500',
        };
        return gradeColors[grade] || '';
    }


    return (
        <div>
            <div className=" h-auto w-full px-3 pt-7">
                <div className='flex flex-col gap-2'>
                    <div className='xl:flex xl:gap-5 flex-row'>
                        <div className="flex items-center mb-2 xl:w-[300px]">
                            <label htmlFor="courseID" className="text-black text-lg flex-shrink-0">
                                รหัสนิสิต
                            </label>
                            <input
                                name="courseID"
                                type="text"
                                value={listItem[0].id}
                                readOnly
                                className="ml-2 input input-bordered w-full"
                            />
                        </div>
                        <div className="flex items-center mb-2 xl:w-[380px]">
                            <label htmlFor="courseID" className="text-black text-lg flex-shrink-0">
                                ชื่อ-สกุล
                            </label>
                            <input
                                name="courseID"
                                type="text"
                                value={listItem[0].name}
                                readOnly
                                className="ml-2 input input-bordered w-full"
                            />
                        </div>
                    </div>
                    <div className='xl:flex justify-end items-center'>
                    </div>
                </div>
            </div>

            <div className="table-container table-responsive mt-5 border border-solid max-h-[800px] overflow-y-auto rounded-lg shadow">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b-2 border-gray-200">
                        <tr>
                            <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                No.
                            </th>
                            <th className="text-left w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                รหัสวิชา
                            </th>
                            <th className="text-left w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                วิชา
                            </th>
                            <th className="text-left w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                ภาคการศึกษา
                            </th>
                            <th className="text-left w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                ปีการศึกษา
                            </th>
                            <th className="text-left w-10 p-3 text-lg font-semibold tracking-wide sticky top-0 bg-white">
                                เกรด
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {listItem.map((item, index) => (
                            <tr className="bg-white" key={index}>
                                <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap " width="10%">
                                    <a className="font-bold text-blue-500">{index + 1}</a>
                                </td>
                                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
                                    {item.courseID}
                                </td>
                                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
                                    {item.courseName}
                                </td>
                                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap" width="15%">
                                    {item.semester}
                                </td>
                                <td className="text-left p-3 text-lg text-gray-700 whitespace-nowrap" width="15%">
                                    {item.yearEducation}
                                </td>
                                <td className="text-left p-3 whitespace-nowrap" width="15%">
                                    <p className={`text-lg ${gradeStudent(item.grade)}`}>
                                        {item.grade}
                                    </p>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}
