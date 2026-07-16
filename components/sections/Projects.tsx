import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import { projects, type Project } from "@/content/projects";
import { site } from "@/content/site";

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full flex-col border border-foreground/10 p-6 transition-colors hover:border-accent/40">
      <h2 className="font-display text-lg font-medium tracking-tight">
        {project.title}
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-foreground/75">
        {project.description}
      </p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="border border-foreground/15 px-2 py-0.5 font-mono text-xs text-foreground/70"
          >
            {tag}
          </li>
        ))}
      </ul>
      {project.links.length > 0 && (
        <ul className="mt-auto flex flex-wrap gap-4 pt-5">
          {project.links.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-sm text-accent underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {link.label} ↗
              </a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function EmptyState() {
  return (
    <div className="mt-10 border border-dashed border-accent/40 bg-accent-soft/10 px-6 py-14 text-center sm:px-12">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        No write-ups yet
      </p>
      <p className="mt-4 font-display text-xl tracking-tight sm:text-2xl">
        Projects are on their way.
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/70">
        I&apos;m writing them up before they go here. Until then, the work in
        progress is on GitHub.
      </p>
      <a
        href={site.links.github}
        target="_blank"
        rel="noreferrer"
        className="mt-7 inline-flex items-center gap-2 border border-accent/40 px-5 py-2.5 font-mono text-sm text-accent transition-colors hover:bg-accent hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Browse GitHub ↗
      </a>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="projects-heading"
          eyebrow="Write-ups in progress"
          title="Projects"
        />
        {projects.length === 0 ? (
          <Reveal delay={0.08}>
            <EmptyState />
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <Reveal key={project.title} delay={index * 0.05}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
