/**
 * Section metadata for the bookshelf navigation.
 *
 * Spine colors are a constrained palette from the design plan:
 * violet #7C3AED, lilac #C4B5FD, deep plum #2A2140, plus muted neutrals
 * (graphite, taupe, mauve) so the shelf reads as one object.
 *
 * `spineClass` / `inkClass` / `bandClass` are literal Tailwind classes for the
 * 2D fallback and MUST stay in sync with the hex values used by the 3D scene.
 */

export type ThemeName = "light" | "dark";

export interface ThemedColor {
  light: string;
  dark: string;
}

export interface BookDimensions {
  /** World units. Shelf top is y = 0; books stand on it. */
  height: number;
  /** Spine width along x. */
  thickness: number;
  /** Page depth along z. */
  depth: number;
  /** z-axis rotation in radians (negative tips the top toward +x). */
  lean: number;
  /** Small per-book z offset so spines aren't perfectly flush. */
  setback: number;
  /** Extra horizontal gap after this book (room for leaning). */
  gapAfter?: number;
}

export interface ShelfSection {
  id: string;
  /** Full name — hover labels, aria, preview titles. */
  label: string;
  /** Short title printed on the spine (must fit between the emboss bands). */
  spineLabel: string;
  /** Route the book navigates to. */
  href: string;
  spine: ThemedColor;
  band: ThemedColor;
  /** Spine title color for the 3D text — mirrors `inkClass`. */
  ink: ThemedColor;
  spineClass: string;
  inkClass: string;
  bandClass: string;
  book: BookDimensions;
}

export const SHELF_SECTIONS: ShelfSection[] = [
  {
    id: "about",
    label: "About",
    spineLabel: "About",
    href: "/about",
    spine: { light: "#7C3AED", dark: "#8B5CF6" },
    band: { light: "#C4B5FD", dark: "#C4B5FD" },
    ink: { light: "#F3EFFB", dark: "#F3EFFB" },
    spineClass: "bg-[#7C3AED] dark:bg-[#8B5CF6]",
    inkClass: "text-[#F3EFFB]",
    bandClass: "bg-[#C4B5FD]",
    book: { height: 2.05, thickness: 0.42, depth: 1.26, lean: 0, setback: 0.02 },
  },
  {
    id: "experience",
    label: "Work Experience",
    spineLabel: "Experience",
    href: "/experience",
    spine: { light: "#2A2140", dark: "#352A52" },
    band: { light: "#7C3AED", dark: "#8B5CF6" },
    ink: { light: "#C9BCF2", dark: "#C9BCF2" },
    spineClass: "bg-[#2A2140] dark:bg-[#352A52]",
    inkClass: "text-[#C9BCF2]",
    bandClass: "bg-[#7C3AED] dark:bg-[#8B5CF6]",
    book: { height: 2.15, thickness: 0.5, depth: 1.32, lean: 0, setback: -0.02 },
  },
  {
    id: "projects",
    label: "Projects",
    spineLabel: "Projects",
    href: "/projects",
    spine: { light: "#C4B5FD", dark: "#C4B5FD" },
    band: { light: "#2A2140", dark: "#2A2140" },
    ink: { light: "#2A2140", dark: "#2A2140" },
    spineClass: "bg-[#C4B5FD]",
    inkClass: "text-[#2A2140]",
    bandClass: "bg-[#2A2140]",
    book: {
      height: 1.78,
      thickness: 0.32,
      depth: 1.18,
      lean: -0.06,
      setback: 0.03,
      gapAfter: 0.12,
    },
  },
  {
    id: "skills",
    label: "Skills",
    spineLabel: "Skills",
    href: "/skills",
    spine: { light: "#453E52", dark: "#4E4662" },
    band: { light: "#9C92AB", dark: "#9C92AB" },
    ink: { light: "#E4DEF0", dark: "#E4DEF0" },
    spineClass: "bg-[#453E52] dark:bg-[#4E4662]",
    inkClass: "text-[#E4DEF0]",
    bandClass: "bg-[#9C92AB]",
    book: { height: 1.96, thickness: 0.44, depth: 1.28, lean: 0, setback: 0 },
  },
  {
    id: "extracurricular",
    label: "Extracurricular",
    spineLabel: "Club",
    href: "/extracurricular",
    spine: { light: "#A08F7B", dark: "#8A7B69" },
    band: { light: "#2A2140", dark: "#2A2140" },
    ink: { light: "#2A2318", dark: "#221D14" },
    spineClass: "bg-[#A08F7B] dark:bg-[#8A7B69]",
    inkClass: "text-[#2A2318]",
    bandClass: "bg-[#2A2140]",
    book: {
      height: 1.72,
      thickness: 0.3,
      depth: 1.14,
      lean: 0,
      setback: 0.04,
      gapAfter: 0.06,
    },
  },
  {
    id: "books",
    label: "Book Reviews",
    spineLabel: "Reviews",
    href: "/books",
    spine: { light: "#9C92AB", dark: "#756B8A" },
    band: { light: "#2A2140", dark: "#2A2140" },
    ink: { light: "#221D2E", dark: "#F0EBF7" },
    spineClass: "bg-[#9C92AB] dark:bg-[#756B8A]",
    inkClass: "text-[#221D2E] dark:text-[#F0EBF7]",
    bandClass: "bg-[#2A2140]",
    book: { height: 1.88, thickness: 0.4, depth: 1.22, lean: 0.035, setback: -0.01 },
  },
  {
    id: "contact",
    label: "Contact",
    spineLabel: "Contact",
    href: "/contact",
    spine: { light: "#7C3AED", dark: "#8B5CF6" },
    band: { light: "#C4B5FD", dark: "#C4B5FD" },
    ink: { light: "#F3EFFB", dark: "#F3EFFB" },
    spineClass: "bg-[#7C3AED] dark:bg-[#8B5CF6]",
    inkClass: "text-[#F3EFFB]",
    bandClass: "bg-[#C4B5FD]",
    book: { height: 1.66, thickness: 0.28, depth: 1.1, lean: 0, setback: 0.03 },
  },
];

