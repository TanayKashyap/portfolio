"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SHELF_SECTIONS } from "@/components/bookshelf/sections";

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav aria-label="Sections" className="hidden md:block">
      <ul className="flex flex-wrap items-center justify-end gap-x-5 gap-y-2 font-mono text-xs">
        {SHELF_SECTIONS.map((section) => {
          const current = pathname === section.href;
          return (
            <li key={section.id}>
              <Link
                href={section.href}
                aria-current={current ? "page" : undefined}
                className={`transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${
                  current
                    ? "text-accent"
                    : "text-foreground/65 hover:text-accent"
                }`}
              >
                {section.spineLabel.toLowerCase()}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
