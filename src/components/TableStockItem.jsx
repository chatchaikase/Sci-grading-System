"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Icon } from '@iconify/react';

const TableStockItem = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [stockItems, setStockItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/stock/list");
      const { items } = res.data;
      return items;
    } catch (error) {
      console.log("ไม่สามารถเรียกข้อมูลจาก database ได้", error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        setStockItems(await getData());
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredStockItems = stockItems.filter(
    (item) =>
      item.itemname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemcode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredStockItems.length / itemsPerPage);

  // Get the current page's range of items
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredStockItems.slice(startIndex, endIndex);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div>
      <h1 className="text-xl mb-2">StockItem List</h1>
      {isLoading ? (
        <div className="flex flex-col gap-4 w-full">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div>
          <div className="overflow-auto rounded-lg shadow hidden md:block">
            <div className="flex-col">
              <div className="flex-1">
                <div className="flex items-center justify-end">
                <Icon icon="material-symbols:search" width={25} height={25}/>
                <input
                  type="text"
                  placeholder="Search by Item Name or Item Code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered rounded-lg m-3 w-full max-w-sm "
                />
                </div>
               
              </div>
              <div className="flex-1">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="text-center w-10 p-3 text-sm font-semibold tracking-wide">
                        No.
                      </th>
                      <th className="text-left p-3 text-sm font-semibold tracking-wide">
                        Item Name
                      </th>
                      <th className="text-left w-15 p-3 text-sm font-semibold tracking-wide">
                        Item Code
                      </th>
                      <th className="text-center tw-15 p-3 text-sm font-semibold tracking-wide">
                        Quantity
                      </th>
                      <th className="text-center w-15 p-3 text-sm font-semibold tracking-wide">
                        Price
                      </th>
                      <th className="text-center w-15 p-3 text-sm font-semibold tracking-wide">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {currentItems.map((item, index) => (
                      <tr className="bg-white" key={item.itemid}>
                        <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                          <a className="font-bold text-blue-500">{index + 1}</a>
                        </td>
                        <td className="text-left p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.itemname}
                        </td>
                        <td className="text-left p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.itemcode}
                        </td>
                        <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.quantity}
                        </td>
                        <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                          {item.price}
                        </td>
                        <td className="text-center p-3 text-sm text-gray-700 whitespace-nowrap">
                          <span className="p-1.5 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                            {item.status === 1 ? "In stock" : "Out of stock"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mr-3">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`my-2 px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:hidden">
             <input
                  type="text"
                  placeholder="Search by Item Name or Item Code"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input input-bordered rounded-lg m-3 w-full max-w-sm "
            />
            <div className="flex justify-start mr-3 gap-1">
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`my-2 px-4 py-2 rounded-md ${
                    currentPage === index + 1
                      ? "bg-primary text-white"
                      : ""
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            {currentItems.map((item, index) => (
              <div key={item.itemid} className="card w-70 bg-white shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Item Name : {item.itemname}</h2>
                  <p className="text-sm text-gray-700">
                    Item Code: {item.itemcode}
                  </p>
                  <p className="text-sm text-gray-700">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-700">Price: {item.price}</p>
                  <div className="card-actions">
                    <span className="px-10 py-2 text-xs font-medium tracking-wider uppercase text-black bg-green-600 rounded-lg bg-opacity-50">
                      {item.status === 1 ? "In stock" : "Out of stock"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TableStockItem;