export const SECTION_IDS = SHELF_SECTIONS.map((s) => s.id);

/** Page-block color (visible on top faces of the books). */
export const PAGES: ThemedColor = { light: "#EDE6D6", dark: "#CFC6B2" };

/** Shelf wood — mirrors the `--shelf` token in app/globals.css. */
export const SHELF_WOOD: ThemedColor = { light: "#8A6748", dark: "#5C4433" };

/** Shelf plank dimensions in world units. */
export const PLANK = { width: 4.4, height: 0.18, depth: 1.66, y: -0.09, z: 0.02 };

/** How far a book slides toward the camera (world units, +z). */
export const PULL = { hover: 0.4, full: 1.0, open: 1.55 };

/** Pose of an opened book: floats up, yaws to face the camera. */
export const OPEN_POSE = {
  /** Extra lift off the shelf (world units, +y). */
  lift: 0.35,
  /** Yaw so the front cover faces the camera (radians). */
  yaw: -Math.PI / 2,
  /** How far the front cover swings around its spine hinge (radians). */
  coverAngle: 2.0,
};

export interface BookLayout {
  section: ShelfSection;
  /** Center x of the book. */
  x: number;
  /** Center z of the book at rest. */
  z: number;
}

const GAP = 0.055;
const BOOK_BACK_Z = PLANK.z - PLANK.depth / 2 + 0.06;

function computeLayout(): BookLayout[] {
  let cursor = 0;
  const raw = SHELF_SECTIONS.map((section) => {
    const { thickness, depth, setback, gapAfter = 0 } = section.book;
    const x = cursor + thickness / 2;
    cursor += thickness + GAP + gapAfter;
    return { section, x, z: BOOK_BACK_Z + depth / 2 + setback };
  });
  const totalWidth = cursor - GAP;
  return raw.map((b) => ({ ...b, x: b.x - totalWidth / 2 }));
}

export const BOOK_LAYOUT: BookLayout[] = computeLayout();
