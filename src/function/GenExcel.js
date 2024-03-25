"use client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const GenExcel = async (listItem,listGrade, id) => {
  const exportModel = {
    students: listItem,
    grade: listGrade,
    id: id,
  };
  try {
    const response = await axios.post(`https://final-project-backend20240325201927.azurewebsites.net/api/List/GenerateExcel`,
      exportModel,
      {
        responseType: 'arraybuffer',   
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
      });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};

export const GenStudentDeatailExcel = async(listItem,listSumGrade,id) => {  
  const ExportStudentDetailModel = {
    studentsDetail: listItem,
    grade: listSumGrade,
    id: id,
  };
  try {
    const response = await axios.post(`https://final-project-backend20240325201927.azurewebsites.net/api/List/GenerateStudentDetailExcel`,
    ExportStudentDetailModel,
      {
        responseType: 'arraybuffer',   
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
      });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
}

export const GenExcelHome = async (itemList) => {
  console.log(itemList)
  try {
    const response = await axios.post(`https://final-project-backend20240325201927.azurewebsites.net/api/Home/GenerateHomeExcel`,
    itemList,
      {
        responseType: 'arraybuffer',   
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
          },
      });
    return response.data;
  } catch (error) {
    throw new Error(`Error: ${error.message}`);
  }
};