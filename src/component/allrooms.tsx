"use client";

import { Button, Card, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Maintane from "./maintane";
import { useRouter } from "next/navigation";

type RoomItem = {
  id: string;
  RoomNumber: string;
  status: "available" | "booked" | "maintenance" | string;
  bed: string;
  ac: string;
  Rent: string;
};

export function DisplayAllRoom() {
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchRoom() {
      try {
        const res = await fetch("/api/All"); 
        const data = await res.json();
        setRooms(data?.room || []);
      } catch (error: unknown) {
        console.error("Error fetching room", error);
      }
    }
    fetchRoom();
  }, []);

  function statusClasses(status?: string) {
    switch ((status ?? "").toLowerCase()) {
      case "available":
        return "bg-green-100 text-green-800";
      case "booked":
        return "bg-red-100 text-red-800";
      case "maintenance":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <Text as="h2" size={6} weight="bold">
            All Rooms
          </Text>
          <Text as="p" size={2} className="text-muted-foreground">
            Showing {rooms.length} rooms
          </Text>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((r) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <Card
                size="2"
                variant="surface"
                className="h-full flex flex-col justify-between rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow duration-200"
                role="listitem"
                aria-labelledby={`room-${r.RoomNumber}`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Text
                        id={`room-${r.RoomNumber}`}
                        as="h3"
                        size={4}
                        weight="bold"
                        className="truncate"
                      >
                        Room {r.RoomNumber}
                      </Text>
                      <div className="mt-1 flex items-center gap-2">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClasses(
                            r.status
                          )}`}
                          title={`Status: ${r.status}`}
                        >
                          {String(r.status).charAt(0).toUpperCase() + String(r.status).slice(1)}
                        </span>

                        <span className="text-xs text-muted-foreground">•</span>

                        <span className="text-xs text-muted-foreground">
                          Bed: {r.bed}
                        </span>

                        <span className="text-xs text-muted-foreground">•</span>

                        <span className="text-xs text-muted-foreground">
                          {r.ac === "with" ? "AC" : "No AC"}
                        </span>
                      </div>
                    </div>

                    <div className="ml-2 flex flex-col items-end">
                      <Text size={2} className="text-muted-foreground">
                        Rent
                      </Text>
                      <Text size={5} weight="semibold" className="mt-1">
                        ₹{r.Rent}
                      </Text>
                    </div>
                  </div>

                  <div className="mt-4 text-sm text-muted-foreground">
                    <p className="line-clamp-2">
                      Comfortable room with {r.bed} bed{r.bed !== "single" ? "s" : ""}. Rates
                      shown are per night.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  

                  <div className="flex items-center gap-2">
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
