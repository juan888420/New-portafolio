"use client";

import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function Container({
  children,
  className = "",
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-6 sm:px-10 md:px-10 lg:px-12 ${className}`}
    >
      {children}
    </div>
  );
}