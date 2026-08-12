import type { NextConfig } from "next";

const remotePatterns = [
  {
    protocol: "https" as const,
    hostname: "images.unsplash.com",
    pathname: "/**",
  },
  {
    protocol: "https" as const,
    hostname: "ui-avatars.com",
    pathname: "/**",
  },
];

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

if (supabaseUrl) {
  try {
    const parsedUrl = new URL(supabaseUrl);

    remotePatterns.push({
      protocol: "https",
      hostname: parsedUrl.hostname,
      pathname: "/storage/v1/object/public/article-images/**",
    });
  } catch {
    // Ignore invalid URL parsing during tooling
  }
}

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,

  images: {
    unoptimized: true,
    remotePatterns,
  },
};

export default nextConfig;