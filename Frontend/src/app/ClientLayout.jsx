"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import Sidebar from "../../components/SideNavbar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/";

  return (
    <div className="min-h-screen bg-background">
      {!isAuthPage && <Sidebar />}
      <div className={cn(
        "min-h-screen transition-all duration-300",
        !isAuthPage ? "lg:ml-64" : ""
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <main className="animate-fade-in">
            {children}
          </main>
        </div>
      </div>
      <ThemeToggle />
    </div>
  );
}