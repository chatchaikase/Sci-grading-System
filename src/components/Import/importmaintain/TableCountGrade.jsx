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
  }

  const gradeCount = countGrades(excelData ?? null);

  if (gradeCount === null) {
    return null;
  } else {
    const sortedGrades = ["A", "B+", "B", "C+", "C", "D+", "D"];
    const gradeColorMap = {
      "A": "green-600",
      "B": "primary",
      "B+": "blue-600",
      "C": "yellow-600",
      "C+": "orange-500",
      "D+": "red-500",
      "D": "secondary",
    };
    const totalStudents = excelData.length;

    return (
      <div className="">
        {excelData && (
          <div>
            {/* แสดงจำนวนนักศึกษาที่ได้แต่ละเกรด */}
            <div className="mt-5 flex flex-col w-[cal(1200px-200px)] p-3 gap-2 items-end justify-center">
              {sortedGrades.map((grade) => (
                <button
                  className={`btn bg-${gradeColorMap[grade]} text-white w-[250px]`}
                  key={grade}
                >
                  {grade}
                  <div
                    className={`badge badge-white text-${gradeColorMap[grade]}`}
                  >
                    {gradeCount[grade] || 0} คน
                  </div>
                </button>
              ))}
              <button
                className={`btn bg-slate-700 text-white w-[250px]`}
              >
                จำนวนทั้งหมด
                <div
                  className={`badge badge-white text-slate-700`}
                >
                  {totalStudents} คน
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}
