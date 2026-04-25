import Image from "next/image";
import { UserRound } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ProfilePortrait({ className = "" }: { className?: string }) {
  const hasPortrait = Boolean(siteConfig.portraitImage);

  return (
    <div className={`mx-auto w-full max-w-[290px] ${className}`}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-[999px] border border-white/20 bg-white/10 p-2 shadow-2xl">
        <div className="relative h-full overflow-hidden rounded-[999px] bg-[linear-gradient(160deg,rgba(255,255,255,0.18),rgba(27,138,143,0.22)),linear-gradient(180deg,#13243a,#071527)]">
          {hasPortrait ? (
            <Image
              src={siteConfig.portraitImage}
              alt="Portrait of Dr. Oluseye Fadiran"
              fill
              sizes="(min-width: 1024px) 280px, 60vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/12 text-[#8fd4d7]">
                <UserRound aria-hidden className="h-10 w-10" />
              </div>
              <p className="mt-5 text-lg font-semibold">Dr. Oluseye Fadiran</p>
              <p className="mt-2 text-sm leading-6 text-white/68">Executive technology leadership portrait placeholder</p>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-center text-xs font-semibold uppercase text-white/62">Executive portrait</p>
    </div>
  );
}
