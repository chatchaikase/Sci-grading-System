"use client";
import { Icon } from "@iconify/react";
import Papa from "papaparse";
import React from "react";

export default function BtnPrintSubject({
    id,
    listItem
}) {
  const handleSubjectCSV = () => {
    const csvData =
      "\ufeff" +
      Papa.unparse(listItem, {
        quotes: true,
        delimiter: ",",
        header: true,
        encoding: "UTF-8",
      });

    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ข้อมูลรายวิชา ${id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleSubjectCSV}
      className="btn bg-blue-500 text-white w-[220px] max-x-lg mr-5"
    >
      <Icon
        icon="material-symbols:print-outline"
        className="text-white text-lg"
      />
      <>พิมพ์ข้อมูลรายวิชา</>
    </button>
  );
}
