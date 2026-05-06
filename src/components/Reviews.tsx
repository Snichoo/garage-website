import Image from "next/image";

type Review = {
  name: string;
  text: string;
  date: string;
  avatar: string;
  avatarBg: string;
  verified?: boolean;
  image: string;
};

const reviews: Review[] = [
  {
    name: "Emma Richardson",
    text: "Our garage door wouldn't open the morning we had to leave for a flight. They came out within an hour and had it sorted. Lifesavers!",
    date: "18/11/2024",
    avatar: "E",
    avatarBg: "#26A69A",
    verified: true,
    image: "/images/residential.png",
  },
  {
    name: "Daniel Park",
    text: "Replaced our old, noisy roller door with a quiet motor and new tracks. Looks brand new and runs like a dream. Couldn't recommend more.",
    date: "02/11/2024",
    avatar: "D",
    avatarBg: "#7B1FA2",
    verified: true,
    image: "/images/residential.png",
  },
  {
    name: "Rachel Nguyen",
    text: "Spring snapped on a Sunday and they still came out same day. Fixed price quoted upfront — no surprises. Top blokes.",
    date: "25/10/2024",
    avatar: "R",
    avatarBg: "#D81B60",
    verified: true,
    image: "/images/residential.png",
  },
  {
    name: "Tom Bradley",
    text: "Got three quotes — these guys were the most thorough and not the most expensive. Install was clean and tidy. Real professionals.",
    date: "12/11/2024",
    avatar: "T",
    avatarBg: "#00897B",
    verified: true,
    image: "/images/residential.png",
  },
  {
    name: "Chloe Watts",
    text: "The remote stopped working and I assumed I'd need a whole new motor. Turned out to be a quick fix. Honest service, fair price.",
    date: "08/11/2024",
    avatar: "C",
    avatarBg: "#5C6BC0",
    verified: true,
    image: "/images/residential.png",
  },
  {
    name: "Liam Foster",
    text: "Brand new sectional door fitted in a few hours. Took the time to explain how everything works. Will definitely use again.",
    date: "01/11/2024",
    avatar: "L",
    avatarBg: "#F4511E",
    verified: true,
    image: "/images/residential.png",
  },
];

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

export default function Reviews() {
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
              150+ 5 Star Google Reviews
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
          <div className="min-w-0 flex-1">
            <div
              className="mask-gradient relative overflow-hidden"
              style={{ touchAction: "pan-y pinch-zoom" }}
            >
              <div
                className="flex animate-slide-infinite gap-3 will-change-transform sm:gap-4"
                style={{ width: "300%" }}
              >
                {[0, 1, 2].map((setIndex) =>
                  reviews.map((review, index) => (
                    <div
                      key={`${setIndex}-${index}`}
                      className="w-64 flex-shrink-0 sm:w-72"
                    >
                      <div className="h-full rounded-lg border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
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
                          {review.text}
                        </p>

                        <div className="mt-3 overflow-hidden rounded-md">
                          <Image
                            src={review.image}
                            alt={`${review.name}'s job`}
                            width={400}
                            height={120}
                            className="h-28 w-full object-cover"
                          />
                        </div>
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
