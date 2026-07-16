import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import { extracurricular } from "@/content/extracurricular";

export function Extracurricular() {
  return (
    <section
      id="extracurricular"
      aria-labelledby="extracurricular-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="extracurricular-heading"
          eyebrow="Beyond the co-op terms"
          title="Extracurricular"
        />
        <div className="mt-10 space-y-12 sm:mt-12">
          {extracurricular.map((item) => (
            <Reveal key={`${item.organization}-${item.role}`} delay={0.08}>
              <h2 className="font-display text-lg font-medium tracking-tight sm:text-xl">
                {item.organization}
              </h2>
              <p className="mt-1.5 font-mono text-sm text-foreground/70">
                {item.role}
              </p>
              <p className="mt-1 font-mono text-xs text-foreground/65">
                {item.start} – {item.end}
              </p>
              <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-foreground/70">
                {item.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span aria-hidden="true" className="text-accent-soft">
                      —
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
