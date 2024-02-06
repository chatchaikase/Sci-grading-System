"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Icon } from "@iconify/react";
import {
  deleteImportList,
  getAllListSubject,
} from "../../../../function/listSubject";
import { toast } from "react-toastify";
import ModalImportListDelete from "../../../../components/Modal/ModalImportListDelete.jsx";
import Drawer from "../../../../components/Drawer"
import Pagination from "../../../../components/Import/importlist/Pagination";
import Link from "next/link";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [listItem, setListItem] = useState([]);
  const [deleteHeaderNumber, setDeleteHeaderNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      const itemList = await getAllListSubject();
      setListItem(itemList);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsPerPage = 15;

  const totalPages = listItem ? Math.ceil(listItem.length / itemsPerPage) : 0;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = listItem ? listItem.slice(startIndex, endIndex) : [];

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  const handleSearchFilter = async (value) => {
    console.log(value);
    await setListItem(value);
  };

   
  const handleSearchNormal = (value) => {
    setSearchTerm(value);

    const filtered = listItem.filter((item) => {
      // You can customize the condition based on your requirements
      return (
        item.courseName.toLowerCase().includes(value.toLowerCase()) ||
        item.courseID.toLowerCase().includes(value.toLowerCase())
      );
    });
    setFilteredItems(filtered);
  };

  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split('T')[0].split('-').reverse().join('/');
    return DDMMYYYY;
  }

  const renderTableRows = () => {
    const itemsToRender = searchTerm ? filteredItems : currentItems;

    return itemsToRender.map((item, index) => (
      <tr key={index}>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
          <a className="font-bold text-blue-500">{index + 1}</a>
        </td>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%" >
          <Link href={"/"}><p className="text-blue-400 cursor-pointer hover:scale-105 hover:text-blue-600">{item.importHeaderNumber}</p></Link>
        </td>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
          {item.courseID}
        </td>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="22%">
          {item.courseName}
        </td>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap" width="20%">
          {formatDate(item.dateCreated)}
        </td>
        <td className="text-center p-3 text-lg text-gray-700 whitespace-nowrap">
          <button
            className="btn px-4 py-2 bg-red-500 text-white"
            onClick={() =>
              deleteImportListClickHandler(item.importHeaderNumber)
            }
          >
            ลบ
          </button>
          <ModalImportListDelete
            deleteHeaderNumber={deleteHeaderNumber}
            handleDeleteImportList={handleDeleteImportList}
          />
        </td>
      </tr>
    ));
  };

  const handleDeleteImportList = async (headerNumber) => {
    try {
      const res = await deleteImportList(headerNumber);
      if (res == 200) {
        toast.success("ลบรายงานเรียบร้อย");
        fetchData();
        setDeleteHeaderNumber("");
      } else {
        toast.error("ไม่สามารถลบรายงานนี้ได้");
      }
    } catch (error) {
      console.log(error);
      toast.error("เกิดข้อผิดพลาดเกิดขึ้น");
    }
  };

  const deleteImportListClickHandler = async (headerNumber) => {
    setDeleteHeaderNumber(headerNumber);
    document.getElementById("warningDeleteUser").showModal();
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => handleSearchNormal(e.target.value)}
        className="input input-bordered rounded-lg pr-10 py-2 w-full max-w-sm"
      />
      <Drawer onSearch={handleSearchFilter} setLoading={setLoading}/>
      <div className="overflow-x-auto mt-5 max-h-screen bg-gray-100 rounded-lg shadow" style={{ zIndex: 0 }}>
        <table className="w-full">
          {/* head */}
          <thead className="bg-gray-50 border-b-2 border-gray-200">
            <tr>
              <th className="text-center w-10 p-3 text-lg font-semibold tracking-wide">
                No.
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                หมายเลขอัปโหลด
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                รหัสวิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                วิชา
              </th>
              <th className="text-center p-3 text-lg font-semibold tracking-wide">
                วันที่อัปโหลด (วัน/เดือน/ปี)
              </th>
              <th className="text-center w-15 p-3 text-lg font-semibold tracking-wide flex justify-center items-center">
                <Icon
                  icon="fluent:options-24-regular"
                  className="text-orange-500 text-xl"
                />
              </th>
            </tr>
          </thead>
          {loading == false ? (
            <tbody className="divide-y divide-gray-100 bg-white">
              {/* row 1 */}
              {renderTableRows()}
            </tbody>
          ) : (
            <tbody>
              <tr>
                  <td colSpan={6} className="items-center justify-center text-center ml-3">
                    <div className="flex flex-col gap-4 w-full my-8 mx-10">
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                      <div className="skeleton h-4 w-full"></div>
                    </div>
                  </td>
              </tr>
            </tbody>
          )}     
        </table>
        {searchTerm == "" ? (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
          />
        ) : (
          <></>
        )
        }
      </div>
    </div>    
  );  
};
export default Home;
