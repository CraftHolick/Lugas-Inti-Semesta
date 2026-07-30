"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

// Import content files
import idContent from "@/content/id.json";
import enContent from "@/content/en.json";
import zhContent from "@/content/zh.json";

export type Locale = "id" | "en" | "zh";

const contentMap: Record<Locale, Record<string, unknown>> = {
  id: idContent,
  en: enContent,
  zh: zhContent,
};

const localeLabels: Record<Locale, string> = {
  id: "Bahasa Indonesia",
  en: "English",
  zh: "中文",
};

const localeFlags: Record<Locale, string> = {
  id: "🇮🇩",
  en: "🇬🇧",
  zh: "🇨🇳",
};

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  tArray: <T = unknown>(key: string) => T[];
  tObject: <T = unknown>(key: string) => T;
  locales: Locale[];
  localeLabels: Record<Locale, string>;
  localeFlags: Record<Locale, string>;
}

const I18nContext = createContext<I18nContextType | null>(null);

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    // Set html lang attribute
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const value = getNestedValue(contentMap[locale], key);
      if (typeof value === "string") return value;
      if (typeof value === "number") return String(value);
      // Fallback to Indonesian
      if (locale !== "id") {
        const fallback = getNestedValue(contentMap["id"], key);
        if (typeof fallback === "string") return fallback;
      }
      return key; // Return key as last resort
    },
    [locale]
  );

  const tArray = useCallback(
    <T = unknown,>(key: string): T[] => {
      const value = getNestedValue(contentMap[locale], key);
      if (Array.isArray(value)) return value as T[];
      return [];
    },
    [locale]
  );

  const tObject = useCallback(
    <T = unknown,>(key: string): T => {
      const value = getNestedValue(contentMap[locale], key);
      return value as T;
    },
    [locale]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t,
        tArray,
        tObject,
        locales: ["id", "en", "zh"],
        localeLabels,
        localeFlags,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within an I18nProvider");
  }
  return context;
}

export function useLocale() {
  const { locale, setLocale, locales, localeLabels, localeFlags } = useTranslation();
  return { locale, setLocale, locales, localeLabels, localeFlags };
}
