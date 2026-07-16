import { Reveal } from "@/components/reveal";
import { SectionHeading } from "./SectionHeading";
import { site } from "@/content/site";

const stripProtocol = (url: string) => url.replace(/^https?:\/\//, "");

export function Contact() {
  const channels = [
    {
      label: "Email",
      value: site.links.email,
      href: `mailto:${site.links.email}`,
      external: false,
    },
    {
      label: "LinkedIn",
      value: stripProtocol(site.links.linkedin),
      href: site.links.linkedin,
      external: true,
    },
    {
      label: "GitHub",
      value: stripProtocol(site.links.github),
      href: site.links.github,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 px-6 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          headingId="contact-heading"
          eyebrow="3 ways to reach me"
          title="Contact"
        />
        <Reveal delay={0.08}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/75 sm:text-lg">
            Email is the fastest way to reach me. I&apos;m always happy to talk
            data, statistics, or books.
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <ul className="mt-10 divide-y divide-foreground/10 border-y border-foreground/10">
            {channels.map((channel) => (
              <li key={channel.label}>
                <a
                  href={channel.href}
                  {...(channel.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex flex-col gap-1 py-6 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.25em] text-foreground/65">
                    {channel.label}
                  </span>
                  <span className="font-display text-lg tracking-tight break-all transition-colors group-hover:text-accent sm:text-2xl">
                    {channel.value}{" "}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
                    >
                      →
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
