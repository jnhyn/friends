import { HTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type BadgeProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "default" | "secondary" | "outline";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "border-zinc-900 bg-zinc-900 text-white",
        variant === "secondary" && "border-zinc-200 bg-zinc-100 text-zinc-900",
        variant === "outline" && "border-zinc-200 bg-white text-zinc-700",
        className,
      )}
      {...props}
    />
  );
}
