"use client";
import { Fuzzy_Bubbles } from "next/font/google";
import * as XLSX from "xlsx";
import React, { use, useEffect, useState } from "react";
import { AddExcel } from "../../function/import";
import { toast } from "react-toastify";

export default function ImportComponent({ session }) {
  // HeaderForm
  const currentYear = new Date().getFullYear();
  const userId = session;
  const [courseID, setCourseID] = useState("");
  const [term, setTerm] = useState("midterm");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("summer");
  const [yearEducation, setYearEducation] = useState("");
  const [yearEducationSelect, setYearEducationSelect] = useState("");
  const [checkYearEducationSelect, setCheckYearEducationSelect] = useState(false);

  // Onchange
  const [excelfile, setExcelfile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // ExcelSubmit
  const [excelData, setExcelData] = useState(null);
  const [dataExcelFile, setDataExcelFile] = useState(null);

  // Drag file Excel
  const [dragging, setDragging] = useState(false);
  const [excelName, setExcelName] = useState("");

  const formatDateWithTimeZone = (date) => {
    if (date instanceof Date) {
      const options = {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      return date.toLocaleDateString(undefined, options);
    } else {
      return date; // Handle non-Date objects as needed
    }
  };

  const expectedColumnPattern = ["No.", "name", "date"];

  const validateColumnNames = (worksheet) => {
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const columnNames = [];

    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { r: range.s.r, c: C }; // Assuming the column names are in the first row
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const columnName = worksheet[cellRef]?.v;
      columnNames.push(columnName);
    }

    return expectedColumnPattern.every(
      (columnName, index) => columnNames[index] === columnName
    );
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (excelfile === null) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }

    if (excelfile !== null) {
      const workbook = XLSX.read(excelfile, {
        type: "buffer",
        cellDates: true,
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      // Validate column names
      if (!validateColumnNames(worksheet)) {
        toast.error("ไฟล์ไม่ถูกต้อง กรุณาลองอีกครั้ง");
        console.error("Invalid column names in the Excel file.");
        // Handle the validation error (e.g., show a message to the user)
        return;
      }

      const data = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        dateNF: "mm/dd/yyyy",
      });

      // Map the data to include formatted dates and handle specific columns
      const formattedData = data.map((rowData) => ({
        No: rowData["No."],
        name: rowData["name"],
        date: formatDateWithTimeZone(new Date(rowData["date"])),
      }));
      setDataExcelFile(formattedData);
      setExcelData(formattedData);
    }
  };

  const saveExcel = async () => {
    if (!excelfile) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }

    if (!courseID.trim() || !courseName.trim() || !yearEducation.trim()) {
      toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const formData = {
      courseID: courseID,
      term: term,
      courseName: courseName,
      semester: semester,
      yearEducation: yearEducation,
      createByUserId: session,
    };

    if (dataExcelFile && dataExcelFile.length > 0) {
      const formattedExcelData = dataExcelFile.map((item, index) => ({
        no: item.No,
        name: item.name,
        date: item.date,
        createByUserId: session,
      }));

      const importHeader = {
        courseID: formData.courseID,
        courseName: formData.courseName,
        semester: formData.semester,
        yearEducation: formData.yearEducation,
        createByUserId: session,
      };

      const payload = {
        excelData: formattedExcelData,
        importHeader: importHeader,
      };

      try {
        const result = await AddExcel(payload);
        if (result === 1) {
          toast.success("บันทึกข้อมูลสำเร็จ");
        } else {
          toast.error("พบข้อผิดพลาดเกิดขึ้น");
          console.error("Error deleting user.");
        }
      } catch (error) {
        console.error("Error saving Excel data:", error);
      }
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const selectedFile = files[0];

      if (
        selectedFile &&
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "text/csv",
        ].includes(selectedFile.type)
      ) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelfile(e.target.result);
        };
        setExcelName(selectedFile.name);
      } else {
        setTypeError("Please select only excel file");
        setExcelfile(null);
      }
    } else {
      console.log("Please Select your file");
    }
  };

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
    <div className="px-9 py-5">
      <h1 className="text-[40px] mb-3">ข้อมูลรายวิชา</h1>
      <div className="w-full h-[300px] bg-[#2F3337] rounded-lg flex flex-col md:flex-row">
        <div className="w-full md:w-[80%] h-[300px] z-1 bg-[#03A96B] rounded-tl-lg rounded-bl-lg flex items-center justify-center">
          <div className="px-5 py-10">
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
                      onChange={(e) => setYearEducation(e.target.value)}
                    />
                    <input
                      type="checkbox"
                      name="checearEducationSelect"
                      checked={checkYearEducationSelect}
                      value={checkYearEducationSelect}
                      className="ml-2 checkbox checkbox-sm"
                      onChange={() =>
                        setCheckYearEducationSelect(!checkYearEducationSelect)
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-[20%] mt-4 mb-2 md:mt-0">
          <div className="flex  md:flex-col flex-row items-center justify-center gap-2 h-full">
            <button
              className="btn btn-active bg-blue-400 w-[120px] max-x-lg text-white"
              onClick={handleFileSubmit}
            >
              อัปโหลดไฟล์
            </button>
            <button
              className="btn btn-active bg-green-600 text-white w-[120px] max-x-lg"
              onClick={() => saveExcel()}
            >
              บันทึก
            </button>
          </div>
        </div>
      </div>
      <div
        className={`w-full h-40 border-dashed border-2 border-gray-300 flex items-center justify-center ${
          dragging ? "bg-gray-100" : ""
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p className="text-gray-600">
          {excelName
            ? `ไฟล์ชื่อ ${excelName} กรุณากดปุ่มอัปโหลดไฟล์`
            : "วางไฟล์ เพื่อ อัปโหลดที่นี่"}
        </p>
      </div>

      {/* <h3 className="mt-5">Upload & View Excel Sheets </h3> */}

      {/*form*/}
      {/* <form className="form-group costom-from" onSubmit={handleFileSubmit}>
        <input
          type="File"
          className='form-control file-input file-input-bordered file-input-success max-w-xs"'
          required
          onChange={handleFile}
        />
        <button type="Submit" className="btn btn-primary btn-md mt-5">
          UPLOAD
        </button>
        {typeError && (
          <div className="aleart aleart-danger" role="alerts">
            {typeError}
          </div>
        )}
      </form> */}
      {/* View  data */}
      <div className="viewer">
        {excelData ? (
          <div className="table=responsive">
            {/* <table className="table">
              <thead>
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {excelData.map((individualExcelData, index) => (
                  <tr key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td key={key}>
                        {key.toLowerCase().includes("date") &&
                        individualExcelData[key] instanceof Date
                          ? formatDateWithTimeZone(individualExcelData[key])
                          : individualExcelData[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table> */}
            <table className="w-full">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  {Object.keys(excelData[0]).map((key) => (
                    <th
                      className="text-center w-10 p-3 text-sm font-semibold tracking-wide"
                      key={key}
                    >
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {excelData.map((individualExcelData, index) => (
                  <tr className="bg-white" key={index}>
                    {Object.keys(individualExcelData).map((key) => (
                      <td
                        className="text-center p-3 text-sm text-gray-700 whitespace-nowrap"
                        key={key}
                      >
                        {key.toLowerCase().includes("date") &&
                        individualExcelData[key] instanceof Date
                          ? formatDateWithTimeZone(individualExcelData[key])
                          : individualExcelData[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>ไม่มีข้อมูลจากอัปโหลดไฟล์</div>
        )}
      </div>
    </div>
  );
}
