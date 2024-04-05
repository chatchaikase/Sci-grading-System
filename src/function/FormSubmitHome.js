"use server";
import axios from "axios";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

const path = process.env.LocalhostDOTNET;

export const SearchByCourseName = async (isSelectName,userId) => {
  const api = `${path}/api/Home/FilterSerchByCourseName`;
  try {
    const courseNameFilter = await axios.get(api, {
      params: {
        isSelectName: isSelectName,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });
    if (!courseNameFilter) {
      throw new Error("Cannot fetch data");
    }
    return courseNameFilter.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const SearchFilterYear = async (idSelect, nameSelect,userId) => {
  const api = `${path}/api/Home/FilterSerchYear`;
  try {
    const courseNameFilter = await axios.get(api, {
      params: {
        idSelect: idSelect,
        nameSelect: nameSelect,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });

    if (!courseNameFilter) {
      throw new Error("Cannot fetch data");
    }
    return courseNameFilter.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};

export const SearchFilterSemester = async (value,idSelect,nameSelect,userId) => {
  const api = `${path}/api/Home/FilterSerchSemester`;
  try {
    const courseNameFilter = await axios.get(api, {
      params: {
        nameSelect: nameSelect,
        yearSelect: value,
        idSelect: idSelect,
      },
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store",
        "userId": userId.toString(),
      },
    });
    if (!courseNameFilter) {
      throw new Error("Cannot fetch data");
    }
    return courseNameFilter.data;
  } catch (error) {
    throw new Error("Error fetching data");
  }
};