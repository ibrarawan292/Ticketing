import React from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

function Dashboard() {
  return (
    <div className="w-full h-full">
      <div>
        <AdminDashboard />
      </div>
    </div>
  );
}

export default Dashboard;
