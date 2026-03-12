import { ButtonHTMLAttributes } from "react";
import { cn } from "@/utils/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold transition-transform duration-200 active:scale-[0.98]",
        variant === "primary"
          ? "border-black/10 bg-[var(--foreground)] text-white shadow-[0_10px_24px_rgba(23,23,23,0.12)]"
          : "border-black/10 bg-white/85 text-[var(--foreground)]",
        className,
      )}
      {...props}
    />
  );
}
