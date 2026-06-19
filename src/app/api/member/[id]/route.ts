import prismaclient from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; 

    const user = await prismaclient.user.findUnique({
      where: { id },
    });


    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
export async function POST(req:NextRequest,{params}:{params:{id:string}})
{
  const id=params.id
  const body=await req.json()
  const users={
    name:body.name,
    email:body.email,
    password:body.password,
    role:body.role,
  };
  try{
    const user=await prismaclient.user.update({
      where:{
        id:id
      },
      data:users
    });
    return NextResponse.json({
      success:true,
      data:user
    })
  }
  catch(err:unknown)
  {
    console.log("error in update",err)
    return NextResponse.json(
      {
        success:false,
        message:"something went wrong"
      }
    )
  }
}
