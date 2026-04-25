import type { LucideIcon } from "lucide-react";

export function ServiceCard({
  title,
  description,
  icon: Icon
}: {
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <article className="rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 items-center justify-center rounded-md bg-[#e7f3f3] text-[#1b8a8f]">
        <Icon aria-hidden className="h-5 w-5" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-[#071527]">{title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#475467]">{description}</p>
    </article>
  );
}
