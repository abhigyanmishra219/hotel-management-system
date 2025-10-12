import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest)
{
    const body=await request.json()
    const Member={
            name:body.name,
            email:body.email,
            password:body.password,
            role:body.role
    }
    try{
        const member=await prismaclient.user.create({
            data:Member,
        })
        return NextResponse.json({
            success:true,
            user:member
        })

    }
    catch(error:unknown)
    {
        console.log("error in adding member",error)
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}
