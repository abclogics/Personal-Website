import Link from "next/link";
import { ExternalLink, Play } from "lucide-react";

export function VideoCard({
  title,
  description,
  videoId,
  href
}: {
  title: string;
  description: string;
  videoId: string;
  href: string;
}) {
  const hasRealVideo = !videoId.startsWith("placeholder");

  return (
    <article className="overflow-hidden rounded-lg border border-[#d9e2ec] bg-white shadow-sm">
      <div className="aspect-video bg-[#071527]">
        {hasRealVideo ? (
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,#071527,#15324a)] p-8 text-center text-white">
            <div>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white/12">
                <Play aria-hidden className="h-7 w-7" />
              </div>
              <p className="text-sm font-semibold uppercase text-[#8fd4d7]">Techfluence Signals</p>
              <p className="mt-2 text-lg font-semibold">{title}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#e7f3f3] text-[#1b8a8f]">
          <Play aria-hidden className="h-5 w-5" />
        </div>
        <h3 className="text-xl font-semibold text-[#071527]">{title}</h3>
        <p className="mt-3 text-sm leading-7 text-[#475467]">{description}</p>
        <Link className="focus-ring mt-5 inline-flex items-center gap-2 rounded-sm text-sm font-semibold text-[#071527]" href={href}>
          Watch on channel
          <ExternalLink aria-hidden className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
