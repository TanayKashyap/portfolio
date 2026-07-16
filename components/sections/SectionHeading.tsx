import { Reveal } from "@/components/reveal";

interface SectionHeadingProps {
  /** id for the heading, referenced by the section's aria-labelledby. */
  headingId: string;
  /** Small mono metadata line above the title — the "data voice". */
  eyebrow: string;
  title: string;
}

/**
 * Each section now lives on its own page, so the section title is that
 * page's <h1>.
 */
export function SectionHeading({
  headingId,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">
        {eyebrow}
      </p>
      <h1
        id={headingId}
        className="mt-3 font-display text-3xl font-medium tracking-tight sm:text-4xl"
      >
        {title}
      </h1>
    </Reveal>
  );
}
