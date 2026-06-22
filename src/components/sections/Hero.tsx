"use client";

import { motion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import Container from "@/components/layout/Container";

// ─── Animation variants ───────────────────────────────────────────────────────

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

// ─── RaycastBadge ─────────────────────────────────────────────────────────────
// Orange neon ring via box-shadow (single, no double border).
// White spark travels the perimeter via SVG stroke-dashoffset animation.
// Three SVG layers: diffused halo, tight core trail, white-hot spark head.

function RaycastBadge({
  leftText,
}: {
  leftText: string;
}) {
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const pill = pillRef.current;
    if (!pill) return;

    function buildSVG() {
      if (!pill) return;
      const old = pill.querySelector("svg");
      if (old) old.remove();

      const W = pill.offsetWidth;
      const H = pill.offsetHeight;
      const r = H / 2;
      const perim = Math.PI * 2 * r + 2 * (W - 2 * r);

      const SPARK       = perim * 0.011;
      const SPARK_GAP   = perim - SPARK;
      const TRAIL       = perim * 0.08;
      const TRAIL_GAP   = perim - TRAIL;
      const DUR         = (perim / 160).toFixed(2) + "s";
      const SPARK_OFFSET = -(TRAIL * 0.88);

      const path = [
        `M ${W / 2} 0`,
        `L ${W - r} 0`,
        `A ${r} ${r} 0 0 1 ${W - r} ${H}`,
        `L ${r} ${H}`,
        `A ${r} ${r} 0 0 1 ${r} 0`,
        `Z`,
      ].join(" ");

      const ns = "http://www.w3.org/2000/svg";
      const svg = document.createElementNS(ns, "svg");
      svg.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:2;";
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
      svg.setAttribute("aria-hidden", "true");

      svg.innerHTML = `
        <defs>
          <filter id="rp-white-halo" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3"  result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="6"  result="b2"/>
            <feMerge>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
            </feMerge>
          </filter>
          <filter id="rp-spark-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="b1"/>
            <feGaussianBlur in="SourceGraphic" stdDeviation="3.5" result="b2"/>
            <feMerge>
              <feMergeNode in="b2"/>
              <feMergeNode in="b1"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        <!-- Diffused white halo trail -->
        <path d="${path}" fill="none"
          stroke="rgba(255,255,255,0.16)" stroke-width="3" stroke-linecap="round"
          filter="url(#rp-white-halo)"
          pathLength="${perim}"
          stroke-dasharray="${TRAIL} ${TRAIL_GAP}"
          stroke-dashoffset="0">
          <animate attributeName="stroke-dashoffset"
            from="0" to="${-perim}"
            dur="${DUR}" repeatCount="indefinite" calcMode="linear"/>
        </path>

        <!-- White core trail -->
        <path d="${path}" fill="none"
          stroke="rgba(255,255,255,0.65)" stroke-width="1" stroke-linecap="round"
          pathLength="${perim}"
          stroke-dasharray="${TRAIL} ${TRAIL_GAP}"
          stroke-dashoffset="0">
          <animate attributeName="stroke-dashoffset"
            from="0" to="${-perim}"
            dur="${DUR}" repeatCount="indefinite" calcMode="linear"/>
        </path>

        <!-- White-hot spark head -->
        <path d="${path}" fill="none"
          stroke="rgba(255,255,255,0.95)" stroke-width="2" stroke-linecap="round"
          filter="url(#rp-spark-glow)"
          pathLength="${perim}"
          stroke-dasharray="${SPARK} ${SPARK_GAP}"
          stroke-dashoffset="${SPARK_OFFSET}">
          <animate attributeName="stroke-dashoffset"
            from="${SPARK_OFFSET}"
            to="${-(perim + Math.abs(SPARK_OFFSET))}"
            dur="${DUR}" repeatCount="indefinite" calcMode="linear"/>
        </path>
      `;

      pill.appendChild(svg);
    }

    buildSVG();
    window.addEventListener("resize", buildSVG, { passive: true });
    return () => window.removeEventListener("resize", buildSVG);
  }, []);

  return (
    <div
      ref={pillRef}
      className="relative inline-flex items-center rounded-full bg-[rgba(9,9,11,0.93)]"
      style={{
        boxShadow: [
          "0 0 0 1px rgba(249,115,22,0.50)",
          "0 0 7px 1px rgba(249,115,22,0.25)",
          "0 0 16px 2px rgba(249,115,22,0.10)",
        ].join(", "),
      }}
    >
      <span
        className="relative z-10 font-mono text-[11px] font-medium tracking-[0.02em] whitespace-nowrap text-orange-500/85"
        style={{ padding: "3px 14px" }}
      >
        {leftText}
      </span>
    </div>
  );
}

// ─── HairlineDivider ──────────────────────────────────────────────────────────

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
      className="relative min-h-svh flex items-center pt-32"
    >
      <Container>
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-2xl flex flex-col gap-6 md:gap-7"
        >
          {/* ── Role badge ── */}
          <motion.div variants={item}>
            <RaycastBadge leftText="Software Developer"/>
          </motion.div>

          {/* ── Name ── */}
          <motion.div variants={item} className="flex flex-col gap-1">
            <h1 className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-50">
              Juan Pablo
            </h1>
            <p
              aria-hidden="true"
              className="font-sans font-bold leading-[1.05] tracking-tight text-5xl sm:text-6xl md:text-7xl text-zinc-400"
            >
              Urrego
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

          {/* ── Availability row ── */}
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
      </Container>
    </section>
  );
}