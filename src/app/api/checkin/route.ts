import prismaclient from "@/services/prisma";

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomId, name, Mobile, Address, ID, CheckIn, CheckOut, Night } = body ?? {};

    if (!roomId || !name || !Mobile) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 });
    }
     console.log("incoming roomId:", roomId);

    const result = await prismaclient.$transaction(async (tx) => {
      const room = await tx.room.findUnique({ where: { id: roomId } });
      if (!room) throw new Error("Room not found");
      if (room.status !== "available") throw new Error("Room not available");

      const rentNum = Number(room.Rent) || 0;
      const nightsNum = Number(Night) || 1;
      const total = rentNum * nightsNum;

      const checking = await tx.checking.create({
        data: {
          room: { connect: { id: roomId } },
          name,
          Mobile,
          Address: Address ?? "",
          ID: ID ?? "aadhar",
          Rent: room.Rent,
          CheckIn: CheckIn ?? new Date().toISOString(),
          CheckOut: CheckOut ?? "",
          Night: String(nightsNum),
          TotalRent: String(total),
        },
      });
      const updatedRoom = await tx.room.update({
        where: { id: roomId },
        data: { status: "booked" },
      });

      return { checking, updatedRoom };
    });

    return NextResponse.json({ success: true, ...result }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg === "Room not found") return NextResponse.json({ success: false, message: msg }, { status: 404 });
    if (msg === "Room not available") return NextResponse.json({ success: false, message: msg }, { status: 409 });
    console.log("checkin error", err);
    return NextResponse.json({ success: false, message: msg }, { status: 500 });
  }
} 
