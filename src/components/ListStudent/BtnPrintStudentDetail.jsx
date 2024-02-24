"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";

export default function BtnPrintStudentDetail({
    id,
    listItem
}) {
  const handleStudentDetailCSV = () => {
    const customHeader = ['no',"id","name", 'courseId', 'courseName', 'semester','yearEducation','grade'];
  
    const csvData =
      "\ufeff" +
      Papa.unparse({
        fields: customHeader,
        data: listItem.map((item, index) => [
        index+1 ?? 0 ,
        item.id ?? 0 ,
        item.name ?? "",
        item.courseID ?? "",
        item.courseName ?? "",
        item.semester ?? "",
        item.yearEducation ?? "",
        item.grade ?? "",
        ]),
      }, {
        quotes: true,
        delimiter: ",",
        header: true,
        encoding: "UTF-8",
      });
  
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `รายระเอียดของนิสิต ${id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
    onClick={handleStudentDetailCSV}
    className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
  >
    <Icon
      icon="material-symbols:print-outline"
      className="text-white text-lg"
    />
    <>พิมพ์รายระเอียดของนิสิต</>
  </button>
  );
}
