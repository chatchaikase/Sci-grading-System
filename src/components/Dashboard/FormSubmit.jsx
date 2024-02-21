"use client";
import React, { useEffect, useState } from "react";
import CustomSelect from "../../components/Select.jsx";
import DateCalrendar from "../../components/DateCalrendar";
import { usePathname, useRouter, useSearchParams } from "next/navigation.js";
import { useDebouncedCallback } from "use-debounce";
import {Button} from "@nextui-org/react";

export default function FormSubmit({ data, courseName }) {
    const [searchCourseID, setsearchCourseID] = useState("");
    const [searchCourseName, setsearchCourseName] = useState("");
    const [searchDatePicker, setsearchDatePicker] = useState("");

    const serchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const handleFormSubmit = (formData) => {
        setIsLoading(true);

        // Simulate an asynchronous operation with a timeout
        setTimeout(() => {
            // Hide loading spinner after the timeout
            setIsLoading(false);
        }, 2000); 

        setsearchCourseID("");
        setsearchCourseName("");
        setsearchDatePicker("");
        const { courseID, courseName, DatePicker } = Object.fromEntries(formData);
        setsearchCourseID(courseID);
        setsearchCourseName(courseName);
        setsearchDatePicker(DatePicker);
    };
    

    useEffect(() => {
        handleSearch();
    }, [searchCourseID, searchCourseName, searchDatePicker]);

    const handleSearch = useDebouncedCallback(() => {
        const params = new URLSearchParams(serchParams);

        if (searchCourseID) {
            params.set("CourseID", searchCourseID);
        } else {
            params.delete("CourseID");
        }

        if (searchDatePicker) {
            params.set("DateRange", searchDatePicker);
        } else {
            params.delete("DateRange");
        }

        if (searchCourseName) {
            params.set("CourseName", searchCourseName);
        } else {
            params.delete("CourseName");
        }
        replace(`${pathname}?${params}`);
    }, 400);

    return (
        <div className="border-dashed p-3 border h-auto w-full border-zinc-500 rounded-lg">
            <form action={handleFormSubmit}>
                <div className="flex flex-col gap-2">
                    <div className="xl:flex xl:gap-5 flex-row">
                        <div className="flex items-center mb-2 gap-4">
                            <label
                                htmlFor="courseName"
                                className="text-black text-lg flex-shrink-0"
                            >
                                ชื่อวิชา
                            </label>
                            <CustomSelect data={courseName} />
                        </div>
                        <div className="flex items-center mb-2 gap-4">
                            <button
                                className="btn btn-primary w-full text-white px-4 py-2 rounded-lg xl:w-32 xl:max-w-md"
                                type="submit"
                                disabled={isLoading} // Disable the button while loading
                            >
                                {isLoading ? (
                                    <>
                                        <span className="loading loading-spinner bg-black"></span>
                                        <p className="text-black">loading</p>
                                    </>
                                ) : (
                                    'Search'
                                )}
                            </button>
                            {/* <button
                                type="submit"
                                className="btn btn-circle w-full text-white px-4 py-2 rounded-lg xl:w-32 xl:max-w-md"
                            >
                                Submit
                            </button> */}
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

{
    /* <form action={handleFormSubmit}>
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
                  
              </form> */
}