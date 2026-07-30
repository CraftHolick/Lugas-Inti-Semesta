"use client";

import { I18nProvider } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <I18nProvider>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </I18nProvider>
    </ThemeProvider>
  );
}
