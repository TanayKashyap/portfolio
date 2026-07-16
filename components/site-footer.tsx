import { site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  const links = [
    { label: "email", href: `mailto:${site.links.email}`, external: false },
    { label: "linkedin", href: site.links.linkedin, external: true },
    { label: "github", href: site.links.github, external: true },
  ];

  return (
    <footer className="border-t border-foreground/10 px-6 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="font-mono text-xs text-foreground/65">
          © {year} {site.name}
        </p>
        <ul className="flex items-center gap-6 font-mono text-xs">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="text-foreground/65 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
