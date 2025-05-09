"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import Sidebar from "../../components/SideNavbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <div className="flex w-full">
      {/* Conditionally render Sidebar if not on root (/) */}
      {pathname !== "/" && <Sidebar />}

      {/* Main Content Area */}
      <main className="flex-1 bg-white p-3 overflow-y-auto h-screen">
        {children}
      </main>
    </div>
  );
}