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
    //Submit
    const handleFileSubmit=(e)=>{
        e.preventDefault();
        if (excelfile!==null){
            const workbook = XLSX.read(excelfile,{type: 'buffer'})
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0,10));
        }
    }
  return (
    <div className="wrapper">

        <hs3>Upload & View Excel Sheets </hs3>

        {/*form*/}
        <form  className="form-group costom-from" onSubmit={handleFileSubmit}>
            <input type="File" className='form-control' required onChange={handleFile}/>
            <button type="Submit" className="btn btn-success btn-md">UPLOAD</button>
            {typeError&&(
                <div className='aleart aleart-danger' role='alerts'>{typeError}</div>
            )}
        </form>

        {/* View  data */}
        <div className="viewer">
            {excelData?(
                <div className='table=responsive'>
                    <table className='table'>
                        <thead>
                            <tr>
                                {Object.keys(excelData[0]).map((key)=>(
                                    <th key={key}>{key}</th>
                                ))}
                            </tr>
                        </thead>

                        <tbody>
                            {excelData.map((individualExcelData, index)=>(
                                <tr key={index}>
                                    {Object.keys(individualExcelData).map((key)=>(
                                        <td key={key}>{individualExcelData[key]}</td>
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
