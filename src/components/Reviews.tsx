"use client";

import Image from "next/image";
import { useRef } from "react";

type Review = {
  name: string;
  text: string;
  date: string;
  avatar: string;
  avatarBg: string;
  verified?: boolean;
  photo?: string;
};

const reviews: Review[] = [
  {
    name: "aw",
    text: "Excellent service - my garage door motor had been entering an error state for a few months and I was quoted a full motor replace over the phone from another company. I called Sparrow and spoke with Elisha who offered to investigate first and he managed to fix it for a reasonable service cost - significantly cheaper than wasting money on a full motor replacement. Great, friendly, honest and efficient service, very highly recommended.",
    date: "12/02/2026",
    avatar: "A",
    avatarBg: "#26A69A",
    verified: true,
  },
  {
    name: "Leilani Tuato",
    text: "Very happy with communication from start to finish. We love our new garage. A+++",
    date: "16/07/2025",
    avatar: "L",
    avatarBg: "#00897B",
    verified: true,
    photo: "/images/leilani-review.webp",
  },
  {
    name: "Brenda Jelagat",
    text: "I was very happy with their service, was on the phone with one of their team on Sunday evening on how to program my key garage remote and I was guided through successfully. Clear communication, simple instructions from start to end, amazing team, would definitely recommend to everybody. Thank you.",
    date: "08/10/2025",
    avatar: "B",
    avatarBg: "#7B1FA2",
    verified: true,
  },
  {
    name: "Madupa Rodrigo",
    text: "Elisha from Sparrow Garage Doors did an amazing job replacing my garage door motor. He was professional, efficient, and the price was very reasonable. Highly recommend his service!",
    date: "03/09/2025",
    avatar: "M",
    avatarBg: "#D81B60",
    verified: true,
  },
  {
    name: "Ken Brown",
    text: "Had to get our double garage panel door repaired or replaced after an attempted break in. Found Elisha online and called him. Despite being busy he came the next day, tried to repair the existing door but eventually ascertained it would need replacing. His quote was prompt and my insurance company quickly accepted it. As soon as Elisha was advised it was ready, he called me and the install began within 2 days. He did a great job and it was a pleasure to do business with. Highly recommend him.",
    date: "21/05/2025",
    avatar: "K",
    avatarBg: "#5C6BC0",
    verified: true,
  },
  {
    name: "Giuseppe Scuderi",
    text: "My front gate stopped working. Elisha from Sparrow Garage Doors was excellent!! Elisha was able to get a new motor and replace it that same day for a much better price than other people I had quote the job. Could not recommend enough!!",
    date: "29/04/2025",
    avatar: "G",
    avatarBg: "#F4511E",
    verified: true,
  },
  {
    name: "Paul Ansell",
    text: "Had the opening motors replaced. Very happy with the price, options and communication. Nicest bloke and very knowledgeable.",
    date: "11/11/2025",
    avatar: "P",
    avatarBg: "#1E88E5",
    verified: true,
  },
  {
    name: "Christine Hogan",
    text: "Could not recommend Sparrow Garage Doors highly enough!! After shopping around for a new garage door these guys gave us the best price by far and were so easy to deal with. Thanks so much for everything Sparrow.",
    date: "18/09/2025",
    avatar: "C",
    avatarBg: "#43A047",
    verified: true,
  },
  {
    name: "James Brindle",
    text: "Elisha definitely knows a thing or two about garage doors! We have an old B&D panel lift door at our place which was one of the first produced. We had 3 separate companies out to look at its issues and try and repair it but they all chalked it up to end of life and quoted for a replacement. I originally reached out to Sparrow Garage Doors for a quote for a new door, Elisha decided to swing round and within 2 mins had identified the issue and parts required to repair it. He even came back the same day and fixed our issues. The door is now running better than ever! If you are looking for a garage door service, repair, replacement or just general advice Elisha is hands down the best there is.",
    date: "06/06/2025",
    avatar: "J",
    avatarBg: "#FB8C00",
    verified: true,
  },
  {
    name: "Iona Davis",
    text: "Best service! Roller door got jammed and it was fixed quickly. Elisha was very friendly and knowledgeable. Highly recommend!",
    date: "23/06/2025",
    avatar: "I",
    avatarBg: "#8E24AA",
    verified: true,
  },
  {
    name: "Bianca Edwards",
    text: "Cannot recommend Elisha from Sparrow Doors enough! Our garage door collapsed off the rails and we called him at 7.45 on a Wednesday night and he was here within an hour and managed to get it all put back together so it's secure and in place and is organising the rest of the parts for us. He's polite and professional and super easy to deal with!",
    date: "02/05/2025",
    avatar: "B",
    avatarBg: "#3949AB",
    verified: true,
  },
  {
    name: "Phillip Law",
    text: "Prompt and professional. Elisha came out on a Saturday to replace my old broken garage door motor. He is very knowledgeable, thorough, and adds in valuable education (useful tips that most garage door owners are unaware of). Thank you!",
    date: "10/05/2025",
    avatar: "P",
    avatarBg: "#00ACC1",
    verified: true,
  },
  {
    name: "Jenny Harris",
    text: "Elisha did a wonderful job fixing our garage door. He was knowledgeable, professional, skilful and explained everything very well. I will certainly be asking him back for any future work.",
    date: "17/05/2025",
    avatar: "J",
    avatarBg: "#E53935",
    verified: true,
  },
  {
    name: "Erden Er",
    text: "The technician is so talented, we called few companies before, no one could figure out what the problem is. Then I got my luck here, the job got done so quick I am so surprised. Highly recommended, price is also very fair.",
    date: "25/04/2025",
    avatar: "E",
    avatarBg: "#6D4C41",
    verified: true,
  },
  {
    name: "Mia Designer",
    text: "Our garage door wouldn't open. Elisha got here early morning and had it taken care of in less than an hour. Exceptional service.",
    date: "14/05/2025",
    avatar: "M",
    avatarBg: "#5E35B1",
    verified: true,
  },
  {
    name: "Julius Metcalfe",
    text: "Excellent service! Prompt repair done on our broken spring. Very reasonably priced too, on a hot summer day over Christmas shutdown period no less.",
    date: "30/04/2025",
    avatar: "J",
    avatarBg: "#039BE5",
    verified: true,
  },
  {
    name: "Damian Robson",
    text: "Great service. Managed to fit me in on the same day I called. Friendly and professional service. Will definitely use again.",
    date: "12/06/2025",
    avatar: "D",
    avatarBg: "#C0CA33",
    verified: true,
  },
  {
    name: "Graham Behnke",
    text: "Professional friendly service. Wonderful and prompt work on my garage door motor.",
    date: "27/07/2025",
    avatar: "G",
    avatarBg: "#FF7043",
    verified: true,
  },
  {
    name: "Rob Whitbourne",
    text: "A really great professional, he was knowledgeable, proactive with a really great 'Can Do' attitude, turned up on time and also polite.",
    date: "08/05/2025",
    avatar: "R",
    avatarBg: "#7CB342",
    verified: true,
  },
];

