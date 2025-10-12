"use client";
import { Box, Tabs } from "@radix-ui/themes";
import Header from "./managerheader";
import { DisplayAvailableRoom } from "./displayavail";
import { DisplayBookedRoom } from "./booked";
import { DisplayundermainRoom } from "./displaymain";
import Displayrecords from "./displayreods";
import { BedDouble, CheckSquare, Wrench, FileText } from "lucide-react";

export default function ReceptionistDash() {
  return (
    <>
      <Header />
      <div className="p-6">
        <Tabs.Root defaultValue="available-room" className="w-full">
          <Tabs.List className="flex gap-2 bg-gray-100 p-2 rounded-lg shadow-sm">
            <Tabs.Trigger
              value="available-room"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-green-600 data-[state=active]:text-white hover:bg-green-100"
            >
              <BedDouble size={16} />
              Available
            </Tabs.Trigger>

            <Tabs.Trigger
              value="booked"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-orange-600 data-[state=active]:text-white hover:bg-orange-100"
            >
              <CheckSquare size={16} />
              Booked
            </Tabs.Trigger>

            <Tabs.Trigger
              value="maintenance"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-yellow-600 data-[state=active]:text-white hover:bg-yellow-100"
            >
              <Wrench size={16} />
              Maintenance
            </Tabs.Trigger>

            <Tabs.Trigger
              value="records"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-gray-800 data-[state=active]:text-white hover:bg-gray-200"
            >
              <FileText size={16} />
              Records
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="6">
            <Tabs.Content
              value="available-room"
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
              <DisplayAvailableRoom />
            </Tabs.Content>

            <Tabs.Content
              value="booked"
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Booked Rooms</h2>
              <DisplayBookedRoom />
            </Tabs.Content>

            <Tabs.Content
              value="maintenance"
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Maintenance</h2>
              <DisplayundermainRoom />
            </Tabs.Content>

            <Tabs.Content
              value="records"
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Guest Records</h2>
              <Displayrecords />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
    </>
  );
}
