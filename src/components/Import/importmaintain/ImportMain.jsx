"use client";
import { Fuzzy_Bubbles } from "next/font/google";
import * as XLSX from "xlsx";
import React, { use, useEffect, useState } from "react";
import { AddExcel } from "../../../function/import";
import { toast } from "react-toastify";
import ImportInputFields from "./ImportInputFields";
import FileUploadSection from "./FileUploadSection"
import ExcelDataViewer from "./ExcelDataViewer"
import FileUploadButton from "./FileUploadButton"
import { useRouter } from "next/navigation";

export default function ImportMain({ session }) {

  // Redirect to another page
  const router = useRouter();

  // HeaderForm
  const currentYear = new Date().getFullYear();
  const userId = session;
  const [courseID, setCourseID] = useState("");
  const [term, setTerm] = useState("midterm");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("summer");
  const [yearEducation, setYearEducation] = useState("");
  const [yearEducationSelect, setYearEducationSelect] = useState(
    (new Date().getFullYear() + 542).toString()
  );
  const [checkYearEducationSelect, setCheckYearEducationSelect] =
    useState(false);

  // Onchange
  const [excelfile, setExcelfile] = useState(null);
  const [typeError, setTypeError] = useState(null);

  // Upload
  const [uploadExcel, setUploadExcel] = useState(false);

  // ExcelSubmit
  const [excelData, setExcelData] = useState(null);
  const [dataExcelFile, setDataExcelFile] = useState(null);

  // Drag file Excel
  const [dragging, setDragging] = useState(false);
  const [excelName, setExcelName] = useState("");

  const expectedColumnPattern = ["NO", "ID", "NAME","GRADE"];

  const validateColumnNames = (worksheet) => {
    const range = XLSX.utils.decode_range(worksheet["!ref"]);
    const columnNames = [];
  
    for (let C = range.s.c; C <= range.e.c; ++C) {
      const cellAddress = { r: range.s.r, c: C }; // Assuming the column names are in the first row
      const cellRef = XLSX.utils.encode_cell(cellAddress);
      const columnName = worksheet[cellRef]?.v;
      columnNames.push(columnName);
    }
  
    const uppercaseColumnNames = columnNames.map((name) => name ? name.toUpperCase() : null);
  
    return expectedColumnPattern.every(
      (expectedColumnName, index) => uppercaseColumnNames[index] === expectedColumnName.toUpperCase()
    );
  };  

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    setExcelName(selectedFile.name);
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

  const handleFileSubmit = (e) => {
    e.preventDefault();

    if (excelfile !== null) {
      setUploadExcel(true);
    }

    if (excelfile === null) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }
    // else if(!excelfile){
    //   toast.error("กรุณาอัปโหลดไฟล์ Excel");
    //   return;
    // }

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
      // const formattedData = data.map((rowData) => ({
      //   NO: rowData["NO"],
      //   ID: rowData["ID"],
      //   NAME: rowData["NAME"],
      //   GRADE: rowData["GRADE"]
      // }));

      const formattedData = data.map((rowData) => {
        const formattedRow = {};
        for (const key in rowData) {
          const formattedKey = key.toUpperCase(); 
          formattedRow[formattedKey] = rowData[key];
        }
        return formattedRow;
      });

      setDataExcelFile(formattedData);
      setExcelData(formattedData);
    }
  };

  const saveExcel = async () => {
    if (!excelfile) {
      toast.error("กรุณาอัปโหลดไฟล์ Excel");
      return;
    }

    if (checkYearEducationSelect) {
      if (!courseID.trim() || !courseName.trim() || !yearEducation.trim()) {
        toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
        return;
      } else if (!checkYearEducationSelect) {
        if (!courseID.trim() || !courseName.trim()) {
          toast.error("กรุณากรอกข้อมูลให้ครบถ้วน");
          return;
        }
      }
    }

    let formData = {
      courseID: courseID,
      term: term,
      courseName: courseName,
      semester: semester,
      yearEducation: checkYearEducationSelect ? yearEducation : yearEducationSelect,
      createByUserId: session,
    };
    
    if (dataExcelFile && dataExcelFile.length > 0) {
      const formattedExcelData = dataExcelFile.map((item, index) => ({
        no: item.NO,
        id: item.ID,
        name: item.NAME,
        grade: item.GRADE,
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
          router.push('/import/importlist')

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
    <div className="px-9 py-5">
      <h1 className="text-[40px] mb-3">ข้อมูลรายวิชา</h1>
      <div className="w-full h-[300px] bg-[#2F3337] rounded-lg flex flex-col md:flex-row">
        <div className="w-full md:w-[80%] h-[300px] z-1 bg-[#03A96B] rounded-tl-lg rounded-bl-lg flex items-center justify-center">
          <div className="px-5 py-10">
          {/* เเถบ Header */}
          <ImportInputFields
              courseID={courseID}
              setCourseID={setCourseID}
              courseName={courseName}
              setCourseName={setCourseName}
              semester={semester}
              setSemester={setSemester}
              yearEducation={yearEducation}
              setYearEducation={setYearEducation}
              checkYearEducationSelect={checkYearEducationSelect}
              yearEducationSelect={yearEducationSelect}
              setYearEducationSelect={setYearEducationSelect}
              setCheckYearEducationSelect={setCheckYearEducationSelect}
            />
          </div>
        </div>
        <div className="w-full lg:w-[20%] mt-4 mb-2 md:mt-0">
         {/* เเถบปุ่มบันทึกไฟล์ Excel */}
          <FileUploadButton handleFileSubmit={handleFileSubmit} saveExcel={saveExcel}/>
        </div>
      </div>
       {/* เเถบอัปโหลดไฟล์ Excel */}
      <FileUploadSection
        handleFileSubmit={handleFileSubmit}
        handleFile={handleFile}
        excelName={excelName}
        setExcelName={setExcelName}
        uploadExcel={uploadExcel}
        excelfile={excelfile}
        setExcelfile={setExcelfile}
        typeError={typeError}
        setTypeError={setTypeError}
        dragging={dragging}
        setDragging={setDragging}
        setExcelData={setExcelData}
        setUploadExcel={setUploadExcel}
      />
      
      {/* ตารางเเสดงผลในไฟล์ Excel */}
      <div className="viewer">
        <ExcelDataViewer  excelData={excelData} />
      </div>
    </div>
  );
}
