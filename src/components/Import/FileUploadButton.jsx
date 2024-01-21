import React from "react";

export default function FileUploadButton({ handleFileSubmit, saveExcel }) {
  return (
    <div className="flex md:flex-col flex-row items-center justify-center gap-2 h-full">
      <button
        className="btn btn-active bg-blue-400 w-[120px] max-x-lg text-white"
        onClick={handleFileSubmit}
      >
        อัปโหลดไฟล์
      </button>
      <button
        className="btn btn-active bg-green-600 text-white w-[120px] max-x-lg"
        onClick={saveExcel}
      >
        บันทึก
      </button>
    </div>
  );
}
