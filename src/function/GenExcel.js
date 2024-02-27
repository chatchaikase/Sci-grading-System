"use client";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GenExcel = async (listItem,listGrade, id) => {
  console.log(listGrade);
  const exportModel = {
    students: listItem,
    grade: listGrade,
    id: id,
  };
  try {
    const response = await axios.post(`http://localhost:5084/api/List/GenerateExcel`,
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
