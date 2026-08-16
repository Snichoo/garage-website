/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560],
    imageSizes: [16, 32, 48, 64, 96, 112, 128, 160, 192, 256, 320, 384, 480],
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "www.steel-line.com.au" },
      // Images uploaded through the admin dashboard on Vercel (Vercel Blob).
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  async headers() {
    const cacheHeaders = [
      {
        key: "Cache-Control",
        value:
          "public, max-age=604800, s-maxage=2678400, stale-while-revalidate=86400",
      },
    ];

    return [
      { source: "/images/:path*", headers: cacheHeaders },
      { source: "/videos/:path*", headers: cacheHeaders },
    ];
  },
  // Routes renamed in the 2026 nav restructure. Keep these permanently so the
  // old URLs (and any Google Ads landing pages pointing at them) still resolve.
  async redirects() {
    return [
      {
        source: "/automated-gates",
        destination: "/gate-automation",
        permanent: true,
      },
      { source: "/smart-kits", destination: "/smart-systems", permanent: true },
    ];
  },
  experimental: {
    // Vercel serverless functions can't read public/ from the filesystem
    // unless the files are traced in. The admin image picker lists
    // public/images, so include it for that route.
    outputFileTracingIncludes: {
      "/api/admin/images": ["./public/images/**/*"],
    },
  },
};

module.exports = nextConfig;
