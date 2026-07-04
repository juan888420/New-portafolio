import Container from "@/components/layout/Container";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.06] bg-[#09090b]">
      <Container>
        <div className="flex flex-col items-center gap-2 py-8 text-center sm:grid sm:grid-cols-3 sm:items-center sm:gap-0">
          {/* Monograma */}
          <div className="flex items-center gap-2 sm:justify-self-start">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#f97316]" />
            <span className="text-sm font-semibold tracking-tight text-zinc-100">
              JP
            </span>
          </div>

          {/* Copyright — centrado exacto respecto a la página */}
          <p className="text-[12px] text-zinc-500 sm:justify-self-center">
            © {year} Juan Pablo Urrego
          </p>

          {/* Stack */}
          <p className="font-mono text-[11px] tracking-wide text-zinc-600 sm:justify-self-end">
            Construido con Next.js
          </p>
        </div>
      </Container>
    </footer>
  );
}
