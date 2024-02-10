"use client"

import React, { useState } from 'react';
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { getListSubjectByFilter, getAllListSubject } from "../../function/listSubject";

export default function Drawer({ onSearch,setLoading }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchDate, setSearchDate] = useState("");


  const handleDateChange = (e) => {
    setSearchDate(e.target.value);
  };


  const importHSearch = {
    importHeaderID: null,
    importHeaderNumber: '',
    courseID: '',
    courseName: searchTerm,
    semester: '',
    yearEducation: '',
    dateCreated: searchDate,
    dateUpdated: '',
  };

  const handleSearchClick = async () => {
    try {
      setLoading(true);
      const listItem = await getListSubjectByFilter(importHSearch);
      await onSearch(listItem);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
      document.getElementById('my-drawer-4').checked = false;
    }
  };
  

  const handleResetData = async () => {
    try {
      setLoading(true);
      const itemList = await getAllListSubject();
      await onSearch(itemList);
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
      document.getElementById('my-drawer-4').checked = false;
    }
  };

  return (
    <div className="drawer z-10 mt-2 drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-4"
          className="drawer-button btn btn-primary"
        >
          Filter Search +
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <div className="row">
            <div className="col-sm-4">
              <div className="col-sm-6">
                <label>Select Date:</label>
                <div className='col-sm-6'>
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={searchDate}
                    onChange={handleDateChange}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-4">
              <label>Search by course name: </label>
              <div className="col-sm-6">
                <input
                  type="text"
                  placeholder="Search by name"
                  className="input input-bordered w-full max-w-xs"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <button
                className="btn btn-success mt-2"
                onClick={handleSearchClick}
              >
                Search
              </button>
              
              <button
              className="btn btn-warning mt-2 ml-2"
              onClick={handleResetData}
              >
                Reset
              </button>
            </div>
          </div>
        </ul>
      </div>
    </div>
  );
}