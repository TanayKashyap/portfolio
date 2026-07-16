import Link from "next/link";

import { SHELF_SECTIONS } from "./sections";

/**
 * Flat CSS-only fallback for reduced motion and small screens: the seven
 * books as a pile of horizontal spines on a shelf plank. Pure DOM, safe to
 * server-render, no Canvas. Each spine links straight to its section page.
 */

/** Deterministic per-book x offsets so the pile feels hand-stacked. */
const OFFSETS = [-8, 5, -3, 9, -6, 2, -4];
const MAX_HEIGHT = Math.max(...SHELF_SECTIONS.map((s) => s.book.height));

export function SpineList() {
  return (
    <nav aria-label="Bookshelf sections" className="w-full py-6">
      <div className="mx-auto flex w-full max-w-95 flex-col items-center">
        <ul className="flex w-full flex-col items-center gap-1">
          {SHELF_SECTIONS.map((section, i) => (
            <li
              key={section.id}
              className="flex w-full justify-center"
              style={{
                width: `${(section.book.height / MAX_HEIGHT) * 100}%`,
                transform: `translateX(${OFFSETS[i % OFFSETS.length]}px)`,
              }}
            >
              <Link
                href={section.href}
                className={`${section.spineClass} ${section.inkClass} relative flex min-h-10 w-full cursor-pointer items-center justify-center overflow-hidden rounded-[3px] px-8 shadow-sm outline-none motion-safe:transition-transform motion-safe:duration-200 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-safe:hover:-translate-x-1.5`}
              >
                {/* Band details near the ends of the spine */}
                <span
                  aria-hidden
                  className={`${section.bandClass} absolute inset-y-0 left-2.5 w-1`}
                />
                <span
                  aria-hidden
                  className={`${section.bandClass} absolute inset-y-0 right-2.5 w-0.5`}
                />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
                  {section.spineLabel}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {/* Shelf plank */}
        <div
          aria-hidden
          className="mt-2 h-2.5 w-[110%] max-w-105 rounded-sm bg-shelf shadow-[0_10px_18px_-6px_rgba(27,23,37,0.45)]"
        />
      </div>
    </nav>
  );
}
