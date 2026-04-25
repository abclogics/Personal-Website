export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase text-[#1b8a8f]">{eyebrow}</p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-normal text-[#071527] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-[#475467]">{description}</p> : null}
    </div>
  );
}
