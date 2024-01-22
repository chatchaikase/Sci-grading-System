"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Icon } from "@iconify/react";
import { getAllListSubject } from "../../../../function/listSubject";

const items = [
  { id: 1, name: "Item 1", date: "2022-01-01" },
  { id: 2, name: "Item 2", date: "2022-02-01" },
  { id: 3, name: "Item 1", date: "2022-01-01" },
  { id: 4, name: "Item 2", date: "2022-02-01" },
  { id: 5, name: "Item 1", date: "2022-01-01" },
  { id: 6, name: "Item 2", date: "2022-02-01" },
  // Add more items as needed
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectdate, setDate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [listItem, setListItem] = useState([]);

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
  useEffect(() => {
    filterItemsNormal();
  }, []);

  const handleSelect = (date) => {
    setSelectedDate(date);
    // Close the date picker programmatically (if needed)
    document.activeElement.blur();
  };

  const handleSearchClick = () => {
    if (selectedOption === "advance") {
      filterItemsAdvance(searchTerm, selectdate);
    } else {
      filterItemsNormal();
    }
  };

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const filterItemsAdvance = (term, date) => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) &&
        (!date ||
          new Date(item.date).toDateString() === new Date(date).toDateString())
    );
    setFilteredItems(filtered);
  };

  const filterItemsNormal = () => {
    const filtered = items.filter((item) => {
      const nameLower = searchTerm.toLowerCase();
      return item.name.toLowerCase().includes(nameLower);
    });
    setFilteredItems(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="drawer z-10 drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-4"
            className="drawer-button btn btn-primary"
          >
            Open drawer
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
                  <input
                    type="date"
                    className="input input-bordered w-full max-w-xs"
                    value={selectdate}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="YYYY-MM-DD"
                  />
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
              <div className="col-sm-4">
                <label>Select an option: </label>
                <div className="col-sm-6">
                  <select
                    value={selectedOption}
                    onChange={handleDropdownChange}
                    className="input input-bordered w-full max-w-xs"
                  >
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-primary mt-2"
                  onClick={handleSearchClick}
                >
                  Search
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>

      <div className="overflow-x-auto max-h-screen" style={{ zIndex: 0 }}>
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>รหัสวิชา</th>
              <th>วิชา</th>
              <th>แก้ไขเมื่อ</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {listItem.map((item, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{item.courseID}</td>
                <td>{item.courseName}</td>
                {/* <td>{item.date}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
