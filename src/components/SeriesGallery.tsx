import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  aspect: string;
};

type Props = {
  title: string;
  description?: string;
  images: GalleryImage[];
  gridCols: string;
};

export default function SeriesGallery({
  title,
  description,
  images,
  gridCols,
}: Props) {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-brand-navy md:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-neutral-700 md:text-lg">
            {description}
          </p>
        )}
        <div className={`mt-8 grid gap-4 md:gap-5 ${gridCols}`}>
          {images.map((img) => (
            <div
              key={img.src}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: img.aspect }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
