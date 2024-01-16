"use client";
import { Fuzzy_Bubbles } from "next/font/google";
import * as XLSX from "xlsx";
import React, { use, useEffect, useState } from "react";
import { AddExcel } from "../../function/import";
import { toast } from 'react-toastify';

export default function ImportComponent({session}) {
  // HeaderForm
  const userId = session;
  const [courseID, setCourseID] = useState("");
  const [term, setTerm] = useState("midterm");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("summer");
  const [yearEducation, setYearEducation] = useState("");

  // Onchange
  const [excelfile, setExcelfile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // ExcelSubmit
  const [excelData, setExcelData] = useState(null);
  const [dataExcelFile, setDataExcelFile] = useState(null);
  //   const [no, setNo] = useState("");
  //   const [id, setId] = useState("");
  //   const [name, setName] = useState("");
  //   const [date, setDate] = useState("");

  const handleSubmit = (e) => {};
  //ChangeEvent
  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelfile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel file");
        setExcelfile(null);
      }
    } else {
      console.log("Please Select your file");
    }
  };

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
    if (excelfile !== null) {
      const workbook = XLSX.read(excelfile, {
        type: "buffer",
        cellDates: true,
      });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      // Validate column names
      if (!validateColumnNames(worksheet)) {
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
      setExcelData(formattedData.slice(0, 10));
    }
  };

  const saveExcel = async () => {
    if (!excelfile) {
        alert("กรุณา import Excel file");
        return;
      }

    if (!courseID.trim() || !courseName.trim() || !yearEducation.trim()) {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      }

    const formData = {
      courseID: courseID,
      term: term,
      courseName: courseName,
      semester: semester,
      yearEducation: yearEducation,
      createByUserId:session
    };

    if (dataExcelFile && dataExcelFile.length > 0) {
      const formattedExcelData = dataExcelFile.map((item, index) => ({
        no: item.No,
        name: item.name,
        date: item.date,
        createByUserId:session
      }));

      const importHeader = {
        courseID: formData.courseID,
        courseName: formData.courseName,
        semester: formData.semester,
        yearEducation: parseInt(formData.yearEducation),
        createByUserId:session,
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

  return (
    <div className="">
      <div className="flex gap-5 items-center">
        <h1>Information</h1>
        <button
          onClick={() => saveExcel()}
          className="btn btn-success btn-md  mt-2"
        >
          บันทึก
        </button>
      </div>
      <div className="mt-5 bg-success py-4 rounded-md">
        <div className="mt-5 mx-10">
          <div className="max-w-5xl grid grid-cols-1 md:grid-cols-3">
            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="courseID" className="block text-white">
                  รหัสวิชา
                </label>
                <input
                  name="courseID"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={courseID}
                  onChange={(e) => setCourseID(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="term" className="block text-white">
                  เทอม
                </label>
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="term"
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                >
                  <option value="midterm">Midterm</option>
                  <option value="final">Final</option>
                </select>
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="courseName" className="block text-white">
                  ชื่อวิชา
                </label>
                <input
                  name="courseName"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="yearEducation" className="block text-white">
                  ปีการศึกษา
                </label>
                <input
                  name="yearEducation"
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full max-w-xs"
                  value={yearEducation}
                  onChange={(e) => setYearEducation(e.target.value)}
                />
              </div>
            </div>
            <div className="col-span-1">
              <div className="mb-4">
                <label htmlFor="semester" className="block text-white">
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
            </div>
          </div>
        </div>
      </div>

      <h3 className="mt-5">Upload & View Excel Sheets </h3>

      {/*form*/}
      <form className="form-group costom-from" onSubmit={handleFileSubmit}>
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
      </form>
      {/* View  data */}
      <div className="viewer">
        {excelData ? (
          <div className="table=responsive">
            <table className="table">
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
            </table>
          </div>
        ) : (
          <div>No File is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}
