"use client";

import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { SECTION_PREVIEWS } from "@/content/previews";
import { withBasePath } from "@/lib/paths";
import type { ShelfSection, ThemeName } from "./sections";

interface BookPreviewProps {
  /** The section whose book is currently open, or null. */
  section: ShelfSection | null;
  theme: ThemeName;
  onClose: () => void;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Open-book preview dialog, shown over the canvas while the 3D book is in
 * its open pose. Structured summary + a link to the section's full page.
 *
 * The CTA is a plain <a> (not next/link). Next.js 16 static export has a
 * known bug where Link + prefetch can no-op on click; a real anchor always
 * navigates to the prebuilt HTML page.
 */
export function BookPreview({ section, theme, onClose }: BookPreviewProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Focus the panel when it opens; restore focus when it closes.
  useEffect(() => {
    if (!section) return;
    const previous = document.activeElement as HTMLElement | null;
    const frame = requestAnimationFrame(() => {
      panelRef.current
        ?.querySelector<HTMLElement>("[data-autofocus]")
        ?.focus();
    });
    return () => {
      cancelAnimationFrame(frame);
      previous?.focus?.();
    };
  }, [section]);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  const preview = section ? SECTION_PREVIEWS[section.id] : null;

  return (
    <AnimatePresence>
      {section && preview && (
        <motion.div
          key={section.id}
          className="absolute inset-0 z-20 flex items-center justify-center p-3 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          onKeyDown={handleKeyDown}
        >
          {/* Backdrop — click to slide the book back in */}
          <motion.button
            type="button"
            aria-label="Close preview"
            tabIndex={-1}
            className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-[2px]"
            onClick={onClose}
            initial={false}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} preview`}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg shadow-2xl ring-1 ring-foreground/15"
            initial={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.32,
              delay: reduceMotion ? 0 : 0.22,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Two paper pages with a center crease, like the open book */}
            <div className="grid bg-[#F6F1E2] text-[#1B1725] sm:grid-cols-2 dark:bg-[#1E182D] dark:text-[#E9E4F5]">
              {/* Left page — title */}
              <div className="relative px-6 py-6 sm:px-7 sm:py-8">
                <span
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-1 w-full"
                  style={{ backgroundColor: section.spine[theme] }}
                />
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                  {preview.kicker}
                </p>
                <h2 className="mt-3 font-display text-2xl font-medium tracking-tight sm:text-3xl">
                  {preview.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed opacity-80">
                  {preview.blurb}
                </p>
              </div>

              {/* Right page — structured facts + CTA */}
              <div className="flex flex-col border-t border-foreground/15 px-6 py-6 sm:border-t-0 sm:border-l sm:px-7 sm:py-8 dark:border-white/10">
                <dl className="space-y-3">
                  {preview.facts.map((fact) => (
                    <div key={`${fact.label}-${fact.value}`}>
                      <dt className="font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
                        {fact.label}
                      </dt>
                      <dd className="mt-0.5 text-sm leading-snug font-medium">
                        {fact.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={withBasePath(section.href)}
                  data-autofocus
                  className="mt-6 inline-flex items-center justify-center gap-2 self-start bg-accent px-5 py-2.5 font-mono text-sm text-white transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:text-[#120F1A]"
                >
                  {preview.cta} →
                </a>
              </div>
            </div>

            <button
              type="button"
              aria-label="Close preview"
              onClick={onClose}
              className="absolute top-2.5 right-2.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-current opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-accent"
            >
              <svg
                aria-hidden="true"
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M2 2l10 10M12 2L2 12" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
