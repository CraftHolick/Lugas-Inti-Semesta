"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { useLocale, type Locale } from "@/lib/i18n";
import { FlagIcon } from "@/components/ui/FlagIcon";

interface LanguageSelectorDropdownProps {
  direction?: "down" | "up";
}

export function LanguageSelectorDropdown({ direction = "down" }: LanguageSelectorDropdownProps = {}) {
  const { locale, setLocale, locales, localeLabels } = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ChevronIcon = direction === "up" ? ChevronUp : ChevronDown;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium",
          "bg-white/10 backdrop-blur-md shadow-sm",
          "border-white/15",
          "text-white hover:text-accent",
          "hover:bg-white/15 transition-all"
        )}
        aria-label="Select language"
      >
        <FlagIcon locale={locale} className="w-5 h-3.5 rounded-[2px] shadow-sm shrink-0 border border-white/20" />
        <span className="hidden sm:inline font-semibold">{localeLabels[locale]}</span>
        <ChevronIcon className="h-3.5 w-3.5 opacity-80" />
      </button>

      {open && (
        <div
          className={cn(
            "absolute right-0 w-48 rounded-xl overflow-hidden z-50",
            "bg-navy-950/95 backdrop-blur-xl",
            "shadow-xl border border-white/15",
            "animate-fade-in",
            direction === "up" ? "bottom-full mb-2" : "mt-2 top-full"
          )}
        >
          {locales.map((code) => (
            <button
              key={code}
              onClick={() => {
                setLocale(code as Locale);
                setOpen(false);
              }}
              className={cn(
                "flex items-center gap-2.5 w-full px-3.5 py-2.5 text-xs sm:text-sm text-left transition-colors font-medium",
                locale === code
                  ? "font-bold text-accent bg-white/5"
                  : "text-gray-200 hover:bg-white/10 hover:text-white"
              )}
            >
              <FlagIcon locale={code} className="w-5 h-3.5 rounded-[2px] shadow-sm shrink-0 border border-white/20" />
              <span className="flex-1">{localeLabels[code as Locale]}</span>
              {locale === code && (
                <Check className="h-4 w-4 text-accent shrink-0" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
