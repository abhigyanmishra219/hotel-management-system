"use client";
import { Box, Tabs } from "@radix-ui/themes";
import Header from "./managerheader";
import { DisplayundermainRoom } from "./displaymain";
import { Wrench } from "lucide-react";

export default function StaffDash() {
  return (
    <>
      <Header />
      <div className="p-6">
        <Tabs.Root defaultValue="maintenance" className="w-full">
          <Tabs.List className="flex gap-2 bg-gray-100 p-2 rounded-lg shadow-sm">
            <Tabs.Trigger
              value="maintenance"
              className="flex items-center gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-yellow-600 data-[state=active]:text-white hover:bg-yellow-100"
            >
              <Wrench size={16} />
              Maintenance
            </Tabs.Trigger>
          </Tabs.List>

          {/* Tab Content */}
          <Box pt="6">
            <Tabs.Content
              value="maintenance"
              className="bg-white p-6 rounded-xl shadow"
            >
              <h2 className="text-xl font-semibold mb-4">Maintenance Tasks</h2>
              <DisplayundermainRoom />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </div>
    </>
  );
}
