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
    <main className="mx-auto min-h-screen max-w-[480px] bg-white">
      <TopBar title={title} eyebrow={eyebrow} />
      <div className="min-h-screen px-4 pb-32 pt-32">{children}</div>
      <BottomNav />
    </main>
  );
}
