
import { createToken } from "@/services/jwt";
import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    const body=await request.json()
    const user=await prismaclient.user.findUnique({
        where:{
            email:body.email,
            password:body.password
        }
    })
    if(user?.password==body?.password)
    {
       const userToken : {
    id: string | undefined;
     }={id:user?.id}
     const token=createToken(userToken)
     const res=NextResponse.json({
        success:true,
        user:user
     })
     res.cookies.set('token',token)
     return res
    }
     return NextResponse.json({
        success:false
     })   
}