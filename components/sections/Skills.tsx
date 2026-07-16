import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import { skillGroups } from "@/content/skills";

export function Skills() {
  const totalSkills = skillGroups.reduce(
    (sum, group) => sum + group.skills.length,
    0,
  );

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="skills-heading"
          eyebrow={`${totalSkills} tools · ${skillGroups.length} groups`}
          title="Skills"
        />
        <div className="mt-12 space-y-10 sm:mt-14">
          {skillGroups.map((group, index) => (
            <Reveal key={group.label} delay={index * 0.05}>
              <div className="grid gap-3 sm:grid-cols-[11rem_1fr] sm:gap-8">
                <h2 className="pt-1.5 font-mono text-xs uppercase tracking-[0.2em] text-foreground/65">
                  {group.label}
                </h2>
                <ul className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="border border-foreground/15 px-2.5 py-1 font-mono text-[13px] text-foreground/80 transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
