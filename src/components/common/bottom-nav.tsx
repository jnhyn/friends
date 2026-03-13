"use client";

import { cn } from "@/utils/cn";
import { BookText, FolderHeart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
	{ href: "/scripts", label: "Scripts", icon: BookText, caption: "Browse" },
	{ href: "/memory", label: "Memory", icon: FolderHeart, caption: "Saved" },
];

export function BottomNav() {
	const pathname = usePathname();

	return (
		<nav className="fixed inset-x-0 bottom-4 z-30 mx-auto w-[calc(100%-1.5rem)] max-w-[448px] rounded-[28px] border border-zinc-200 bg-white/95 p-2 shadow-[0_12px_30px_rgba(0,0,0,0.08)] backdrop-blur">
			<div className="grid grid-cols-2 gap-2">
				{items.map((item) => {
					const active =
						pathname === item.href || pathname.startsWith(`${item.href}/`);
					const Icon = item.icon;

					return (
						<Link
							key={item.href}
							href={item.href}
							className={cn(
								"rounded-[22px] border px-4 py-3 transition-colors",
								active
									? "border-zinc-900 bg-zinc-900 text-white"
									: "border-transparent bg-zinc-50 text-zinc-900",
							)}
						>
							<div className="flex items-center gap-3">
								<div
									className={cn(
										"flex size-10 items-center justify-center rounded-2xl",
										active ? "bg-white/10" : "bg-white",
									)}
								>
									<Icon className="size-5" />
								</div>
								<div>
									<p
										className={cn(
											"text-sm font-semibold",
											active ? "text-white" : "text-zinc-900",
										)}
									>
										{item.label}
									</p>
									<p
										className={cn(
											"text-xs",
											active ? "text-zinc-300" : "text-zinc-500",
										)}
									>
										{item.caption}
									</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</nav>
	);
}
