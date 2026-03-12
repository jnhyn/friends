"use client";

import { BookText, FolderHeart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const items = [
  { href: "/scripts", label: "Scripts", icon: BookText, caption: "Browse" },
  { href: "/memory", label: "Memory", icon: FolderHeart, caption: "Saved" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div className="bottom-nav-grid">
        {items.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("bottom-nav-link", active && "bottom-nav-link-active")}
            >
              <div className="bottom-nav-link-inner">
                <div className="bottom-nav-icon">
                  <Icon className="size-5" />
                </div>
                <div>
                  <p className="bottom-nav-label">{item.label}</p>
                  <p className="bottom-nav-caption">{item.caption}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
