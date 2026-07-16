"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "about", href: "/about" },
  { label: "work", href: "/experience" },
  { label: "projects", href: "/projects" },
  { label: "skills", href: "/skills" },
  { label: "books", href: "/books" },
  { label: "contact", href: "/contact" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sections" className="hidden md:block">
      <ul className="flex items-center gap-6 font-mono text-xs">
        {navLinks.map((link) => {
          const current = pathname === link.href;
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={current ? "page" : undefined}
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  current
                    ? "text-accent"
                    : "text-foreground/65 hover:text-accent"
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
