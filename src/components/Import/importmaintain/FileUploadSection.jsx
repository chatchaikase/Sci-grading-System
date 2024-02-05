import { Icon } from "@iconify/react";
import React from "react";

export default function FileUploadSection({
  handleFileSubmit,
  handleFile,
  excelName,
  setExcelName,
  uploadExcel,
  typeError,
  setTypeError,
  dragging,
  setDragging,
  excelfile,
  setExcelfile,
  setExcelData,
  setUploadExcel,
  setDataExcelFile,
  loading,
}) {
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

  const handleResetFile = () => {
    setExcelfile(null);
    setExcelName("");
    setExcelData(null);
    setUploadExcel(false);
    setDataExcelFile(null);
  };

  return (
    <div
      className={`w-full h-40 border-dashed border-2 border-gray-300 flex items-center justify-center ${
        dragging ? "bg-gray-100" : ""
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-center gap-2">
        <p className="text-gray-600">
          {/* {excelName === "" && !uploadExcel && (
            <>วางไฟล์ เพื่อ อัปโหลดที่นี่ หรือ</>
          )} */}
          {/* {excelName && !uploadExcel && (
            <>ไฟล์ชื่อ {excelName} กรุณากดปุ่มอัปโหลดไฟล์</>
          )}
          {uploadExcel && <>ตรวจเช็คข้อมูลก่อนบันทึก</>} */}
        </p>
        {/*form*/}
        {loading ? (
          <div className="items-center justify-center flex gap-2 text-slate-600 ">
            <p className="text-lg font-semibold">กำลังตรวจสอบข้อมูล</p>
            <span className="loading loading-dots loading-md"></span>
          </div>
        ) : (
          <>
            {excelName ? (
              <>
                {excelName && uploadExcel ? (
                  <p className="text-gray-500">ตรวจเช็คข้อมูลก่อนบันทึก</p>
                ) : excelName && !uploadExcel ? (
                  <p className="text-gray-500">
                    ไฟล์ {excelName} กรุณากดอัปโหลด
                  </p>
                ) : (
                  <></>
                )}

                <button className="btn bg-red-500" onClick={handleResetFile}>
                  <Icon
                    icon="solar:trash-bin-2-bold"
                    className="text-white text-lg"
                  />
                  <p className="text-white">ยกเลิกไฟล์</p>
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500">
                  วางไฟล์ เพื่อ อัปโหลดที่นี่ หรือ
                </p>
                <form
                  className="form-group costom-from"
                  onSubmit={handleFileSubmit}
                >
                  <input
                    type="File"
                    className='form-control file-input file-input-bordered file-input-success max-w-xs"'
                    required
                    onChange={handleFile}
                  />
                  {/* <button type="Submit" className="btn btn-primary btn-md mt-5">
              UPLOAD
            </button>
            {typeError && (
              <div className="alert alert-danger" role="alert">
                {typeError}
              </div>
            )} */}
                </form>
              </>
            )}
          </>
        )}
      </div>
      <div></div>
    </div>
  );
}