const MAX_REVIEW_CHARS = 280;

function truncate(text: string, max = MAX_REVIEW_CHARS) {
  if (text.length <= max) return text;
  const sliced = text.slice(0, max);
  const lastSpace = sliced.lastIndexOf(" ");
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

function Star({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      {direction === "left" ? (
        <path d="m15 18-6-6 6-6" />
      ) : (
        <path d="m9 18 6-6-6-6" />
      )}
    </svg>
  );
}

export default function Reviews() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    active: boolean;
    startX: number;
    startScroll: number;
    moved: boolean;
  }>({ active: false, startX: 0, startScroll: 0, moved: false });

  // Seamless wrap when user manually scrolls past the loop boundary.
  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const half = el.scrollWidth / 2;
    if (el.scrollLeft >= half) {
      el.scrollLeft -= half;
    } else if (el.scrollLeft < 0) {
      el.scrollLeft += half;
    }
  };

  // Pointer drag-to-scroll.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const el = scrollerRef.current;
    if (!el) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    el.scrollLeft = dragRef.current.startScroll - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    const el = scrollerRef.current;
    if (el && el.hasPointerCapture(e.pointerId)) {
      el.releasePointerCapture(e.pointerId);
    }
  };

  const nudge = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-review-card]");
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section
      className="reviews-font w-full bg-white py-8 sm:py-12"
      style={{ touchAction: "pan-y pinch-zoom" }}
    >
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:gap-8">
          {/* Left: rating info */}
          <div className="w-full flex-shrink-0 text-center sm:w-auto">
            <p className="mb-2 text-xl font-bold text-neutral-900 sm:text-3xl">
              EXCELLENT
            </p>
            <div className="mb-2 flex items-center justify-center gap-1 text-amber-400">
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <p className="mb-1 text-sm font-semibold text-neutral-900 sm:text-base">
              30+ 5 Star Google Reviews
            </p>
            <Image
              src="/images/google-text.png"
              alt="Google"
              width={120}
              height={40}
              className="mx-auto h-6 w-auto sm:h-8"
            />
          </div>

          {/* Right: reviews carousel */}
          <div className="w-full min-w-0 flex-1">
            <div className="relative">
              <button
                type="button"
                onClick={() => nudge(-1)}
                aria-label="Previous reviews"
                className="absolute left-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-neutral-700 shadow-md ring-1 ring-black/10 transition hover:text-brand-navy"
              >
                <ChevronIcon direction="left" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                aria-label="Next reviews"
                className="absolute right-1 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center rounded-full bg-white p-2 text-neutral-700 shadow-md ring-1 ring-black/10 transition hover:text-brand-navy"
              >
                <ChevronIcon direction="right" />
              </button>

              <div
                ref={scrollerRef}
                className="reviews-scroller mask-gradient relative flex cursor-grab items-start gap-3 overflow-x-auto pb-1 active:cursor-grabbing sm:gap-4"
                style={{ touchAction: "pan-y" }}
                onScroll={handleScroll}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                {[0, 1].map((setIndex) =>
                  reviews.map((review, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      data-review-card
                      className="w-64 flex-shrink-0 select-none sm:w-72"
                    >
                      <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
                        <div className="mb-2 flex items-start justify-between sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div
                              className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm"
                              style={{ backgroundColor: review.avatarBg }}
                            >
                              {review.avatar}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-neutral-900">
                                {review.name}
                              </p>
                              <p className="text-xs text-neutral-500">
                                {review.date}
                              </p>
                            </div>
                          </div>
                          <Image
                            src="/images/google-g.png"
                            alt="Google"
                            width={20}
                            height={20}
                            className="h-5 w-5"
                          />
                        </div>

                        <div className="mb-3 flex items-center gap-2">
                          <div className="flex items-center gap-1 text-amber-400">
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                            <Star />
                          </div>
                          {review.verified && (
                            <Image
                              src="/images/verified.png"
                              alt="Verified"
                              width={16}
                              height={16}
                              className="h-4 w-4"
                            />
                          )}
                        </div>

                        <p className="text-sm leading-relaxed text-neutral-800">
                          {truncate(review.text)}
                        </p>

                        {review.photo && (
                          <div className="mt-3 overflow-hidden rounded-md">
                            <Image
                              src={review.photo}
                              alt={`Photo from ${review.name}`}
                              width={288}
                              height={180}
                              className="h-32 w-full object-cover sm:h-36"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
