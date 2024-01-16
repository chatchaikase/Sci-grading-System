"use client"
import { Fuzzy_Bubbles } from 'next/font/google'
import  * as  XLSX from 'xlsx';
import React, { useState } from 'react'

export default function ImportPage() {

    // Onchange
    const [excelfile, setExcelfile] = useState(null);   
    const [typeError, setTypeError] = useState(null);
    //Submit 
    const [excelData, setExcelData] = useState(null);
    //ChangeEvent
    const handleFile=(e)=>{
        let fileTypes = ['application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/csv'];
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile&&fileTypes.includes(selectedFile.type)){
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload=(e)=>{
                    setExcelfile(e.target.result);
                }
            }
            else{
                setTypeError("Please select only excel file");
                setExcelfile(null);
            }
        }
        else{
            console.log("Please Select your file");
        }
    }

    const formatDateWithTimeZone = (date) => {
        if (date instanceof Date) {
            const options = { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone };
            return date.toLocaleDateString(undefined, options);
        } else {
            return date; // Handle non-Date objects as needed
        }
    };

    const expectedColumnPattern = ['No.', 'id', 'name', 'date'];

    const validateColumnNames = (worksheet) => {
        const range = XLSX.utils.decode_range(worksheet['!ref']);
        const columnNames = [];

        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { r: range.s.r, c: C }; // Assuming the column names are in the first row
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            const columnName = worksheet[cellRef]?.v;
            columnNames.push(columnName);
        }

        return expectedColumnPattern.every((columnName, index) => columnNames[index] === columnName);
    };

    const handleFileSubmit = (e) => {
        e.preventDefault();
        if (excelfile !== null) {
            const workbook = XLSX.read(excelfile, { type: 'buffer', cellDates: true });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];

            // Validate column names
            if (!validateColumnNames(worksheet)) {
                console.error('Invalid column names in the Excel file.');
                // Handle the validation error (e.g., show a message to the user)
                return;
            }

            const data = XLSX.utils.sheet_to_json(worksheet, { raw: false, dateNF: 'mm/dd/yyyy' });

            // Map the data to include formatted dates and handle specific columns
            const formattedData = data.map((rowData) => ({
                No: rowData['No.'],
                id: rowData['id'],
                name: rowData['name'],
                date: formatDateWithTimeZone(new Date(rowData['date'])),
            }));
            console.log(formattedData);
            setExcelData(formattedData.slice(0, 10));
        }
    };

    return (
        <div className="wrapper">
            <h1>Information</h1>
            <div className="wrapper">
                <div className="artboard artboard-horizontal phone-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700">Name</label>
                                <input
                                    type="text"
                                    className="form-input mt-1 block w-full"
                                    name="name"
                                // value={formData.name}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="age" className="block text-gray-700">Age</label>
                                <input
                                    type="number"
                                    className="form-input mt-1 block w-full"
                                    name="age"
                                // value={formData.age}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="phone" className="block text-gray-700">Phone</label>
                                <input
                                    type="number"
                                    className="form-input mt-1 block w-full"
                                    name="phone"
                                // value={formData.phone}
                                // onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="col-span-1">
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    className="form-input mt-1 block w-full"
                                    name="email"
                                // value={formData.email}
                                // onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-gray-700">Address</label>
                                <input
                                    type="text"
                                    className="form-input mt-1 block w-full"
                                    name="address"
                                // value={formData.address}
                                // onChange={handleChange}
                                />
                            </div>
                            {/* <button type="submit" className="btn btn-primary">Submit</button> */}
                        </div>
                    </div>
                </div>
            </div>

            <hs3>Upload & View Excel Sheets </hs3>

            {/*form*/}
            <form className="form-group costom-from" onSubmit={handleFileSubmit}>
                <input type="File" className='form-control file-input file-input-bordered file-input-success max-w-xs"' required onChange={handleFile} />
                <button type="Submit" className="btn btn-success btn-md mt-5">UPLOAD</button>
                {typeError && (
                    <div className='aleart aleart-danger' role='alerts'>{typeError}</div>
                )}
            </form>

            {/* View  data */}
            <div className="viewer">
                {excelData ? (
                    <div className='table=responsive'>
                        <table className='table'>
                            <thead>
                                <tr>
                                    {Object.keys(excelData[0]).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody>
                                {excelData.map((individualExcelData, index) => (
                                    <tr key={index}>
                                        {Object.keys(individualExcelData).map((key) => (
                                            <td key={key}>
                                                {key.toLowerCase().includes('date') && individualExcelData[key] instanceof Date
                                                    ? formatDateWithTimeZone(individualExcelData[key])
                                                    : individualExcelData[key]}
                                            </td>
                                        ))}

                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                ) : (
                    <div>No File is uploaded yet!</div>
                    
                )}


            </div>

        </div>
  )
}
