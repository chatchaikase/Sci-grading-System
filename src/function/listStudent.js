"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const path = process.env.LocalhostDOTNET;

export const GetStudent = async (userId) => {
  try {
    const HeaderStudent = await axios.get(
      `${path}/api/List/GetAllStudentByUserId`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
          "userId": userId.toString(),
        },
      }
    );
    if (!HeaderStudent) {
      throw new Error("Cannot fetch data");
    }
    return HeaderStudent.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

