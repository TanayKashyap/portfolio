import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="about-heading"
          eyebrow="BMath Statistics · April 2026"
          title="About"
        />
        <Reveal delay={0.08}>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/80 sm:text-lg">
            <p>
              I&apos;m Tanay, a data scientist finishing my Bachelor of
              Mathematics in Statistics at the University of Waterloo. I
              graduate in April 2026.
            </p>
            <p>
              Across four internships — data science at PepsiCo, data science
              and data analytics at RBC, and machine learning at Magnet
              Forensics — I&apos;ve forecasted market share, built
              recommendation and NLP models, and worked on the pipelines that
              keep all of it reliable in production.
            </p>
            <p>
              On campus I was the VP of Education at the Data Science Club,
              where I coordinated applied AI projects with 20+ student
              contributors.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
