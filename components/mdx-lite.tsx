import Link from "next/link";
import type { ReactNode } from "react";

export function MdxLite({ body }: { body: string }) {
  const lines = body.split(/\r?\n/);
  const nodes: ReactNode[] = [];
  let listItems: string[] = [];

  function flushList(key: string) {
    if (!listItems.length) {
      return;
    }

    nodes.push(
      <ul key={key}>
        {listItems.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
    listItems = [];
  }

  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed) {
      flushList(`list-${index}`);
      return;
    }
    if (trimmed.startsWith("## ")) {
      flushList(`list-${index}`);
      nodes.push(<h2 key={index}>{trimmed.replace(/^## /, "")}</h2>);
      return;
    }
    if (trimmed.startsWith("### ")) {
      flushList(`list-${index}`);
      nodes.push(<h3 key={index}>{trimmed.replace(/^### /, "")}</h3>);
      return;
    }
    if (trimmed.startsWith("- ")) {
      listItems.push(trimmed.replace(/^- /, ""));
      return;
    }
    flushList(`list-${index}`);
    nodes.push(<p key={index}>{trimmed}</p>);
  });

  flushList("list-final");

  return (
    <div className="prose-content">
      {nodes}
      <div className="mt-10 rounded-lg border border-[#d9e2ec] bg-white p-6">
        <p className="text-sm font-semibold uppercase text-[#1b8a8f]">Content system</p>
        <p className="mt-3 text-sm leading-7 text-[#475467]">
          This post lives in the website-native MDX content folder and can be upgraded to full MDX rendering or a CMS-backed
          workflow without changing the public URL.
        </p>
        <Link className="mt-4 inline-flex text-sm font-semibold text-[#071527]" href="/insights">
          Back to insights
        </Link>
      </div>
    </div>
  );
}
