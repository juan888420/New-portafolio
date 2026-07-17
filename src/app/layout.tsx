import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Juan Pablo Urrego | Software Developer",
  description:
    "Portfolio de Juan Pablo Urrego. Desarrollo frontend, interfaces modernas y experiencias web enfocadas en rendimiento y diseño.",
  keywords: [
    "Juan Pablo Urrego",
    "software developer",
    "frontend",
    "full-stack",
    "Next.js",
    "React",
    "TypeScript",
    "portfolio",
  ],
  authors: [{ name: "Juan Pablo Urrego" }],
  creator: "Juan Pablo Urrego",
  openGraph: {
    type: "website",
    locale: "es_ES",
    title: "Juan Pablo Urrego | Software Developer",
    description:
      "Desarrollo frontend, interfaces modernas y experiencias web enfocadas en rendimiento y diseño.",
    siteName: "Juan Pablo Urrego",
  },
  twitter: {
    card: "summary_large_image",
    title: "Juan Pablo Urrego | Software Developer",
    description:
      "Desarrollo frontend, interfaces modernas y experiencias web enfocadas en rendimiento y diseño.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es" className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} h-full antialiased bg-[#09090b]`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#09090b]">{children}</body>
    </html>
  );
}
