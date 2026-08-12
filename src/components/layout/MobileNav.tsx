"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { X, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelectorDropdown } from "@/components/ui/language-selector-dropdown";

interface SubItem {
  label: string;
  href: string;
}

interface NavLink {
  href: string;
  label: string;
  subItems?: SubItem[];
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: NavLink[];
}

export function MobileNav({ isOpen, onClose, navLinks }: MobileNavProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

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

  const toggleExpand = (href: string) => {
    setExpandedItem(prev => prev === href ? null : href);
  };

  return (
    <div className="fixed inset-0 z-50 xl:hidden">
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
        className="absolute top-0 right-0 bottom-0 w-[85%] max-w-md bg-navy-900 border-l border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-white/10">
          <Image 
            src="/luise-logo.png" 
            alt="PT Lugas Inti Semesta - LUISE" 
            width={800} 
            height={200} 
            className="h-10 sm:h-12 w-auto object-contain" 
          />
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-light opacity-60 hover:text-accent hover:opacity-100 hover:bg-white/10 transition-all"
            aria-label="Close menu"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto py-4 sm:py-6 px-5 sm:px-6 flex flex-col gap-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.subItems && pathname.startsWith(link.href) && link.href !== '/');
              const isExpanded = expandedItem === link.href;

              return (
                <div key={link.href}>
                  {/* Main link row */}
                  <div className="flex items-center">
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className={cn(
                        "flex-1 text-base sm:text-lg font-medium transition-colors py-3 px-3 rounded-lg",
                        isActive ? "text-accent bg-white/5" : "text-white hover:text-accent hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                    {link.subItems && (
                      <button
                        onClick={() => toggleExpand(link.href)}
                        className="p-3 rounded-lg text-white/60 hover:text-accent hover:bg-white/5 transition-all"
                        aria-label={`Expand ${link.label}`}
                      >
                        <ChevronDown className={cn(
                          "w-4 h-4 transition-transform duration-200",
                          isExpanded && "rotate-180"
                        )} />
                      </button>
                    )}
                  </div>

                  {/* Sub items */}
                  {link.subItems && isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 pl-3 border-l-2 border-accent/30 flex flex-col gap-0.5 mb-2"
                    >
                      {link.subItems.map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={onClose}
                          className="text-sm text-gray-400 hover:text-white py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom Section */}
          <div className="mt-auto pt-4 flex flex-col gap-4 border-t border-white/10">
            <div className="sm:hidden">
              <LanguageSelectorDropdown />
            </div>
            
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full text-center bg-accent hover:bg-accent-hover text-white font-semibold py-3 px-6 rounded-full transition-all active:scale-95 shadow-md"
            >
              {t("nav.cta")}
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

