"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";




const SidebarItem = ({
  icon,
  label,
  id,
  expanded,
  onClick,
  href,
  active,
  submenu,
}) => {
  const hasSubmenu = submenu && submenu.length > 0;

  const MainItem = () => (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center px-4 py-3 cursor-pointer transition-colors duration-200",
        active ? "bg-[#2c3b5a] text-white" : "text-gray-300 hover:bg-[#232e45] hover:text-white"
      )}
    >
      <div className="mr-3 text-blue-400">{icon}</div>
      <span className="flex-1">{label}</span>
      {hasSubmenu && (
        <ChevronDown
          size={18}
          className={cn(
            "transition-transform duration-200",
            expanded ? "rotate-180" : ""
          )}
        />
      )}
    </div>
  );

  return (
    <div className="group">
      {href && !hasSubmenu ? (
        <Link href={href}>
          <MainItem />
        </Link>
      ) : (
        <MainItem />
      )}

      {hasSubmenu && expanded && (
        <div className="overflow-hidden transition-all duration-300 ease-in-out">
          <div className="pl-10 py-1 bg-[#141b2d]">
            {submenu.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "py-2 px-4 transition-colors duration-200 flex items-center",
                    item.active
                      ? "text-blue-400"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400 mr-3"></div>
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarItem;