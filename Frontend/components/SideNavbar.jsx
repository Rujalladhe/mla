"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidebarItem from "./SideBarItem";
import { useTheme } from "@/components/ThemeProvider";

import { 
  Users, 
  Building2, 
  FileText, 
  UserCheck, 
  Landmark, 
  MessagesSquare, 
  ShieldCheck, 
  BarChart3,
  Menu,
  X
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState("voter-management");
  const [isOpen, setIsOpen] = useState(true);
  const { theme } = useTheme();

  const toggleExpand = (itemId) => {
    setExpanded(expanded === itemId ? null : itemId);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md glass"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={cn(
        "fixed top-0 left-0 h-screen glass border-r border-border/40 transition-all duration-300 ease-in-out z-40",
        isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-64 lg:translate-x-0"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border/40">
            <h2 className="text-xl font-semibold">Dashboard</h2>
          </div>

          <nav className="flex-1 overflow-y-auto py-4">
            <div className="px-2 space-y-1">
              <SidebarItem
                icon={<Users size={20} />}
                label="Voter Management"
                id="voter-management"
                expanded={expanded === "voter-management"}
                onClick={() => toggleExpand("voter-management")}
                submenu={[
                  {
                    label: "Add New Voter",
                    href: "/Dashboard/voter-management/add-new-voter",
                    active: pathname === "/Dashboard/voter-management/add-new-voter",
                  },
                  {
                    label: "Voter Database",
                    href: "/Dashboard/voter-management/voter-database",
                    active: pathname === "/Dashboard/voter-management/voter-database",
                  },
                ]}
              />

              <SidebarItem
                icon={<Building2 size={20} />}
                label="Office Management"
                id="office-management"
                expanded={expanded === "office-management"}
                onClick={() => toggleExpand("office-management")}
                href="/office-management"
                active={pathname === "/office-management"}
              />

              <SidebarItem
                icon={<FileText size={20} />}
                label="Public Grievance"
                id="public-grievance"
                expanded={expanded === "public-grievance"}
                onClick={() => toggleExpand("public-grievance")}
                href="/public-grievance"
                active={pathname === "/public-grievance"}
              />

              <SidebarItem
                icon={<UserCheck size={20} />}
                label="Visitor Tracking"
                id="visitor-tracking"
                expanded={expanded === "visitor-tracking"}
                onClick={() => toggleExpand("visitor-tracking")}
                href="/visitor-tracking"
                active={pathname === "/visitor-tracking"}
              />

              <SidebarItem
                icon={<Landmark size={20} />}
                label="Constituency"
                id="constituency"
                expanded={expanded === "constituency"}
                onClick={() => toggleExpand("constituency")}
                href="/constituency"
                active={pathname === "/constituency"}
              />

              <SidebarItem
                icon={<MessagesSquare size={20} />}
                label="Communication Center"
                id="communication-center"
                expanded={expanded === "communication-center"}
                onClick={() => toggleExpand("communication-center")}
                href="/communication-center"
                active={pathname === "/communication-center"}
              />

              <SidebarItem
                icon={<ShieldCheck size={20} />}
                label="User Permissions"
                id="user-permissions"
                expanded={expanded === "user-permissions"}
                onClick={() => toggleExpand("user-permissions")}
                href="/user-permissions"
                active={pathname === "/user-permissions"}
              />

              <SidebarItem
                icon={<BarChart3 size={20} />}
                label="Reports & Analytics"
                id="reports-analytics"
                expanded={expanded === "reports-analytics"}
                onClick={() => toggleExpand("reports-analytics")}
                href="/reports-analytics"
                active={pathname === "/reports-analytics"}
              />
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;