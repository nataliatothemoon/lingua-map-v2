import type { Metadata } from "next";
import Link from "next/link";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Lingua Map — TCM Tongue Diagnostics",
  description:
    "Educational TCM-inspired tongue map analysis with guided capture, intake, and lifestyle-oriented insights.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <div className="mx-auto min-h-screen w-full max-w-5xl px-4 pb-16 pt-6 sm:px-6">
          <header className="mb-8 flex items-center justify-between gap-4">
            <Link href="/" className="font-[family-name:var(--font-display)] text-xl tracking-tight text-[var(--ink)]">
              Lingua Map
            </Link>
            <nav className="flex items-center gap-3 text-sm text-[var(--ink-muted)]">
              <Link href="/assess" className="hover:text-[var(--ink)]">
                Assess
              </Link>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
