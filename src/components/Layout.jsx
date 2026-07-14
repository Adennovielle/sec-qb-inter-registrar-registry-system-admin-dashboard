import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar open={sidebarOpen} />
      <div className="irr-main">
        <Topbar onToggleSidebar={() => setSidebarOpen((v) => !v)} />
        <main className="irr-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
