"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, PerspectiveCamera, Text } from "@react-three/drei";
import * as easing from "maath/easing";
import type { Group } from "three";

import {
  BOOK_LAYOUT,
  OPEN_POSE,
  PAGES,
  PLANK,
  PULL,
  SHELF_WOOD,
  type BookLayout,
  type ThemeName,
} from "./sections";
import { CAM_Y, FOV } from "./projection";

export type PullState = "rest" | "hover" | "open";

interface SceneProps {
  theme: ThemeName;
  camZ: number;
  /** Pull state per section id. */
  pulls: Record<string, PullState>;
}

const SPINE_FONT = "/fonts/IBMPlexMono-Medium.woff";

function Book3D({
  layout,
  pull,
  theme,
}: {
  layout: BookLayout;
  pull: PullState;
  theme: ThemeName;
}) {
  const group = useRef<Group>(null);
  const cover = useRef<Group>(null);
  const invalidate = useThree((state) => state.invalidate);
  const { height, thickness, depth, lean } = layout.section.book;
  const spineText = layout.section.spineLabel;

  const open = pull === "open";
  const targetZ =
    layout.z + (open ? PULL.open : pull === "hover" ? PULL.hover : 0);
  const targetY = open ? OPEN_POSE.lift : 0;
  const targetYaw = open ? OPEN_POSE.yaw : 0;
  const targetLean = open ? 0 : lean;
  const targetCover = open ? -OPEN_POSE.coverAngle : 0;

  // Targets only live inside useFrame, so a prop change alone won't make
  // the demand-mode frameloop tick — kick it manually.
  useEffect(() => invalidate(), [pull, invalidate]);

  useFrame((_, delta) => {
    const g = group.current;
    const c = cover.current;
    if (!g || !c) return;
    const smooth = pull === "rest" ? 0.22 : 0.16;
    let moving = easing.damp3(
      g.position,
      [layout.x, targetY, targetZ],
      smooth,
      delta,
    );
    moving = easing.damp(g.rotation, "y", targetYaw, smooth, delta) || moving;
    moving = easing.damp(g.rotation, "z", targetLean, smooth, delta) || moving;
    moving =
      easing.damp(c.rotation, "y", targetCover, open ? 0.24 : 0.16, delta) ||
      moving;
    if (moving) invalidate();
  });

  const spine = layout.section.spine[theme];
  const band = layout.section.band[theme];
  const ink = layout.section.ink[theme];
  const pages = PAGES[theme];

  // Thin panels so the front cover can hinge open around the spine edge.
  const coverThk = Math.min(0.05, thickness * 0.14);
  const pagesW = thickness - 2 * coverThk;

  // Emboss bands: top at 84% of height (0.065 tall), bottom at 13% (0.04 tall).
  // Size and center the title strictly in the clear gap between them.
  const TOP_BAND_Y = 0.84;
  const TOP_BAND_H = 0.065;
  const BOTTOM_BAND_Y = 0.13;
  const BOTTOM_BAND_H = 0.04;
  const topBandBottom = height * TOP_BAND_Y - TOP_BAND_H / 2;
  const bottomBandTop = height * BOTTOM_BAND_Y + BOTTOM_BAND_H / 2;
  const gapPad = height * 0.04;
  const usableHeight = Math.max(0.2, topBandBottom - bottomBandTop - gapPad * 2);
  const textMidY = (topBandBottom + bottomBandTop) / 2;
  const letterSpacing = 0.08;
  // IBM Plex Mono advance ≈ 0.6em; letterSpacing is in ems between glyphs.
  const chars = spineText.length;
  const advance = chars * 0.6 + Math.max(0, chars - 1) * letterSpacing;
  const fontSize = Math.min(thickness * 0.42, usableHeight / advance);

  return (
    <group
      ref={group}
      position={[layout.x, 0, layout.z]}
      rotation={[0, 0, lean]}
    >
      {/* Back cover (-x side) */}
      <mesh position={[-thickness / 2 + coverThk / 2, height / 2, 0]}>
        <boxGeometry args={[coverThk, height, depth]} />
        <meshStandardMaterial color={spine} roughness={0.58} />
      </mesh>
      {/* Spine panel (+z face, toward the camera at rest) */}
      <mesh position={[0, height / 2, depth / 2 - coverThk / 2]}>
        <boxGeometry args={[thickness, height, coverThk]} />
        <meshStandardMaterial color={spine} roughness={0.58} />
      </mesh>
      {/* Page block between the covers, inset from the spine */}
      <mesh position={[0, (height * 0.97) / 2, -coverThk / 2 - 0.01]}>
        <boxGeometry args={[pagesW, height * 0.97, depth - coverThk - 0.05]} />
        <meshStandardMaterial color={pages} roughness={0.95} />
      </mesh>
      {/* Front cover, hinged at the spine edge (+x, +z vertical edge) */}
      <group ref={cover} position={[thickness / 2, 0, depth / 2 - coverThk]}>
        <mesh position={[-coverThk / 2, height / 2, -(depth - coverThk) / 2]}>
          <boxGeometry args={[coverThk, height, depth - coverThk]} />
          <meshStandardMaterial color={spine} roughness={0.58} />
        </mesh>
      </group>
      {/* Emboss-like bands across the spine */}
      <mesh position={[0, height * 0.84, depth / 2 + 0.005]}>
        <boxGeometry args={[thickness * 1.004, 0.065, 0.012]} />
        <meshStandardMaterial color={band} roughness={0.5} />
      </mesh>
      <mesh position={[0, height * 0.13, depth / 2 + 0.005]}>
        <boxGeometry args={[thickness * 1.004, 0.04, 0.012]} />
        <meshStandardMaterial color={band} roughness={0.5} />
      </mesh>
      {/* Section title running down the spine, between the emboss bands */}
      <Text
        font={SPINE_FONT}
        fontSize={fontSize}
        color={ink}
        anchorX="center"
        anchorY="middle"
        letterSpacing={letterSpacing}
        maxWidth={usableHeight}
        position={[0, textMidY, depth / 2 + 0.006]}
        rotation={[0, 0, -Math.PI / 2]}
        onSync={() => invalidate()}
      >
        {spineText.toUpperCase()}
      </Text>
    </group>
  );
}

