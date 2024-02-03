"use server";
import axios from "axios";

const path = process.env.LocalhostDOTNET;

export const getListSubjectByFilter = async (importHeader) => {
  try {
    const allListSubject = await axios.get(
      `${path}/api/List/Getlistimportheader`,
      {
        ImportHeader: importHeader
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (!allListSubject) {
      throw new Error("Cannot fetch data");
    }
    return allListSubject.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const getAllListSubject = async () => {
  try {
    const allListSubject = await axios.get(
      `${path}/api/List/Getlistimportheader`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (!allListSubject) {
      throw new Error("Cannot fetch data");
    }
    return allListSubject.data;
  } catch (error) {
    throw new Error("Error to fetch data");
  }
};

export const deleteImportList = async (headerNumber) => {
  try {
    const deleteIHeader = await axios.delete(
      `${path}/api/List/DeleteImportList?importHedderNumber=${headerNumber}`,
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
      }
    );
    if (deleteIHeader.status !== 200) {
      throw new Error("Cannot delete the importlist");
    }
    return deleteIHeader.status;
  } catch (error) {
    throw new Error("Error to delete the importlist");
  }
};
