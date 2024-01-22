"use server";
import React from "react";
import ImportListTable from "../../../components/Import/ImportListTable";
import Link from "next/link";

export default async function ImportListPage() {
  return (
    <div className="overflow-auto rounded-lg shadow hidden md:block">
      <div className="px-4 pt-2 flex items-center justify-between">
        <p className="text-[30px]">รายการอัปโหลดล่าสุด</p>
        <Link href={"/import/importmaintain"}>
          <button className="btn btn-success text-white">อัปโหลด</button>
        </Link>
      </div>
      <ImportListTable />
    </div>
  );
}
