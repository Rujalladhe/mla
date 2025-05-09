"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const SidebarItem = ({ icon, label, href, active, submenu, expanded, onClick }) => {
  const pathname = usePathname();

  const isActive = active || (href && pathname === href);

  return (
    <div className="px-3 py-2">
      <div
        onClick={onClick}
        className={cn(
          "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200",
          isActive
            ? "bg-blue-50 text-blue-600"
            : "hover:bg-gray-50 text-gray-600 hover:text-gray-900"
        )}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span className="font-medium">{label}</span>
        </div>
        {submenu && (
          <ChevronDown
            size={18}
            className={cn(
              "transition-transform duration-200",
              expanded ? "rotate-180" : ""
            )}
          />
        )}
      </div>

      {submenu && expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-1 ml-8 space-y-1"
        >
          {submenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                item.active
                  ? "bg-blue-50 text-blue-600 font-medium"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {item.label}
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default SidebarItem;