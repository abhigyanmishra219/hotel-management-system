import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest)
{
    try{
       const {roomId}=await req.json()
       const updatedRoom=await prismaclient.room.update({
        where:{
            id:roomId
        },
        data:
        {
            status:"available"
        }
       });
       return NextResponse.json({
        success:true,
        updatedRoom
       })
    }
    catch(err:unknown)
    {
        console.log("erroro in api",err)
    }
}