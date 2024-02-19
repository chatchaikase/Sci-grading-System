"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const path = process.env.LocalhostDOTNET;

export const GetDataDashboard = async () => {
  const api = `${path}/api/Home/GetDataDashboard`;
  try {
    const dashboardData = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    if (!dashboardData) {
      throw new Error("Cannot fetch data");
    }
    return dashboardData.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const GetCourseNameList = async () => {
  const api = `${path}/api/Home/GetCourseNameList`;

  try {
    const CourseName = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
      },
    });
    if (!CourseName) {
      throw new Error("Cannot fetch data");
    }
    return CourseName.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};