"use server"

import axios from "axios";
import { signIn, signOut } from "../lib/auth";

export const login = async(previousState,formData)=>{
    const {username,password} = Object.fromEntries(formData);
    try {
        await signIn("credentials",{username,password})
        return { success:true}
    } catch (error) {
        if(!error.message.includes("NEXT_REDIRECT")){
            return { error: "ชื่อ username หรือ password ไม่ถูกต้อง" };
        }
        throw error;
    }
}

export const logout = async() => {
    "use server"
    await signOut();
  }