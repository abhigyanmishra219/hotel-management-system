"use client";

import { useContext } from "react";
import { UserContext } from "@/component/context/user-context";
import ManagerDash from "@/component/managerdash";
import StaffDash from "@/component/staffdash";
import ReceptionistDash from "@/component/receptionistdash";


export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user?.role === "manager" && <ManagerDash/> }
      {user?.role === "staff" && <StaffDash/>}
      {user?.role === "receptionist" && <ReceptionistDash/>}
      
    </>
  );
}
