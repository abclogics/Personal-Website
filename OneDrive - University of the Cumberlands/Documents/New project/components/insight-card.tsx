import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function InsightCard({
  title,
  description,
  category,
  slug,
  date
}: {
  title: string;
  description: string;
  category: string;
  slug: string;
  date: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase text-[#1b8a8f]">{category}</p>
      <h3 className="mt-4 text-xl font-semibold text-[#071527]">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-7 text-[#475467]">{description}</p>
      <div className="mt-5 flex items-center justify-between gap-4 text-sm">
        <time className="text-[#667085]" dateTime={date}>
          {new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date))}
        </time>
        <Link className="focus-ring inline-flex items-center gap-2 rounded-sm font-semibold text-[#071527]" href={`/insights/${slug}`}>
          Read
          <ArrowRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
