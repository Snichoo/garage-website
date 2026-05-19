import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBanner from "@/components/CtaBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getPostBySlug, posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} | Sparrow Garage Doors Blog`,
    description: post.excerpt,
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="garage-bg">
      <Header />

      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,rgba(253,215,16,0.15),transparent_55%)]" />
        <div className="mx-auto max-w-[820px] px-6 pb-12 pt-32 md:pb-16 md:pt-40">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-display text-xs font-extrabold uppercase tracking-[0.25em] text-brand-yellow transition hover:opacity-80"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
              className="h-3.5 w-3.5"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to blog
          </Link>
          <div className="mt-6 flex items-center gap-3 text-xs">
            <span className="inline-flex items-center rounded-full bg-brand-yellow px-3 py-1 font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-brand-navy">
              {post.category}
            </span>
            <span className="text-white/70">
              {formatDate(post.date)} · {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-extrabold leading-[1.1] tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">
            {post.excerpt}
          </p>
        </div>
      </section>

      {/* Cover image */}
      <section className="w-full">
        <div className="mx-auto max-w-[980px] px-6 -mt-6 md:-mt-10">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/10">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              sizes="(min-width: 1024px) 980px, 100vw"
              priority
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Body */}
      <article className="w-full py-12 md:py-16">
        <div className="mx-auto flex max-w-[760px] flex-col gap-5 px-6 text-base leading-relaxed text-neutral-800 md:text-lg">
          {post.body.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="w-full pb-16 md:pb-20">
          <div className="mx-auto max-w-[1200px] px-6">
            <h2 className="mb-6 font-display text-xl font-extrabold uppercase tracking-tight text-brand-navy md:text-2xl">
              Keep reading
            </h2>
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="group flex overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="relative aspect-square w-32 shrink-0 sm:w-40">
                      <Image
                        src={p.image}
                        alt={p.imageAlt}
                        fill
                        sizes="160px"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-2 p-4 md:p-5">
                      <span className="font-display text-[10px] font-extrabold uppercase tracking-[0.18em] text-brand-navy/70">
                        {p.category}
                      </span>
                      <h3 className="font-display text-base font-extrabold leading-snug text-brand-navy md:text-lg">
                        {p.title}
                      </h3>
                      <span className="mt-auto font-display text-xs font-extrabold uppercase tracking-[0.18em] text-brand-navy transition group-hover:text-brand-yellow">
                        Read →
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
