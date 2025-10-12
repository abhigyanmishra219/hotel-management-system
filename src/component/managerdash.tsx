"use client";
import { Box, Tabs } from "@radix-ui/themes";
import Header from "./managerheader";
import AddRoom from "./addroom";
import { DisplayAvailableRoom } from "./displayavail";
import { DisplayBookedRoom } from "./booked";
import { DisplayundermainRoom } from "./displaymain";
import { DisplayAllRoom } from "./allrooms";
import Addmember from "./addmember";
import Displayreods from "./displayreods";
import Showuser from "./showuser";
import {
  Home,
  BedDouble,
  CheckSquare,
  Users,
  Wrench,
  FileText,
} from "lucide-react";

export default function ManagerDash() {
  return (
    <>
      <Header />
      <div className="p-6">
        <Tabs.Root defaultValue="all-room" className="w-full">
          {/* Tabs List */}
          <Tabs.List className="flex gap-2 bg-gray-100 p-2 rounded-lg shadow-sm">
            <Tabs.Trigger
              value="all-room"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white hover:bg-blue-100"
            >
              <Home size={16} />
              All Rooms
            </Tabs.Trigger>

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
              value="add-staff"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-purple-600 data-[state=active]:text-white hover:bg-purple-100"
            >
              <Users size={16} />
              Staff
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

          {/* Tabs Content */}
          <Box pt="6">
            <Tabs.Content value="all-room" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">All Rooms</h2>
              <AddRoom />
              <div className="mt-4">
                <DisplayAllRoom />
              </div>
            </Tabs.Content>

            <Tabs.Content value="available-room" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Available Rooms</h2>
              <DisplayAvailableRoom />
            </Tabs.Content>

            <Tabs.Content value="booked" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Booked Rooms</h2>
              <DisplayBookedRoom />
            </Tabs.Content>

            <Tabs.Content value="add-staff" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Manage Staff</h2>
              <Addmember />
              <div className="mt-4">
                <Showuser />
              </div>
            </Tabs.Content>

            <Tabs.Content value="maintenance" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Maintenance</h2>
              <DisplayundermainRoom />
            </Tabs.Content>

            <Tabs.Content value="records" className="bg-white p-6 rounded-xl shadow">
              <h2 className="text-xl font-semibold mb-4">Records</h2>
              <Displayreods />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
    </>
  );
}
