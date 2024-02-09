"use client";
import React, { useState } from "react";
import { deleteUser } from "../../../function/admin";
import { toast } from "react-toastify";

export default function FormDeleteUser({ userId }) {
  
  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("คุณต้องการลบผู้ใช้งานคนนี้หรือไม่?");
    if (confirmation) {
      const result = await deleteUser({userId});
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("ลบผู้ใช้งานสำเร็จ");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleDeleteUser(e)}>
      <input type="hidden" name="userId" value={userId} />
      <button className="btn bg-red-500 text-white">ลบ</button>
    </form>
  );
}
