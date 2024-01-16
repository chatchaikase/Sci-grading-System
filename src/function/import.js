"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";

const path = process.env.LocalhostDOTNET;

export const AddExcel = async(payload) => {
  // const excelData = payload.excelData;
  // const importHeader = payload.importHeader;

  console.log(payload)
  

    try {
        const newExcel = await axios.post(
          `${path}/api/Import`,
           {
            ExcelData: payload.excelData,
            ImportHeader: payload.importHeader,
           },
           {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          }
        );
        revalidatePath("/import");
        return newExcel.data;
    } catch (error) {
        console.error("Error adding user:", error);
        return { error: error.response?.data?.error || "พบข้อผิดพลาดบางอย่าง" };
    }
}