import React from "react";

export default function TableCountGrade({ excelData, loading }) {
  const countGrades = (excelData) => {
    if (excelData == null) {
      return null;
    }

    const gradeCount = {};

    excelData.forEach((student) => {
      const grade = student.GRADE;
      gradeCount[grade] = (gradeCount[grade] || 0) + 1;
    });

    return gradeCount;
  };

  const gradeCount = countGrades(excelData ?? null);

  if (gradeCount === null) {
    return null;
  } else {
    const sortedGrades = ["A", "B+", "B", "C+", "C", "D+", "D"];
    const gradeColorMap = {
      A: "green-600",
      B: "primary",
      "B+": "blue-600",
      C: "yellow-600",
      "C+": "orange-500",
      "D+": "red-500",
      D: "primary-content",
    };
    const totalStudents = excelData.length;

    return (
      <div className="flex justify-end">
        {!loading && excelData ? (
          <div className="table-responsive mt-5 border border-solid w-[30%] max-h-[800px] overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th
                    className="text-center w-[60%] p-3 text-lg font-semibold tracking-wide"
                  >
                    เกรด
                  </th>
                  <th
                    className="text-center w-[40%] p-3 text-lg font-semibold tracking-wide"
                  >
                    คน
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedGrades.map((grade) => (
                  <tr className="bg-white" key={grade}>
                    <td className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}>
                      {grade}
                    </td>
                    <td className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}>
                      {gradeCount[grade] || 0}
                    </td>
                  </tr>
                ))}
                <tr className="bg-white">
                  <td className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}>
                    จำนวนทั้งหมด
                  </td>
                  <td className={`text-center p-3 text-lg text-gray-700 whitespace-nowrap`}>
                    {totalStudents}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
