import { Outlet } from "react-router-dom";

import Sidebar from "../Sidebar";

export default function MainLayout() {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}