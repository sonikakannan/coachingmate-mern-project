import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex bg-indigo-100  relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="flex-1 max-h-screen overflow-y-scroll bg-indigo-100">
        <Navbar onMenuClick={toggleSidebar} />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