function Shelf({ theme }: { theme: ThemeName }) {
  return (
    <mesh position={[0, PLANK.y, PLANK.z]}>
      <boxGeometry args={[PLANK.width, PLANK.height, PLANK.depth]} />
      <meshStandardMaterial color={SHELF_WOOD[theme]} roughness={0.82} />
    </mesh>
  );
}

function Lights({ theme }: { theme: ThemeName }) {
  const dark = theme === "dark";
  return (
    <>
      <ambientLight intensity={dark ? 0.5 : 0.8} />
      <directionalLight
        position={[2.5, 4.5, 3.5]}
        intensity={dark ? 0.85 : 1.15}
      />
      <directionalLight
        position={[-3, 2, 1.5]}
        intensity={dark ? 0.3 : 0.25}
        color={dark ? "#c4b5fd" : "#ffffff"}
      />
    </>
  );
}

export function BookshelfScene({ theme, camZ, pulls }: SceneProps) {
  const shadow = useMemo(
    () =>
      theme === "dark"
        ? { color: "#000000", opacity: 0.6 }
        : { color: "#3b2c4a", opacity: 0.32 },
    [theme],
  );

  return (
    <Canvas
      frameloop="demand"
      flat
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <PerspectiveCamera
        makeDefault
        fov={FOV}
        position={[0, CAM_Y, camZ]}
        near={0.1}
        far={40}
      />
      <Lights theme={theme} />
      <Shelf theme={theme} />
      {BOOK_LAYOUT.map((layout) => (
        <Book3D
          key={layout.section.id}
          layout={layout}
          pull={pulls[layout.section.id] ?? "rest"}
          theme={theme}
        />
      ))}
      <ContactShadows
        position={[0, PLANK.y - PLANK.height / 2 - 0.06, PLANK.z]}
        scale={7.5}
        blur={2.4}
        far={2.4}
        resolution={512}
        color={shadow.color}
        opacity={shadow.opacity}
      />
    </Canvas>
  );
}
