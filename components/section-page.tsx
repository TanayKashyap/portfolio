import Link from "next/link";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

/** Shared frame for the standalone section pages. */
export function SectionPage({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <div className="mx-auto max-w-3xl px-6 pt-10">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 font-mono text-xs text-foreground/65 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span
              aria-hidden="true"
              className="inline-block transition-transform group-hover:-translate-x-1 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
            >
              ←
            </span>
            Back to the shelf
          </Link>
        </div>
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
