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
