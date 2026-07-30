import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/layout/ClientProviders";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
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
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
