"use client";

import Sidebar from "../../components/SideNavbar";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex w-full">
      {/* Conditionally render Sidebar if not on root (/) */}
      {pathname !== "/" && <Sidebar />}

      {/* Main Content Area */}
      <main className="flex-1 bg-black p-3 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}