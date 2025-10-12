"use client";
import { Button, Dialog,Flex,Text,TextField } from "@radix-ui/themes";
import { redirect } from "next/navigation";
import { useEffect, useState, use } from "react";
import { toast } from "sonner";

type Room = {
  id: string;
  RoomNumber: string;
  status: string;
  bed: string;
  ac: string;
  Rent: string;
};
type CheckinPayload = {
  roomId: string;
  name: string;
  Mobile: string;
  Address?: string;
  ID?: "aadhar" | "pancard" | "passport" | string;
  CheckIn?: string; 
  CheckOut?: string; 
  Night?: string; 
};
export default function FetchRoomById({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); 

  const [room, setRoom] = useState<Room | null>(null);
 const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [idType, setIdType] = useState<CheckinPayload["ID"]>("aadhar");
  const today = new Date().toISOString().slice(0, 10);
  const [checkIn, setCheckIn] = useState<string>(today);
  const [checkOut, setCheckOut] = useState<string>("");
  const [nights, setNights] = useState<string>("1");
  useEffect(() => {
    async function fetchDetails() {
      try {
        const response = await fetch(`http://localhost:3000/api/Room/${id}`);
        const data = await response.json();
        setRoom(data?.room);
      } catch (error: unknown) {
        console.error("Error fetching:", error);
      }
    }
    fetchDetails();
  }, [id]);
  async function handleBooking() {
    if (!room) {
    toast.error("Room not loaded yet. Please wait.");
    return;
  }
    const data:CheckinPayload={
      roomId:room?.id,
      name:name,
      Mobile:mobile,
      Address:address,
      ID:idType,
      CheckIn:checkIn,
      CheckOut:checkOut,
      Night:nights
    }
    const response=await fetch("/api/checkin",{
      method:"POST",
      body:JSON.stringify(data)
    })
    console.log(data)
    const d=await response.json();
    if(d.success)
    {
      toast("Booking Done")
    
      setName("");
      setMobile("");
      setAddress("");
      setCheckOut("");
      setNights("1");
        redirect("/")
    }
  }
  if (!room) return <p>Loading...</p>;

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
  <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition duration-300">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      Room <span className="text-blue-600">{room.RoomNumber}</span>
    </h2>

    <div className="space-y-4">
      <p className="flex justify-between">
        <span className="text-gray-600 font-medium">Status:</span>
        <span
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            room.status === "Available"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {room.status}
        </span>
      </p>

      <p className="flex justify-between">
        <span className="text-gray-600 font-medium">Bed:</span>
        <span className="text-gray-800">{room.bed}</span>
      </p>

      <p className="flex justify-between">
        <span className="text-gray-600 font-medium">AC:</span>
        <span
          className={`px-2 py-1 rounded text-sm ${
            room.ac === "Yes"
              ? "bg-blue-100 text-blue-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {room.ac}
        </span>
      </p>

      <p className="flex justify-between">
        <span className="text-gray-600 font-medium">Rent:</span>
        <span className="text-lg font-semibold text-gray-900">
          ₹{room.Rent}
        </span>
      </p>
      <Dialog.Root>
	<Dialog.Trigger>
		<Button>Book Room</Button>
	</Dialog.Trigger>

	<Dialog.Content maxWidth="450px">
		<Dialog.Title>book Room</Dialog.Title>

		<Flex direction="column" gap="3">
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Room Number
				</Text>
				<TextField.Root
					defaultValue={room.RoomNumber}
				/>
			</label>
			<label>
				<Text as="div" size="2" mb="1" weight="bold">
					Status
				</Text>
				<TextField.Root
					defaultValue={room.status}
				/>
			</label>
      <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Rent
				</Text>
				<TextField.Root
					defaultValue={room.Rent}
				/>
			</label>
      <label>
				<Text as="div" size="2" mb="1" weight="bold">
					AC
				</Text>
				<TextField.Root
					defaultValue={room.ac}
				/>
			</label>
      <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Bed Type
				</Text>
				<TextField.Root
					defaultValue={room.bed}
				/>
			</label>
      <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Name Of The Custmor
				</Text>
				<TextField.Root
					value={name}
          onChange={(e)=>setName(e.target.value)}
				/>
			</label>
      <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Phone Number Of The Custmor
				</Text>
				<TextField.Root
					value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
				/>
			</label>
        <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Address Of The Custmor
				</Text>
				<TextField.Root
					value={address}
          onChange={(e)=>setAddress(e.target.value)}
				/>
			</label>
        <label>
				<Text as="div" size="2" mb="1" weight="bold">
				Valid Id 
				</Text>
				<TextField.Root
					value={idType}
          onChange={(e)=>setIdType(e.target.value)}
				/>
			</label>
        <label>
				<Text as="div" size="2" mb="1" weight="bold">
					CheckIn date
				</Text>
				<TextField.Root
					value={checkIn}
          onChange={(e)=>setCheckIn(e.target.value)}
				/>
			</label>
        <label>
				<Text as="div" size="2" mb="1" weight="bold">
					CheckOut Date
				</Text>
				<TextField.Root
					value={checkOut}
          onChange={(e)=>setCheckOut(e.target.value)}
				/>
			</label>
        <label>
				<Text as="div" size="2" mb="1" weight="bold">
					Number Of Nights Stay
				</Text>
				<TextField.Root
					value={nights}
          onChange={(e)=>setNights(e.target.value)}
				/>
			</label>
		</Flex>

		<Flex gap="3" mt="4" justify="end">
			<Dialog.Close>
				<Button variant="soft" color="gray">
					Cancel
				</Button>
			</Dialog.Close>
			<Dialog.Close>
				<Button onClick={handleBooking}>Save</Button>
			</Dialog.Close>
		</Flex>
	</Dialog.Content>
</Dialog.Root>

    </div>
  </div>
</div>

   </>
  );
}
