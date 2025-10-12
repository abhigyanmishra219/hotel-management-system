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
            status:"maintenance"
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


export async function GET()
{
    try{
    const room=await prismaclient.room.findMany({
        where:
          {
            status:"maintenance"
          }
    });
    if(!room)
    {
        return NextResponse.json(
            {
                success:false,
                message:"Room Not Found"
            },
        );
    }
    return NextResponse.json({
        success:true,
        room:room,
    })
    }
    catch(error:unknown)
    {
        console.error("error in fetching Rooms",error)
        return NextResponse.json(
            {
                success:false,
                message:"Something went wrong"
            }
        )
    }
}