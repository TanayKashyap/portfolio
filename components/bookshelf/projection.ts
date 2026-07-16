import { PULL, type BookLayout } from "./sections";

/**
 * The camera is axis-aligned (no rotation, looking down -z), which lets us
 * mirror its perspective projection with simple math. The DOM overlay
 * (accessible buttons + floating labels) uses these helpers so it stays
 * registered with the 3D render at any container size.
 */
export const FOV = 30;
export const CAM_Y = 1.05;

const HALF_FOV_TAN = Math.tan((FOV * Math.PI) / 360);
/** Half-width (world units) that must be visible at the z = 0 plane. */
const FIT_HALF_WIDTH = 2.75;

/** Dolly the camera back on narrow containers so the shelf always fits. */
export function cameraDistance(aspect: number): number {
  if (!aspect || !Number.isFinite(aspect)) return 6.2;
  return Math.min(9.5, Math.max(6.2, FIT_HALF_WIDTH / (HALF_FOV_TAN * aspect)));
}

export interface FractionPoint {
  /** 0..1 from the left edge of the canvas. */
  x: number;
  /** 0..1 from the top edge of the canvas. */
  y: number;
}

export interface FractionRect {
  left: number;
  top: number;
  width: number;
  height: number;
}

export function projectPoint(
  x: number,
  y: number,
  z: number,
  aspect: number,
  camZ: number,
): FractionPoint {
  const dz = Math.max(camZ - z, 0.001);
  const halfH = HALF_FOV_TAN * dz;
  const halfW = halfH * aspect;
  return { x: 0.5 + x / (2 * halfW), y: 0.5 - (y - CAM_Y) / (2 * halfH) };
}

/** Screen-space rect of a book's front (spine) face in its rest pose. */
export function projectBookRect(
  layout: BookLayout,
  aspect: number,
  camZ: number,
): FractionRect {
  const { height, thickness, depth, lean } = layout.section.book;
  const zFront = layout.z + depth / 2;

  // Books lean around their bottom edge; expand the rect toward the lean.
  const topShift = -Math.sin(lean) * height;
  const x0 = layout.x - thickness / 2 + Math.min(0, topShift);
  const x1 = layout.x + thickness / 2 + Math.max(0, topShift);
  const yTop = height * Math.cos(lean);

  const a = projectPoint(x0, yTop, zFront, aspect, camZ);
  const b = projectPoint(x1, 0, zFront, aspect, camZ);
  return { left: a.x, top: a.y, width: b.x - a.x, height: b.y - a.y };
}

/** Anchor point for the floating label, above the book in its hover pose. */
export function projectLabelPoint(
  layout: BookLayout,
  aspect: number,
  camZ: number,
): FractionPoint {
  const { height, depth, lean } = layout.section.book;
  const zFront = layout.z + depth / 2 + PULL.hover;
  return projectPoint(layout.x, height * Math.cos(lean) + 0.16, zFront, aspect, camZ);
}
