import React from "react";

export default function Pageination() {
  return (
    <div className="flex justify-between px-5 py-2">
      {/* {[...Array(totalPages)].map((_, index) => (
        <button
          key={index + 1}
          onClick={() => handlePageChange(index + 1)}
          className={`my-2 px-4 py-2 rounded-md ${
            currentPage === index + 1 ? "bg-primary text-white" : ""
          }`}
        >
          {index + 1}
        </button>
      ))} */}
      <button className={`my-2 btn rounded-md bg-gray-400 text-white`}>
        ย้อนกลับ
      </button>
      <button className={`my-2 btn rounded-md bg-primary text-white`}>
        ถัดไป
      </button>
    </div>
  );
}
