import prismaclient from "@/services/prisma"
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id; 

    const room = await prismaclient.room.findUnique({
      where: { id },
    });


    return NextResponse.json({
      success: true,
      room,
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
