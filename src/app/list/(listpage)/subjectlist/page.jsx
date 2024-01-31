"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Icon } from "@iconify/react";
import { getAllListSubject } from "../../../../function/listSubject";
import Drawer from "../../../../components/Drawer"

const Home = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [listItem, setListItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

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

  const formatDate = (dateCreated) => {
    const DDMMYYYY = dateCreated.split('T')[0].split('-').reverse().join('/');
    return DDMMYYYY;
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

  const renderTableRows = () => {
    const itemsToRender = searchTerm ? filteredItems : listItem;

    return itemsToRender.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.courseID}</td>
        <td>{item.courseName}</td>
        <td>{formatDate(item.dateCreated)}</td>
        <td width="150" className="text-center">
          <button className="btn btn-outline btn-success">
            <Icon icon="material-symbols:download" width="1.5em" height="1.5em" />
          </button>
        </td>
        <td width="150" className="text-center">
          <button className="btn btn-outline btn-error">
            <Icon icon="material-symbols:delete" width="1.5em" height="1.5em" />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => handleSearchNormal(e.target.value)}
      />

      <Drawer />

      <div className="overflow-x-auto max-h-screen" style={{ zIndex: 0 }}>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>รหัสวิชา</th>
              <th>วิชา</th>
              <th>แก้ไขเมื่อ</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
