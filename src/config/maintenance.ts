/**
 * Maintenance Mode Configuration
 *
 * Controls whether the public-facing website shows a maintenance page.
 * Uses NEXT_PUBLIC_MAINTENANCE_MODE env var, which is inlined at build time
 * for Next.js static export.
 *
 * To enable:  Set NEXT_PUBLIC_MAINTENANCE_MODE=true and rebuild
 * To disable: Set NEXT_PUBLIC_MAINTENANCE_MODE=false (or remove it) and rebuild
 */
export const MAINTENANCE_MODE =
  process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";
