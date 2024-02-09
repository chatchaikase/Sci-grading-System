import Link from "next/link";
import React from "react";
import { checkUserInDB } from "../../../../function/admin";
import FormEditUser from "../../../../components/Admin/form/FormEditUser";

export default async function EditUserPage({params}) {
  const {id} = params;
  const user = await checkUserInDB(id)

  return (
    <div className="bg-gray-100 p-[20px] rounded-lg mt-5 shadow overflow-auto">
      <span className="text-2xl font-semibold text-primary">
        เเก้ไขผู้ใช้งาน
      </span>
      <div className="flex flex-col items-center h-screen">
        <FormEditUser params={id} user={user} />
      </div>
    </div>
  );
}
