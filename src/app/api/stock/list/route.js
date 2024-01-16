import { NextResponse } from "next/server";
import {query} from "../../../../lib/db"

export async function GET(req,res){
    let message;
   try{
    const items = await query({
        querry: "SELECT * FROM stockitem WHERE status = 1",
        values: [],
      });

    if (items.find) {
        message = "success";
      } else {
        message = "error";
      };

    return NextResponse.json(
        {items:items},
        {status:200},
        {message:message}
    );

   }catch(error){
    console.error("Error GET stockitem :", error);
    return NextResponse.json(
        {status:500},
        {message:message}
    );
   } 
}