"use client";

import { BookOpenText } from "lucide-react";
import { usePathname } from "next/navigation";
import { useHeaderVisibility } from "@/hooks/use-header-visibility";
import { cn } from "@/utils/cn";

export function TopBar({ title, eyebrow }: { title: string; eyebrow: string }) {
  const visible = useHeaderVisibility();
  const pathname = usePathname();
  const section = pathname.startsWith("/memory") ? "Memory" : "Scripts";

  return (
    <header className={cn("topbar", !visible && "topbar-hidden")}>
      <div className="topbar-row">
        <div className="topbar-brand">
          <div className="topbar-logo">
            <BookOpenText className="size-5" />
          </div>
          <div>
            <p className="topbar-eyebrow">Friends Memory</p>
            <h1 className="topbar-title">{title}</h1>
          </div>
        </div>
        <div className="topbar-pill">{section}</div>
      </div>
      <div className="topbar-meta">
        <p className="topbar-meta-text">{eyebrow}</p>
        <div className="topbar-meta-badge">Study</div>
      </div>
    </header>
  );
}
