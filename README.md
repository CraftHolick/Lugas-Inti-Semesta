# PT Lugas Inti Semesta (LUISE) — Production Website

**Client:** PT Lugas Inti Semesta (LUISE) — Geological Consulting & Coal Mining Services  
**Agency:** CraftHolic (part of Trinity Agency)  
**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React, Shadcn/ui  

---

## 📌 Executive Summary

This repository contains the complete, production-ready marketing website for **PT Lugas Inti Semesta (LUISE)**, a prominent geological consulting and coal mining services firm headquartered in Jakarta with project operations across Kalimantan.

The website has been intentionally architected with modular components and decoupled content to allow for seamless future migration into a **WordPress Theme (Elementor / Bricks + Polylang)**.

---

## 🎨 Design & Brand Identity

* **Theme:** Deep Navy Dark Theme (`bg-navy-950` `#0B0E11` to `bg-navy-900` `#14181D`) with Safety Orange accents (`#F5A623`).
* **Typography:**
  * **Headings:** `Bebas Neue` (Google Fonts) via `.font-heading`
  * **Body & UI:** `Inter` via `.font-sans`
* **UI Effects:** Modern glassmorphism (`.glass`), subtle gradient overlays (`bg-gradient-hero`), and smooth micro-animations driven by Framer Motion.

---

## 🌍 Multilingual (i18n) Architecture

The application supports three languages natively without page reloads, managed via a React Context state machine (`src/lib/i18n.tsx`):
1. **Indonesian (`id`)** — Primary / Default language
2. **English (`en`)** — Full professional translation
3. **Simplified Chinese (`zh`)** — Translated with a review note (`// NOTE: Chinese translations need native review before launch`)

### Content Storage & WordPress / Polylang Migration
All text strings are completely decoupled from UI components and stored in JSON translation dictionaries:
* `src/content/id.json`
* `src/content/en.json`
* `src/content/zh.json`

When migrating to WordPress with Polylang or WPML:
1. Map each JSON key (e.g., `hero.headline_line1`) directly to a Custom Field (ACF / JetEngine) or Polylang string translation.
2. Section components in `src/components/sections/*` correspond 1:1 with Elementor/Bricks modular templates or custom widgets.

---

## 📂 Project Structure

```bash
luise-website/
├── src/
│   ├── app/                    # Next.js 15 App Router pages & metadata
│   │   ├── about/              # About Us page
│   │   ├── contact/            # Contact & Interactive Form
│   │   ├── documentation/      # Downloadable Brochures & ISO Certificates
│   │   ├── projects/           # Projects listing & [slug] detail pages
│   │   ├── services/           # Services overview & [slug] detail pages
│   │   ├── globals.css         # Tailwind v4 theme configuration (@theme inline) & utility classes
│   │   ├── layout.tsx          # Root layout with Inter & Bebas Neue fonts
│   │   └── page.tsx            # Homepage assembly (11 modular sections)
│   ├── components/
│   │   ├── cards/              # Reusable UI cards (ProjectCard, ServiceCard, TeamCard, etc.)
│   │   ├── layout/             # Header, Footer, MobileNav, ClientProviders
│   │   ├── sections/           # Modular homepage & landing page sections (Hero, StatsBar, WhyChooseUs, etc.)
│   │   └── ui/                 # Shadcn/ui & custom interactive widgets (WorldMap, LanguageSelectorDropdown)
│   ├── content/                # Decoupled i18n JSON dictionaries (id.json, en.json, zh.json)
│   ├── data/                   # Structured TypeScript mock databases (services, projects, team, testimonials, clients, documents)
│   └── lib/                    # Utilities (cn) & i18n Context Provider
├── public/                     # Static assets
└── package.json
```

---

## 🚀 Getting Started (Local Development)

### 1. Prerequisites
Ensure you have Node.js 20+ and npm/pnpm installed.

### 2. Installation
```bash
npm install
# or
pnpm install
```

### 3. Run Development Server
```bash
npm run dev
# or
pnpm dev
```
Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

### 4. Production Build & Static Export
To verify zero compilation errors and generate optimized static/SSG bundles:
```bash
npm run build
npm run start
```
The build generates 19 optimized static and SSG routes including dynamic slug generation for all 4 services and 6 mining projects.

---

## 🛠 Features & Capabilities

* **Interactive World & Indonesia Mapping:** Built-in interactive map visualization (`src/components/ui/world-map.tsx`) highlighting Kalimantan project operations.
* **Responsive Navigation:** Sticky header with backdrop blur, language switching dropdown, and animated mobile drawer.
* **Dynamic Animations:** Staggered viewport entrance animations on scroll using `framer-motion`.
* **SEO Ready:** Complete dynamic metadata generation (`generateMetadata`) across all static and dynamic routes.

---
*© 2026 PT Lugas Inti Semesta. Built by CraftHolic / Trinity Agency.*
