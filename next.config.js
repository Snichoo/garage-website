/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "placehold.co" },
      { protocol: "https", hostname: "via.placeholder.com" },
      { protocol: "https", hostname: "www.steel-line.com.au" },
      // Images uploaded through the admin dashboard on Vercel (Vercel Blob).
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  // Routes renamed in the 2026 nav restructure. Keep these permanently so the
  // old URLs (and any Google Ads landing pages pointing at them) still resolve.
  async redirects() {
    return [
      {
        source: "/gates",
        destination: "/gate-automation",
        permanent: true,
      },
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
