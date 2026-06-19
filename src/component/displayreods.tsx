"use client"
import { useEffect, useState } from "react"

type Room = {
  id: string;
  RoomNumber: string;
  status: string;
  bed: string;
  ac: string;
  Rent: string;
};

type Record = {
  id: string;
  name: string;
  Mobile: string;
  Address: string;
  ID: string;
  roomId: string;
  Rent: string;
  CheckIn: string;
  CheckOut: string;
  Night: string;
  TotalRent: string;
  room: Room;
};

export default function Displayrecords() {
  const [records, setRecords] = useState<Record[]>([]);

  useEffect(() => {
    async function fetchrecord() {
      const res = await fetch("/api/record");
      const data = await res.json();
      setRecords(data?.data || []);
    }
    fetchrecord();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Records</h1>

      {records.length === 0 ? (
        <p>No records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Mobile</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Check-In</th>
                <th className="border border-gray-300 px-4 py-2">Check-Out</th>
                <th className="border border-gray-300 px-4 py-2">Nights</th>
                <th className="border border-gray-300 px-4 py-2">Total Rent</th>
                <th className="border border-gray-300 px-4 py-2">Room No</th>
                <th className="border border-gray-300 px-4 py-2">Bed</th>
                <th className="border border-gray-300 px-4 py-2">AC</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec.id} className="">
                  <td className="border border-gray-300 px-4 py-2">{rec.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.Mobile}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.Address}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.CheckIn}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.CheckOut}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.Night}</td>
                  <td className="border border-gray-300 px-4 py-2">₹{rec.TotalRent}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.room.RoomNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.room.bed}</td>
                  <td className="border border-gray-300 px-4 py-2">{rec.room.ac}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
