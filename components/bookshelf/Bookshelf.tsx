"use client";

import { useMemo, useState } from "react";
import { useTheme } from "next-themes";

import { BookshelfScene, type PullState } from "./Scene";
import { BookPreview } from "./BookPreview";
import { SpineList } from "./SpineList";
import { useElementSize, useMediaQuery, useMounted } from "./hooks";
import {
  cameraDistance,
  projectBookRect,
  projectLabelPoint,
} from "./projection";
import {
  BOOK_LAYOUT,
  SECTION_IDS,
  SHELF_SECTIONS,
  type ThemeName,
} from "./sections";

export function Bookshelf() {
  const mounted = useMounted();
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const smallScreen = useMediaQuery("(max-width: 639px)");
  const { resolvedTheme } = useTheme();
  const theme: ThemeName = resolvedTheme === "dark" ? "dark" : "light";

  const [hovered, setHovered] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);
  const [opened, setOpened] = useState<string | null>(null);

  const [containerRef, size] = useElementSize<HTMLDivElement>();
  const aspect = size.height > 0 ? size.width / size.height : 2;
  const camZ = cameraDistance(aspect);

  const pulls = useMemo(() => {
    const map: Record<string, PullState> = {};
    for (const id of SECTION_IDS) {
      if (id === opened) map[id] = "open";
      else if (!opened && (id === hovered || id === focused))
        map[id] = "hover";
      else map[id] = "rest";
    }
    return map;
  }, [opened, hovered, focused]);

  // Fallback until the client knows viewport + motion preference — avoids a
  // hydration mismatch and never mounts the Canvas for reduced-motion or
  // small-screen visitors. Spines are plain links to the section pages.
  if (!mounted || reducedMotion || smallScreen) {
    return <SpineList />;
  }

  const openedSection = opened
    ? (SHELF_SECTIONS.find((s) => s.id === opened) ?? null)
    : null;

  const labelId = opened ? null : (hovered ?? focused);
  const labelLayout = labelId
    ? BOOK_LAYOUT.find((b) => b.section.id === labelId)
    : undefined;
  const labelPoint = labelLayout
    ? projectLabelPoint(labelLayout, aspect, camZ)
    : undefined;

  return (
    <div
      ref={containerRef}
      className="relative h-100 w-full sm:h-110 lg:h-120"
    >
      <BookshelfScene theme={theme} camZ={camZ} pulls={pulls} />

      {/* Accessible DOM layer: one real button per book, positioned over its
          spine via the same projection the camera uses. */}
      <nav
        aria-label="Bookshelf sections"
        className="pointer-events-none absolute inset-0"
      >
        {size.width > 0 &&
          BOOK_LAYOUT.map((layout) => {
            const rect = projectBookRect(layout, aspect, camZ);
            const { id, label } = layout.section;
            return (
              <button
                key={id}
                type="button"
                aria-label={`Preview ${label}`}
                aria-haspopup="dialog"
                aria-expanded={opened === id}
                className="pointer-events-auto absolute cursor-pointer rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                style={{
                  left: `${rect.left * 100}%`,
                  top: `${rect.top * 100}%`,
                  width: `${rect.width * 100}%`,
                  height: `${rect.height * 100}%`,
                }}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
                onFocus={() => setFocused(id)}
                onBlur={() => setFocused((f) => (f === id ? null : f))}
                onClick={() => setOpened(id)}
              />
            );
          })}

        {labelLayout && labelPoint && (
          <span
            className="pointer-events-none absolute -translate-x-1/2 -translate-y-full rounded border border-foreground/10 bg-background/85 px-2.5 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.18em] whitespace-nowrap text-foreground shadow-sm backdrop-blur-sm"
            style={{
              left: `${labelPoint.x * 100}%`,
              top: `${labelPoint.y * 100}%`,
            }}
          >
            {labelLayout.section.label}
          </span>
        )}
      </nav>

      <BookPreview
        section={openedSection}
        theme={theme}
        onClose={() => setOpened(null)}
      />
    </div>
  );
}
