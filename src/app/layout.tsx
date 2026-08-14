import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: "../fonts/Inter-VariableFont_wght.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "100 900",
  adjustFontFallback: false,
});

const manrope = localFont({
  src: "../fonts/Manrope-VariableFont_wght.woff2",
  variable: "--font-heading",
  display: "swap",
  weight: "200 800",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "PT Lugas Inti Semesta | Exploration & Mine Management Consultant",
    template: "%s | PT Lugas Inti Semesta",
  },
  description:
    "PT Lugas Inti Semesta (LUISE) — Konsultan Eksplorasi & Manajemen Pertambangan. Berdiri sejak 2014, berizin IUJP No. 738/1/IUJP/PMDN/2021, beroperasi di 8 provinsi Indonesia. Layanan konsultasi geologi, geoteknik, hidrologi, lingkungan, dan kontraktor pertambangan.",
  keywords: [
    "konsultan pertambangan",
    "exploration consultant",
    "mine management",
    "konsultasi geologi",
    "geoteknik",
    "hidrologi",
    "AMDAL",
    "RKAB",
    "studi kelayakan tambang",
    "PT Lugas Inti Semesta",
    "LUISE",
    "Kalimantan",
    "Indonesia",
  ],
  authors: [{ name: "PT Lugas Inti Semesta" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "PT Lugas Inti Semesta",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${manrope.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-white text-text-dark">
        {children}
      </body>
    </html>
  );
}
