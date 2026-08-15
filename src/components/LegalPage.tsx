import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getContent } from "@/lib/content";
import { fill } from "@/content/defaults";

/**
 * Plain layout for the footer legal pages. Body paragraphs support the same
 * {phone} / {email} / {name} tokens as the rest of the editable copy.
 */

export type LegalSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPageContent = {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: LegalSection[];
};

export default async function LegalPage({
  content,
}: {
  content: LegalPageContent;
}) {
  const { business } = await getContent();
  const vars = {
    name: business.name,
    phone: business.phoneDisplay,
    email: business.email,
    location: business.primaryLocation,
  };

  return (
    <main className="bg-white">
      <Header />

      {/* Banner */}
      <section className="relative isolate w-full overflow-hidden bg-brand-navy text-white">
        <Image
          src="/images/Jims-Hero-Image.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden
          className="-z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/55 to-black/75" />
        <div className="mx-auto max-w-[900px] px-6 pb-12 pt-32 md:pb-16 md:pt-40">
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] md:text-6xl">
            {content.title}
          </h1>
          <p className="mt-4 text-sm text-white/70">
            Last updated: {content.lastUpdated}
          </p>
        </div>
      </section>

      {/* Body */}
      <section className="w-full bg-white py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-6">
          <p className="text-base leading-relaxed text-neutral-800 md:text-[17px]">
            {fill(content.intro, vars)}
          </p>

          <div className="mt-10 flex flex-col gap-10">
            {content.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="font-display text-xl font-extrabold uppercase tracking-tight text-brand-navy md:text-2xl">
                  {section.heading}
                </h2>
                {section.paragraphs?.map((p) => (
                  <p
                    key={p}
                    className="mt-4 text-base leading-relaxed text-neutral-800 md:text-[17px]"
                  >
                    {fill(p, vars)}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-4 flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-neutral-800 md:text-[17px]">
                    {section.bullets.map((b) => (
                      <li key={b}>{fill(b, vars)}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
