import Link from "next/link";
import React from "react";
import FormAddUser from "../../../../components/Admin/form/FormAddUser"
export default function AdminPage(formData) {

  return (
    <div className="bg-gray-100 p-[20px] rounded-lg mt-5 shadow overflow-auto">
        <span className="text-2xl font-semibold text-green-600">เพิ่มผู้ใช้งาน</span>
        <FormAddUser />
    </div>
  );
}
