import React from 'react'
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Drawer() {
  return (
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
                    // value={selectdate}
                    // onChange={(e) => setDate(e.target.value)}
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
                    // value={searchTerm}
                    // onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-4">
                <label>Select an option: </label>
                <div className="col-sm-6">
                  {/* <select
                    // value={selectedOption}
                    // onChange={handleDropdownChange}
                    className="input input-bordered w-full max-w-xs"
                  >
                    <option value="">Select an option</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                  </select> */}
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <button
                  className="btn btn-primary mt-2"
                  // onClick={handleSearchClick}
                >
                  Search
                </button>
              </div>
            </div>
          </ul>
        </div>
      </div>
  )
}
