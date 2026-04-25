export function TestimonialCard({
  quote,
  name,
  role
}: {
  quote: string;
  name: string;
  role: string;
}) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
      <p className="text-4xl leading-none text-[#1b8a8f]">"</p>
      <blockquote className="mt-2 flex-1 text-base leading-8 text-[#344054]">{quote}</blockquote>
      <div className="mt-6 border-t border-[#d9e2ec] pt-5">
        <p className="font-semibold text-[#071527]">{name}</p>
        <p className="mt-1 text-sm text-[#667085]">{role}</p>
      </div>
    </article>
  );
}
