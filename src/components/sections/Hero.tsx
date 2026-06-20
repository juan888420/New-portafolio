"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

// ─── Animation variants ───────────────────────────────────────────────────────

// Typed as const tuple — prevents TS from widening to number[], which breaks
// Framer Motion's EasingDefinition inference for cubic-bezier arrays.
const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.15,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: EASE_OUT_EXPO,
    },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

// ── RaycastBadge ─────────────────────────────────────────────────────────────
// The border-beam effect works in three layers (all inside overflow-hidden):
//   1. Rotating conic-gradient div (large enough to reach the pill edges)
//   2. Inset dark fill that covers the center, revealing only the border ring
//   3. Text content on top (z-10)

const BADGE_CSS = `
@keyframes raycast-rotate {
  to { transform: translate(-50%, -50%) rotate(360deg); }
}
.raycast-beam {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Oversized so the conic tip reaches all pill edges */
  width: 220%;
  height: 600%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(249,115,22,0.0) 50deg,
    rgba(249,115,22,0.55) 100deg,
    rgba(249,115,22,0.0) 160deg,
    transparent 360deg
  );
  animation: raycast-rotate 3s linear infinite;
}
`;

function RaycastBadge({ label }: { label: string }) {
  return (
    <>
      {/* Inject keyframe once — safe because it is idempotent in the browser */}
      <style>{BADGE_CSS}</style>

      {/*
        Outer shell: overflow-hidden clips the rotating beam to the pill shape.
        The 1px transparent border is overridden visually by the beam shining
        through, but keeps layout consistent and aids border-radius rendering.
      */}
      <div className="relative inline-flex items-center overflow-hidden rounded-full px-[1px] py-[1px]">

        {/* Layer 1 — rotating conic beam */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="raycast-beam" />
        </div>

        {/* Layer 2 — inner dark fill: punches a hole in the center so only
            the narrow ring at the pill border stays lit */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1px] rounded-full"
          style={{ background: "rgba(7,8,10,0.82)", backdropFilter: "blur(12px)" }}
        />

        {/* Layer 3 — text */}
        <span className="relative z-10 px-5 py-2 text-sm font-medium tracking-wide text-zinc-300">
          {label}
        </span>
      </div>
    </>
  );
}

function HairlineDivider() {
  return (
    <div
      aria-hidden="true"
      className="w-16 h-px"
      style={{
        background:
          "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent)",
      }}
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero() {
  return (
    <section
      aria-label="Introducción"
      className="relative min-h-svh flex items-center pt-32 px-6 sm:px-10 md:px-16 lg:px-24"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-2xl flex flex-col gap-6 md:gap-7"
      >
        {/* ── Role badge — border-beam pill ── */}
        <motion.div variants={item}>
          <RaycastBadge label="Software Developer" />
        </motion.div>

        {/* ── Name — split into two lines for hierarchy ── */}
        <motion.div variants={item} className="flex flex-col gap-1">
          <h1 className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-50">
            Juan Pablo
          </h1>
          {/* Muted second line — same tag intentional: one semantic heading, two visual lines */}
          <p
            aria-hidden="true"
            className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-400"
          >
            Desarrollador.
          </p>
        </motion.div>

        {/* ── Divider ── */}
        <motion.div variants={item}>
          <HairlineDivider />
        </motion.div>

        {/* ── Description ── */}
        <motion.p
          variants={item}
          className="font-sans text-base sm:text-lg leading-relaxed text-zinc-400 max-w-md"
        >
          Construyo interfaces y sistemas que priorizan la claridad, el
          rendimiento y los detalles que marcan la diferencia. Enfocado en
          productos modernos con intención.
        </motion.p>

        {/* ── CTAs ── */}
        <motion.div variants={item} className="flex items-center gap-4 pt-1">
          <a
            href="#projects"
            className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium text-zinc-950 bg-zinc-50 hover:bg-white transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          >
            Ver proyectos
    
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 hover:text-zinc-100 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 rounded"
          >
            Contacto
          </a>
        </motion.div>

        {/* ── Social / availability row ── */}
        <motion.div
          variants={item}
          className="flex items-center gap-5 pt-2 border-t border-zinc-800/60"
        >
          <span className="ml-auto flex items-center gap-1.5 text-xs text-zinc-500">
            <span
              aria-hidden="true"
              className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
            />
            Disponible para proyectos
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

