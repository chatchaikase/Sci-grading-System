"use client";
import React, { useState } from "react";
import ModalImportListDelete from "../../components/Modal/ModalImportListDelete";
import { deleteImportList } from "../../function/listSubject";
import { toast } from "react-toastify";

export default function FromDeleteListSubject({ importNo }) {
  // const [deleteHeaderNumber, setDeleteHeaderNumber] = useState("");

  // const handleDeleteImportList = async (headerNumber) => {
  //     try {
  //       const res = await deleteImportList(headerNumber);
  //       if (res?.error) {
  //         toast.error("ไม่สามารถลบรายงานนี้ได้");
  //       } else {
  //         toast.success("ลบรายงานเรียบร้อย");
  //         setDeleteHeaderNumber("");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       toast.error("เกิดข้อผิดพลาดเกิดขึ้น");
  //     }
  //   };

  //   const deleteImportListClickHandler = async (headerNumber) => {
  //     console.log(headerNumber);
  //     setDeleteHeaderNumber(headerNumber);
  //     document.getElementById("warningDeleteUser").showModal();
  //   };

  // return (
  //     <>
  //         <button
  //             className="btn px-4 py-2 bg-red-500 text-white"
  //             onClick={() =>
  //                 deleteImportListClickHandler(importNo)
  //             }
  //         >
  //             ลบ
  //         </button>
  //         <ModalImportListDelete
  //             deleteHeaderNumber={deleteHeaderNumber}
  //             handleDeleteImportList={handleDeleteImportList}
  //         />
  //     </>

  const handleDeleteImport = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm("คุณต้องการลบรายงานนี้หรือไม่?");
    if (confirmation) {
      const result = await deleteImportList(importNo);
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("ลบผู้ใช้งานสำเร็จ");
      }
    }
  };

  return (
    <form onSubmit={(e) => handleDeleteImport(e)}>
      <input type="hidden" name="importNo" value={importNo} />
      <button className="btn bg-red-500 text-white">ลบ</button>
    </form>
  );
}
