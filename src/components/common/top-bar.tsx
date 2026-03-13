"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useHeaderVisibility } from "@/hooks/use-header-visibility";
import { cn } from "@/utils/cn";
import { BookOpenText } from "lucide-react";
import { usePathname } from "next/navigation";

export function TopBar({ title, eyebrow }: { title: string; eyebrow: string }) {
	const visible = useHeaderVisibility();
	const pathname = usePathname();
	const section = pathname.startsWith("/memory") ? "Memory" : "Scripts";

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-[480px] px-4 pt-4 transition-transform duration-300",
				visible ? "translate-y-0" : "-translate-y-[88%]",
			)}
		>
			<Card className="rounded-[28px] border-zinc-200/80 bg-white/95 backdrop-blur">
				<CardContent className="space-y-4 p-4">
					<div className="flex items-start justify-between gap-3">
						<div className="flex min-w-0 items-center gap-3">
							<div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-zinc-200 bg-zinc-50">
								<BookOpenText className="size-5 text-zinc-900" />
							</div>
							<div className="min-w-0">
								<p className="truncate text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
									Friends Memory
								</p>
								<h1 className="truncate text-base font-semibold text-zinc-950">
									{title}
								</h1>
							</div>
						</div>
						<Badge variant="outline" className="shrink-0">
							{section}
						</Badge>
					</div>
					<Separator />
					<div className="flex items-center justify-between gap-3">
						<p className="min-w-0 truncate text-sm text-zinc-600">{eyebrow}</p>
						<Badge className="shrink-0">Study</Badge>
					</div>
				</CardContent>
			</Card>
		</header>
	);
}
