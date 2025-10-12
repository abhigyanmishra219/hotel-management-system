import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest)
{
    const body=await request.json()
    const Room={
            RoomNumber:body.RoomNumber,
            status:body.status,
            bed:body.bed,
            ac:body.AC,
            Rent:body.Rent
    }
    try{
        const room=await prismaclient.room.create({
            data:Room,
        })
        return NextResponse.json({
            success:true,
            room:room,
        })

    }
    catch(error:unknown)
    {
        console.log("error in adding room",error)
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
