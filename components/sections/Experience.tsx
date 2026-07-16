import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import { experience } from "@/content/experience";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="experience-heading"
          eyebrow={`${experience.length} roles · 2023 – 2025`}
          title="Work Experience"
        />
        <ol className="mt-12 space-y-16 border-l border-accent-soft sm:mt-16">
          {experience.map((role, index) => (
            <li
              key={`${role.company}-${role.start}`}
              className="relative pl-6 sm:pl-10"
            >
              <span
                aria-hidden="true"
                className="absolute top-2 -left-[4.5px] h-2 w-2 rounded-full bg-accent ring-4 ring-background"
              />
              <Reveal delay={index === 0 ? 0.08 : 0}>
                <h2 className="font-display text-xl font-medium tracking-tight sm:text-2xl">
                  {role.company}
                </h2>
                <p className="mt-1.5 font-mono text-sm text-foreground/70">
                  {role.title}
                </p>
                <p className="mt-1 font-mono text-xs text-foreground/65">
                  {role.start} – {role.end} · {role.location}
                </p>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/80">
                  {role.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3">
                      <span aria-hidden="true" className="text-accent">
                        —
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <ul
                  aria-label={`Headline numbers at ${role.company}`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {role.metrics.map((metric) => (
                    <li
                      key={metric}
                      className="border border-accent/30 bg-accent-soft/20 px-2.5 py-0.5 font-mono text-xs tabular-nums text-accent"
                    >
                      {metric}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
