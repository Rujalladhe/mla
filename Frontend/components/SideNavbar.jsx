"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import SidebarItem from "./SideBarItem";
import { motion } from "framer-motion";

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
  X,
  ChevronRight
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState("voter-management");
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleExpand = (itemId) => {
    setExpanded(expanded === itemId ? null : itemId);
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-[100] p-2.5 bg-white rounded-xl text-gray-700 shadow-lg hover:bg-gray-50 transition-all duration-300 border border-gray-200"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed lg:relative h-screen bg-white text-gray-700 transition-all duration-300 ease-in-out z-[90] shadow-lg border-r border-gray-200",
          isOpen ? "w-72 translate-x-0" : "w-0 -translate-x-full lg:w-72 lg:translate-x-0"
        )}
      >
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            MLA Dashboard
          </h2>
        </div>

        <div className="flex-1 overflow-auto py-4 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
          <SidebarItem
            icon={<Users size={20} className="text-blue-500" />}
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
            icon={<Building2 size={20} className="text-emerald-500" />}
            label="Office Management"
            id="office-management"
            expanded={expanded === "office-management"}
            onClick={() => toggleExpand("office-management")}
            href="/office-management"
            active={pathname === "/office-management"}
          />

          <SidebarItem
            icon={<FileText size={20} className="text-purple-500" />}
            label="Public Grievance"
            id="public-grievance"
            expanded={expanded === "public-grievance"}
            onClick={() => toggleExpand("public-grievance")}
            href="/public-grievance"
            active={pathname === "/public-grievance"}
          />

          <SidebarItem
            icon={<UserCheck size={20} className="text-amber-500" />}
            label="Visitor Tracking"
            id="visitor-tracking"
            expanded={expanded === "visitor-tracking"}
            onClick={() => toggleExpand("visitor-tracking")}
            href="/visitor-tracking"
            active={pathname === "/visitor-tracking"}
          />

          <SidebarItem
            icon={<Landmark size={20} className="text-rose-500" />}
            label="Constituency"
            id="constituency"
            expanded={expanded === "constituency"}
            onClick={() => toggleExpand("constituency")}
            href="/constituency"
            active={pathname === "/constituency"}
          />

          <SidebarItem
            icon={<MessagesSquare size={20} className="text-indigo-500" />}
            label="Communication Center"
            id="communication-center"
            expanded={expanded === "communication-center"}
            onClick={() => toggleExpand("communication-center")}
            href="/communication-center"
            active={pathname === "/communication-center"}
          />

          <SidebarItem
            icon={<ShieldCheck size={20} className="text-cyan-500" />}
            label="User Permissions"
            id="user-permissions"
            expanded={expanded === "user-permissions"}
            onClick={() => toggleExpand("user-permissions")}
            href="/user-permissions"
            active={pathname === "/user-permissions"}
          />

          <SidebarItem
            icon={<BarChart3 size={20} className="text-teal-500" />}
            label="Reports & Analytics"
            id="reports-analytics"
            expanded={expanded === "reports-analytics"}
            onClick={() => toggleExpand("reports-analytics")}
            href="/reports-analytics"
            active={pathname === "/reports-analytics"}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;