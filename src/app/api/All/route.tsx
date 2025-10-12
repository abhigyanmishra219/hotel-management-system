import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
    const room=await prismaclient.room.findMany();
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
