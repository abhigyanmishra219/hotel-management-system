import prismaclient from "@/services/prisma";
import { NextResponse } from "next/server";

export async function GET()
{
    try{
    const user=await prismaclient.user.findMany();
    if(!user)
    {
        return NextResponse.json(
            {
                success:false,
                message:"User Not Found"
            },
        );
    }
    return NextResponse.json({
        success:true,
        user:user,
    })
    }
    catch(error:unknown)
    {
        console.error("error in fetching user",error)
        return NextResponse.json(
            {
                success:false,
                message:"Something went wrong"
            }
        )
    }
}
