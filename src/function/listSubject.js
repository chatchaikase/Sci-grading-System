'use sever'

import axios from "axios"

const path = process.env.LocalhostDOTNET;

export const getAllListSubject = async() =>{
    try {
        const allListSubject = await axios.get(`http://localhost:5084/api/List/Getlistimportheader`, {
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store",
            },
          });
        if (!allListSubject){
            throw new Error("Cannot fetch data");
        }
        return allListSubject.data;
    } catch (error) {
        throw new Error("Error to fetch data");
    }
}

