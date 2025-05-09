"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const SidebarItem = ({
  icon,
  label,
  href,
  active,
  submenu,
  expanded,
  onClick,
  id,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      className={cn(
        "flex items-center px-3 py-2.5 cursor-pointer transition-all duration-200",
        active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-primary/5 hover:text-foreground",
        "rounded-lg"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-5 h-5 mr-3">
        {icon}
      </div>
      <span className="flex-1 text-sm">{label}</span>
      {submenu && (
        <ChevronDown
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            expanded ? "transform rotate-180" : ""
          )}
        />
      )}
    </div>
  );

  return (
    <div className="mb-0.5">
      {href ? (
        <Link href={href} className="block">
          {content}
        </Link>
      ) : (
        content
      )}
      {submenu && expanded && (
        <div className="mt-1 ml-4 space-y-0.5">
          {submenu.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "block px-3 py-2 text-sm transition-all duration-200",
                item.active
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground",
                "rounded-lg hover:bg-primary/5"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarItem;