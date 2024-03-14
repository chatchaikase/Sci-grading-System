"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const path = process.env.LocalhostDOTNET;

export const GetDataDashboard = async (query_CourseName,query_CourseID,query_YearEducation,query_Semester,userId) => {
  const queryParams = new URLSearchParams();
  if (query_CourseName) queryParams.append('CourseName', query_CourseName);
  if (query_CourseID) queryParams.append('CourseID', query_CourseID);
  if (query_YearEducation) queryParams.append('YearEducation', query_YearEducation);
  if (query_Semester) queryParams.append('Semester', query_Semester);

  const api = `${path}/api/Home/GetDataDashboard?${queryParams.toString()}`;
  try {
    const dashboardData = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
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

export const GetCourseNameList = async (userId) => {
  const api = `${path}/api/Home/GetCourseNameList`;

  try {
    const CourseName = await axios.get(api, {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
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