'use client'
// pages/index.js

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const items = [
  { id: 1, name: 'Item 1', date: '2022-01-01' },
  { id: 2, name: 'Item 2', date: '2022-02-01' },
  // Add more items as needed
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredItems, setFilteredItems] = useState(items);

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    // Close the date picker programmatically (if needed)
    document.activeElement.blur();
  };

  const handleSearchClick = () => {
    filterItems(searchTerm, selectedDate);
  };

  const filterItems = (term, date) => {
    const filtered = items.filter(
      (item) =>
        item.name.toLowerCase().includes(term.toLowerCase()) &&
        (!date || new Date(item.date).toDateString() === date.toDateString())
    );
    setFilteredItems(filtered);
  };

  const [startDate, setStartDate] = useState(new Date());

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-4" className="drawer-button btn btn-primary">Open drawer</label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <label>
              Select a date:
              <DatePicker selected={selectedDate} onChange={handleDateChange} closeOnSelect={true} />
            </label>
            <label><input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
            /></label>
            <label><button className="btn btn-primary" onClick={handleSearchClick}>Search</button></label>
          </ul>
        </div>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
