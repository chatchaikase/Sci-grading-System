import React from "react";

export default function ImportInputFields({
  courseID,
  setCourseID,
  courseName,
  setCourseName,
  semester,
  setSemester,
  yearEducation,
  setYearEducation,
  checkYearEducationSelect,
  setYearEducationSelect,
  yearEducationSelect,
  setCheckYearEducationSelect,
}) {
  //Loop Select Year
  const generateYearOptions = () => {
    const startYear = new Date().getFullYear() + 541;
    const currentYear = new Date().getFullYear() + 542;
    const years = [];

    for (let year = currentYear; year >= startYear; year--) {
      years.push(year.toString());
    }

    return years;
  };

  return (
    <div className="flex items-center justify-between gap-5">
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <label
            htmlFor="courseID"
            className="text-white text-lg flex-shrink-0"
          >
            รหัสวิชา
          </label>
          <input
            name="courseID"
            type="text"
            placeholder="กรุณากรอกรหัสวิชา"
            className="ml-2 input input-bordered w-full max-w-xs"
            value={courseID}
            onChange={(e) => setCourseID(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <label
            htmlFor="courseName"
            className="text-white text-lg flex-shrink-0"
          >
            ชื่อวิชา
          </label>
          <input
            name="courseName"
            type="text"
            placeholder="กรุณากรอกชื่อวิชา"
            className="input input-bordered w-full max-w-xs"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center gap-4 mb-4">
          <label
            htmlFor="semester"
            className="text-white text-lg flex-shrink-0"
          >
            ภาคการศึกษา
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            name="semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            <option value="summer">Summer</option>
            <option value="first">First</option>
            <option value="second">Second</option>
          </select>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <label
            htmlFor="yearEducation"
            className="text-white text-lg flex-shrink-0 ml-5"
          >
            ปีการศึกษา
          </label>
          <div className="flex items-center ">
            <select
              className="select select-bordered w-full max-w-xs"
              name="yearEducationSelect"
              value={yearEducationSelect}
              disabled={checkYearEducationSelect}
              onChange={(e) => setYearEducationSelect(e.target.value)}
            >
              {generateYearOptions().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
            <input
              name="yearEducation"
              type="text"
              placeholder="กรุณากรอกปี"
              disabled={!checkYearEducationSelect}
              className="ml-5 input input-bordered w-full max-w-xs"
              value={yearEducation}
              onChange={(e) => {
                const inputValue = e.target.value;
                const validatedValue =
                  Math.max(1, Math.floor(parseFloat(inputValue))) || "";
                setYearEducation(validatedValue);
              }}
            />
            <input
              type="checkbox"
              name="checearEducationSelect"
              checked={checkYearEducationSelect}
              value={checkYearEducationSelect}
              className="ml-2 checkbox checkbox-sm bg-white"
              onChange={() =>
                setCheckYearEducationSelect(!checkYearEducationSelect)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
