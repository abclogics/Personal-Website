"use client";

import { ChevronDown } from "lucide-react";

export function FaqAccordion({ items }: { items: { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-[#d9e2ec] overflow-hidden rounded-lg border border-[#d9e2ec] bg-white shadow-sm">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="focus-ring flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left text-base font-semibold text-[#071527]">
            {item.question}
            <ChevronDown aria-hidden className="h-5 w-5 flex-none text-[#1b8a8f] transition group-open:rotate-180" />
          </summary>
          <div className="px-6 pb-6 text-sm leading-7 text-[#475467]">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}
