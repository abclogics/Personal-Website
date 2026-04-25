import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon: Icon
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "dark";
  icon?: LucideIcon;
}) {
  const styles = {
    primary: "bg-[#1b8a8f] text-white shadow-sm hover:bg-[#15767a]",
    secondary: "bg-white text-[#071527] ring-1 ring-[#d9e2ec] hover:bg-[#f3f6f8]",
    dark: "bg-[#071527] text-white hover:bg-[#13243a]"
  };

  return (
    <Link
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-semibold transition ${styles[variant]}`}
      href={href}
    >
      {Icon ? <Icon aria-hidden className="h-4 w-4" /> : null}
      {children}
    </Link>
  );
}
