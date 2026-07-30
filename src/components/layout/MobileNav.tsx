"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ href: string; label: string }>;
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Combine nav links with Careers specifically for mobile as per requirements
  const allNavLinks = [
    ...navLinks,
    { href: "/careers", label: t("nav.careers") },
    { href: "/sitemap", label: "Peta Situs (Sitemap)" }
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-navy-950/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-navy-900 border-l border-white/10 shadow-2xl flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <Image 
            src="/luise-logo.png" 
            alt="PT Lugas Inti Semesta - LUISE" 
            width={240} 
            height={60} 
            className="h-12 w-auto object-contain" 
          />
          <button
            onClick={onClose}
            className="p-2 text-light opacity-60 hover:text-accent hover:opacity-100 transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-6 flex flex-col gap-6">
          <nav className="flex flex-col gap-4">
            {allNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={cn(
                  "text-lg font-medium transition-colors py-2 border-b border-white/5",
                  pathname === link.href ? "text-accent" : "text-white hover:text-accent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-6 flex flex-col gap-6 border-t border-white/10">
            <div>
              <LanguageSelectorDropdown />
            </div>
            
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full text-center bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-full transition-all active:scale-95"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
