"use client"
import React, { useState } from 'react'
import { registerLocale, setDefaultLocale } from "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Icon } from '@iconify/react';
import th from 'date-fns/locale/th';
registerLocale('th', th)

export default function DateCalendar() {
  const currentYear = new Date().getFullYear() + 543;
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const [startDate, setStartDate] = useState(new Date(currentYear, currentMonth, currentDate));
  const [endDate, setEndDate] = useState(new Date(currentYear, currentMonth, currentDate + 15));

  const onDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <DatePicker
      selectsRange={true}
      onChange={onDateChange}
      dateFormat="dd MMM yyyy"
      startDate={startDate}
      endDate={endDate}
      locale={th}
      customInput={<CustomInput />}
    />
  );
}

function CustomInput({ value, onClick }) {
  return (
    <div className="join">
      <input
        type="text"
        className="join-item input input-bordered w-[230px] ml-5 xl:ml-1 lg:ml-5 md:ml-5 sm:ml-5"
        value={value}
        onClick={onClick}
        name='DatePicker'
        readOnly
      />
      <div className="join-item input input-bordered inline-flex items-center align-middle">
        <Icon icon="mdi:calendar" width={35} height={35} />
      </div>
    </div>
  );
}
