import Image from "next/image";
import Link from "next/link";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { posts } from "@/data/posts";
import { pageMetadata } from "@/lib/site";

export function generateMetadata() {
  return pageMetadata({
  title: "Garage Door Tips & Advice | Sparrow Garage Doors Blog",
  description:
    "Garage door maintenance tips, buying guides, and troubleshooting advice from Brisbane's local garage door specialists.",
  path: "/blog",
});
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [featured, ...rest] = sorted;

  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />
        <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-36 text-center md:pb-20 md:pt-44">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            <span className="text-white">Tips, guides &amp;</span>{" "}
            <span className="text-brand-yellow">honest advice</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Practical garage door know-how from the team who installs and
            repairs them every day across Brisbane.
          </p>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="w-full py-12 md:py-16">
          <div className="mx-auto max-w-[1200px] px-6">
            <Link
              href={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:shadow-xl lg:grid-cols-2"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-auto">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 600px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                  priority
                />
              </div>
              <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex items-center gap-3 text-xs">
                  <span className="inline-flex items-center rounded-full bg-brand-yellow px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-navy">
                    {featured.category}
                  </span>
                  <span className="text-neutral-500">
                    {formatDate(featured.date)} · {featured.readTime}
                  </span>
                </div>
                <h2 className="font-display text-2xl font-extrabold leading-tight text-brand-navy md:text-4xl">
                  {featured.title}
                </h2>
                <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
                  {featured.excerpt}
                </p>
                <span className="mt-auto inline-flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.18em] text-brand-navy transition group-hover:text-brand-yellow">
                  Read article
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                    className="h-4 w-4 transition group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Article grid */}
      {rest.length > 0 && (
        <section className="w-full pb-16 md:pb-24">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-8 font-display text-2xl font-extrabold uppercase tracking-tight text-brand-navy md:text-3xl">
              More from the blog
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                      <div className="flex items-center gap-3 text-xs">
                        <span className="inline-flex items-center rounded-full bg-brand-navy px-2.5 py-1 font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-yellow">
                          {post.category}
                        </span>
                        <span className="text-neutral-500">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-extrabold leading-snug text-brand-navy md:text-xl">
                        {post.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-neutral-700">
                        {post.excerpt}
                      </p>
                      <span className="mt-auto pt-2 font-display text-xs font-extrabold uppercase tracking-[0.18em] text-brand-navy transition group-hover:text-brand-yellow">
                        Read more →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaBanner />
      <Footer />
    </main>
  );
}
