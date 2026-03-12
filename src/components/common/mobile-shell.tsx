"use client";

import { ReactNode } from "react";
import { BottomNav } from "@/components/common/bottom-nav";
import { TopBar } from "@/components/common/top-bar";

export function MobileShell({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <main className="app-shell grain page-enter">
      <TopBar title={title} eyebrow={eyebrow} />
      <div className="shell-content">{children}</div>
      <BottomNav />
    </main>
  );
}
