"use client";
import React, { useState } from "react";
import ModalImportListDelete from "../../components/Modal/ModalImportListDelete";
import { deleteImportList } from "../../function/listSubject";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';

export default function FromDeleteListSubject({ importNo }) {
  
  const showCustomAlert = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `<div>
                You won't be able to remove 
                <span style="color: red; font-size: 16px; font-weight: bold;">
                  ${importNo}
                </span>
              </div>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });
    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteImportList(importNo);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the file.",
          icon: "error"
        });
      }
    }
  };

  return (
    <>
      <button className="btn bg-red-500 text-white" onClick={showCustomAlert}>
        ลบ
      </button>
    </>
  );
}
