'use client'
import React from 'react'
import CustomSelect from '../../components/Select.jsx'
import DateCalrendar from '../../components/DateCalrendar'

export default function FormSubmit({ data, courseName }) {
    const handleFormSubmit = (formData) => {
        const { courseID, courseDropdown, DatePicker } = Object.fromEntries(formData);
        // Perform your form submission logic here
        // You can access the form data using e.target.elements
        // const formData = new FormData(e.target);
        console.log("Form Data:", courseID, courseDropdown, DatePicker);
    };

    return (
        <div className="border-dashed p-3 border h-auto w-full border-zinc-500 rounded-lg">
            <form action={handleFormSubmit}>
                <div className='flex flex-col gap-2'>
                    <div className='xl:flex xl:gap-5 flex-row'>
                        <div className="flex items-center mb-2 xl:w-[300px]">
                            <label htmlFor="courseID" className="text-black text-lg flex-shrink-0">
                                รหัสวิชา
                            </label>
                            <input
                                name="courseID"
                                type="text"
                                placeholder="กรุณากรอกรหัสวิชา"
                                className="ml-2 input input-bordered w-full" 
                            />
                        </div>
                        <div className="flex items-center mb-2 gap-4">
                            <label
                                htmlFor="courseName"
                                className="text-black text-lg flex-shrink-0"
                            >
                                ชื่อวิชา
                            </label>
                            <CustomSelect data={courseName} />
                        </div>
                        <div className='flex items-center mb-2 gap-4'>
                            <label 
                                htmlFor="courseID"
                                className="text-black text-lg flex-shrink-0">
                                ช่วง
                            </label>
                            <DateCalrendar />
                        </div>
                    </div>
                    <div className='xl:flex justify-end items-center'>
                        <button type="submit" className="bg-blue-500 w-full text-white px-4 py-2 rounded-lg xl:w-32 xl:max-w-md">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

{/* <form action={handleFormSubmit}>
                <div className="flex items-center justify-between gap-5">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-4">
                            <label htmlFor="courseID" className="text-black text-lg flex-shrink-0">
                                รหัสวิชา
                            </label>
                            <input
                                name="courseID"
                                type="text"
                                placeholder="กรุณากรอกรหัสวิชา"
                                className="ml-2 input input-bordered w-full max-w-xs"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <label
                                htmlFor="courseName"
                                className="text-black text-lg flex-shrink-0"
                            >
                                ชื่อวิชา
                            </label>
                            <Select data={courseName} />
                        </div>
                    </div>
                    <div className="flex items-center mb-4">
                        <DateCalrendar />
                    </div>
                    <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
                
            </form> */}