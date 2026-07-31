# Legacy Insight Migration Report

> **Status**: Pending manual review — do NOT auto-migrate  
> **Generated**: 2026-07-31  
> **Source file**: `src/data/insights.ts`

## Overview

There are **6 legacy articles** in `src/data/insights.ts`. All use static Unsplash images and Indonesian-language content with English translations stored in separate fields (`titleEn`, `excerptEn`, `bodyPlaceholderEn`).

The CMS currently has **1 article** (`bambang-dwi-cahyo`), which does NOT conflict with any legacy slug.

## Legacy Articles

| # | Title (ID) | Slug | Legacy Category | Date |
|---|---|---|---|---|
| 1 | Apa itu Competent Person Indonesia (CPI)... | `competent-person-indonesia-penting` | Mining Knowledge | 2026-07-20 |
| 2 | Mengenal Standar KCMI/JORC... | `standar-kcmi-jorc-estimasi` | Mining Knowledge | 2026-07-15 |
| 3 | RKAB vs E-RKAB... | `rkab-vs-e-rkab` | Regulasi | 2026-07-10 |
| 4 | Tahapan Penyusunan AMDAL... | `tahapan-penyusunan-amdal` | Artikel | 2026-07-05 |
| 5 | Kajian Hidrogeologi (Slug Test)... | `kajian-hidrogeologi-tambang-bawah-tanah` | Mining Knowledge | 2026-06-30 |
| 6 | LUISE Memperluas Operasi... | `luise-ekspansi-operasi-kalimantan-timur` | Company Update | 2026-07-25 |

## Proposed Category Mapping

The legacy articles use 4 categories that differ from the current CMS categories. Below is a proposed mapping for **manual review**:

| Legacy Category | Proposed CMS Category | Confidence | Notes |
|---|---|---|---|
| Mining Knowledge | Wawasan Pertambangan | High | Semantic match — both mean "mining insights/knowledge" |
| Company Update | Berita Perusahaan | High | Semantic match — both mean "company news/updates" |
| Regulasi | *(New or existing?)* | Needs review | No direct CMS category for regulations. Consider creating "Regulasi" or mapping to "Wawasan Pertambangan" |
| Artikel | *(New or existing?)* | Needs review | Generic label. Could map to "Wawasan Pertambangan" or a new "Artikel Umum" category |

> [!IMPORTANT]
> Do not change category meanings without explicit confirmation. The mapping above requires manual review before migration.

## Per-Article Migration Readiness

### 1. `competent-person-indonesia-penting`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Title (EN) | ✅ Present |
| Slug | ✅ Unique — no CMS conflict |
| Excerpt (ID) | ✅ Present |
| Excerpt (EN) | ✅ Present |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Content (EN) | ⚠️ Placeholder — "TODO" |
| Category | Mining Knowledge → Wawasan Pertambangan (proposed) |
| Date | ✅ 2026-07-20 |
| Image | ✅ Unsplash URL (external) |
| **Readiness** | ⚠️ Content is placeholder — requires editorial work |

### 2. `standar-kcmi-jorc-estimasi`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Slug | ✅ Unique |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Category | Mining Knowledge → Wawasan Pertambangan (proposed) |
| Date | ✅ 2026-07-15 |
| Image | ✅ Unsplash URL (external) |
| **Readiness** | ⚠️ Content is placeholder |

### 3. `rkab-vs-e-rkab`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Slug | ✅ Unique |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Category | Regulasi → **Needs review** |
| Date | ✅ 2026-07-10 |
| Image | ✅ Unsplash URL (external) |
| **Readiness** | ⚠️ Content is placeholder. Category needs mapping decision. |

### 4. `tahapan-penyusunan-amdal`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Slug | ✅ Unique |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Category | Artikel → **Needs review** |
| Date | ✅ 2026-07-05 |
| Image | ✅ Unsplash URL (external) |
| **Readiness** | ⚠️ Content is placeholder. Category needs mapping decision. |

### 5. `kajian-hidrogeologi-tambang-bawah-tanah`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Slug | ✅ Unique |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Category | Mining Knowledge → Wawasan Pertambangan (proposed) |
| Date | ✅ 2026-06-30 |
| Image | ✅ Default Unsplash image (shared) |
| **Readiness** | ⚠️ Content is placeholder. Uses default shared image. |

### 6. `luise-ekspansi-operasi-kalimantan-timur`

| Field | Status |
|---|---|
| Title (ID) | ✅ Present |
| Slug | ✅ Unique |
| Content (ID) | ⚠️ Short paragraph only — body says "TODO" |
| Category | Company Update → Berita Perusahaan (proposed) |
| Date | ✅ 2026-07-25 |
| Image | ✅ Unsplash URL (external) |
| **Readiness** | ⚠️ Content is placeholder |

## Summary

| Metric | Count |
|---|---|
| Total legacy articles | 6 |
| Unique slugs (no CMS conflict) | 6 |
| Content complete | 0 |
| Content is placeholder/TODO | 6 |
| Category needs mapping review | 2 (Regulasi, Artikel) |
| Images using external URLs | 6 |
| Ready to migrate as-is | 0 |
| Require editorial content first | 6 |

## Recommendations

1. **Do NOT auto-migrate** — all 6 articles contain placeholder body content marked "TODO".
2. **Write full article content** in the CMS editor before migrating each article.
3. **Confirm category mapping** for "Regulasi" and "Artikel" labels.
4. **Consider re-hosting images** from Unsplash to Supabase Storage for reliability.
5. **After migration & verification**, remove `src/data/insights.ts` and `src/lib/legacy-bridge.ts`.

## Duplicate Risk

**None currently.** No legacy slug matches any existing CMS article slug. The deduplication logic in `legacy-bridge.ts` handles future collisions by preferring the CMS version.
