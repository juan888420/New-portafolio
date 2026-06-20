"use client";

import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const links = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <header className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/60 px-3 py-2 shadow-lg backdrop-blur-2xl">
        {/* Logo */}
        <Link
          href="/"
          className="rounded-full px-4 py-2 text-sm font-medium text-zinc-100 transition-colors hover:bg-white/5"
        >
          JP
        </Link>

        {/* Separador */}
        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Links */}
        <div className="flex items-center gap-1">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Separador */}
        <div className="mx-1 h-5 w-px bg-white/10" />

        {/* Redes */}
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/juan888420"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
          >
            <FaGithub size={18} />
          </a>

          <a
            href="https://www.linkedin.com/in/juanpurr"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 text-zinc-400 transition-all duration-200 hover:bg-white/5 hover:text-zinc-100"
          >
            <FaLinkedin size={18} />
          </a>
        </div>
      </nav>
    </header>
  );
}