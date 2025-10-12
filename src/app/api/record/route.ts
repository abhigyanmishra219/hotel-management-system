import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
    const check=await prismaclient.checking.findMany({
        where:{},
        include:{
            room:true
        }
    });
    if(!check)
    {
        return NextResponse.json(
            {
                success:false,
                message:"Checking Not Found"
            },
           
        );
    }
    return NextResponse.json({
        success:true,
        data:check,
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
