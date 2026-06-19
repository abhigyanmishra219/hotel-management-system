import prismaclient from "@/services/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  context: RouteContext
) {
  try {
    const { id } = await context.params;

    const user = await prismaclient.user.findUnique({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: NextRequest,
  context: RouteContext
) {
  const { id } = await context.params;
  const body = await req.json();

  const users = {
    name: body.name,
    email: body.email,
    password: body.password,
    role: body.role,
  };

  try {
    const user = await prismaclient.user.update({
      where: {
        id,
      },
      data: users,
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (err) {
    console.log("error in update", err);

    return NextResponse.json(
      {
        success: false,
        message: "something went wrong",
      },
      { status: 500 }
    );
  }
}