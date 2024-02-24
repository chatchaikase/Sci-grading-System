"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GetHomePageList = async (query_DateRange,userId) => {
    const queryParams = new URLSearchParams();
    if (query_DateRange) queryParams.append('DateRange', query_DateRange);
  
    const api = `${path}/api/Home/GetDataTableByUserId`;
  
    try {
      const HeaderHomePage = await axios.get(
        api,
        {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store",
            "userId": userId.toString(),
          },
        }
      );
      if (!HeaderHomePage) {
        throw new Error("Cannot fetch data");
      }
      return HeaderHomePage.data;
    } catch (error) {
      throw new Error("Error to fetch data");
    }
  };