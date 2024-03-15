"use client";
import React, { use, useEffect, useMemo, useState } from "react";
import CustomSelect from "../../components/Select.jsx";
import DateCalrendar from "../../components/DateCalrendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { useDebouncedCallback } from "use-debounce";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import {SearchByCourseName , SearchFilterYear,SearchFilterSemester} from "../../function/FormSubmitHome.js"

export default function FormSubmit({ data, courseName }) {
  const [searchCourse, setSearchCourse] = useState({
    courseName: '',
    courseID: '',
    yearEducation: '',
    semester: ''
  });
  const serchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  //ตัวแปรในการ fill select => select ตามหลังเก็บค่าที่เลือก
  const [nameCourse, setNameCourse] = useState(courseName);
  const [nameSelect, setNameSelect] = useState("");
  const [idCourse, setIdCourse] = useState([]);
  const [idSelect, setIdSelect] = useState("");
  const [yearCourse, setYearCourse] = useState([]);
  const [yearSelect, setYearSelect] = useState("");
  const [semesterCourse, setSemesterCourse] = useState([]);
  const [semesterSelect, setsemesterSelect] = useState("");

  const handleOnChangeCourseName = async (value) => {
    await setNameSelect(value);
    await setIdSelect("");
    try {
        const dataCourseID = await SearchByCourseName(value);
        await setIdCourse(dataCourseID);
    } catch (error) {
        throw new Error("Error fetching data");
    }     
  };
  
  const handleOnChangeCourseID = async (value) => {
    await setIdSelect(value);
    await setYearSelect("");
    try {
      const dataYearEducation = await SearchFilterYear(value,nameSelect)
      await setYearCourse(dataYearEducation);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };


  const handleOnChangeYear = async (value) => {
    await setYearSelect(value);
    await setsemesterSelect("");
    try {
      const dataSemester = await SearchFilterSemester(value,idSelect,nameSelect)
      await setSemesterCourse(dataSemester);
    } catch (error) {
      throw new Error("Error fetching data");
    }
  };

  const handleOnChangeSemester = async (value) => {
    await setsemesterSelect(value);
  };

  const handleFormSubmit = (formData) => {
    setIsLoading(true);

    // Simulate an asynchronous operation with a timeout
    setTimeout(() => {
      // Hide loading spinner after the timeout
      setIsLoading(false);
    }, 2000);

    setSearchCourse("");
    const { courseName,courseID,yearEducation,semester} = Object.fromEntries(formData);
    setSearchCourse(prevState =>({
      ...prevState,
      courseName: courseName,
      courseID: courseID,
      yearEducation: yearEducation,
      semester: semester
    }));
  };

  useEffect(() => {
    handleSearch();
  }, [searchCourse]);

  const handleSearch = useDebouncedCallback(() => {
    const params = new URLSearchParams(serchParams);

    if (searchCourse.courseName) {
      params.set("courseName", searchCourse.courseName);
    } else {
      params.delete("courseName");
    }

    if (searchCourse.courseID) {
      params.set("courseID", searchCourse.courseID);
    } else {
      params.delete("courseID");
    }

    if (searchCourse.yearEducation) {
      params.set("YearEducation", searchCourse.yearEducation);
    } else {
      params.delete("YearEducation");
    }

    if (searchCourse.semester) {
      params.set("Semester", searchCourse.semester);
    } else {
      params.delete("Semester");
    }
    replace(`${pathname}?${params}`);
  }, 400);

  return (
    <div className="p-3 h-auto w-full border border-gray-200 border-opacity-50 rounded-lg bg-base-100 shadow-sm">
      <form action={handleFormSubmit}>
        <div className="flex flex-row gap-2 mt-2 justify-between mx-3">
          <div className="xl:flex xl:gap-5 flex-row">
            <div className="flex items-center mb-2 gap-4">
              <label
                htmlFor="courseName"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                ชื่อวิชา
              </label>
              {nameCourse.length >= 1 ? (
                <select
                id="courseName"
                value={nameSelect ?? ""}
                onChange={(e) => handleOnChangeCourseName(e.target.value)}
                className="select select-secondary w-full max-w-xs"
                name="courseName"
              >
                <option value="" >กรุณาเลือกชื่อวิชา</option>
                {nameCourse.map((course, index) => (
                  <option key={index} value={course.courseName}>
                    {course.courseName}
                  </option>
                ))}
              </select>
              ) : (
                <select
                id="courseName"
                className="select select-secondary w-full max-w-xs"
                name="courseName"
                disabled
              >
                <option value="" >กรุณาเลือกชื่อวิชา</option>
              </select>
              )}
            </div>
            <div className="flex items-center mb-2 gap-4">
              <label
                htmlFor="idCourse"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                รหัสวิชา
              </label>
              {idCourse.length >= 1 ? (
                <select
                  id="courseID"
                  value={idSelect}
                  onChange={(e) => handleOnChangeCourseID(e.target.value)}
                  className="select select-secondary w-full max-w-xs"
                  name="courseID"
                >
                  <option value="">กรุณาเลือกรหัสวิชา</option>
                  {idCourse.map((option, index) => (
                    <option key={index} value={option.courseID}>
                      {option.courseID}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="courseID"
                  className="select w-full max-w-xs"
                  disabled
                >
                  <option value="">กรุณาเลือกรหัสวิชา</option>
                </select>
              )}
            </div>
            <div className="flex items-center mb-2 gap-4">
              <label
                htmlFor="yearCourse"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                ปีการศึกษา
              </label>
              {(yearCourse.length >= 1 && idCourse.length >= 1) && (nameSelect != "" && idSelect != "") ? (
                <select
                  id="yearEducation"
                  value={yearSelect}
                  onChange={(e) => handleOnChangeYear(e.target.value)}
                  className="select select-secondary w-full max-w-xs"
                  name="yearEducation"
                >
                  <option value="" selected>กรุณาเลือกปี</option>
                  {yearCourse.map((option, index) => (
                    <option key={index} value={option.yearEducation}>
                      {option.yearEducation}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="yearEducation"
                  className="select w-full max-w-xs"
                  disabled
                >
                  <option value="">กรุณาเลือกปี</option>
                </select>
              )}
            </div>
            <div className="flex items-center mb-2 gap-4">
              <label
                htmlFor="semesterCourse"
                className="text-black text-lg flex-shrink-0 ml-5"
              >
                เทอม
              </label>
              {(yearCourse.length >= 1 && idCourse.length >= 1 && semesterCourse.length >=1) && (nameSelect != "" && idSelect != "" && yearSelect != "") ? (
                <select
                  id="semester"
                  value={semesterSelect}
                  onChange={(e) => handleOnChangeSemester(e.target.value)}
                  className="select select-secondary w-full max-w-xs"
                  name="semester"
                >
                  <option value="" selected>กรุณาเลือกเทอม</option>
                  {semesterCourse.map((option, index) => (
                    <option key={index} value={option.semester}>
                      {option.semester}
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  id="semester"
                  className="select w-full max-w-xs"
                  disabled
                >
                  <option value="">กรุณาเลือกเทอม</option>
                </select>
              )}
            </div>
          </div>
          <div className="xl:flex xl:gap-5 flex-row">
            <button
              className="btn btn-primary w-full text-white px-4 py-2 rounded-lg xl:w-32 xl:max-w-md"
              type="submit"
              disabled={isLoading} // Disable the button while loading
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner bg-black"></span>
                  <p className="text-black">loading</p>
                </>
              ) : (
                "Search"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
