const testimonials = [
  {
    name: "Rahim Uddin",
    location: "Dhaka, Bangladesh",
    bloodType: "A+",
    avatar: "RU",
    story:
      "My mother needed urgent A+ blood after a surgery. Within 30 minutes of posting the request, two donors responded. I still can't believe how fast the platform connected us. It literally saved her life.",
  },
  {
    name: "Fatema Begum",
    location: "Chittagong, Bangladesh",
    bloodType: "O−",
    avatar: "FB",
    story:
      "Finding O− blood is always a nightmare. But this platform had a verified donor just 5km from our hospital. The donor arrived within the hour. I will be forever grateful for this service.",
  },
  {
    name: "Karim Hassan",
    location: "Sylhet, Bangladesh",
    bloodType: "B+",
    avatar: "KH",
    story:
      "My son was in a critical condition and needed blood immediately. I was panicking but the platform was so easy to use. Within minutes I had a donor confirmed. This platform is a blessing.",
  },
  {
    name: "Nasrin Akter",
    location: "Rajshahi, Bangladesh",
    bloodType: "AB+",
    avatar: "NA",
    story:
      "During my husband's emergency operation the hospital ran out of AB+ blood. I posted a request and got 3 responses in under 20 minutes. The process was smooth and the donors were so kind.",
  },
  {
    name: "Tariq Hossain",
    location: "Khulna, Bangladesh",
    bloodType: "A−",
    avatar: "TH",
    story:
      "I was skeptical at first but this platform proved me wrong. The donor was verified, on time, and incredibly compassionate. My sister recovered well and we owe a huge part of that to this platform.",
  },
  {
    name: "Sumaiya Islam",
    location: "Comilla, Bangladesh",
    bloodType: "O+",
    avatar: "SI",
    story:
      "I posted a request late at night expecting no response till morning. But within 15 minutes someone had already confirmed. I was in tears. This community of donors is truly extraordinary.",
  },
];

const doubled = [...testimonials, ...testimonials];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-slate-100 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1 leading-tight">
            Real People. <span className="text-primary">Real Stories.</span>
          </h2>
          <p className="mt-4 text-dark3 text-base max-w-xl mx-auto">
            Families who found hope when they needed it most. These are the
            moments that remind us why every donation matters.
          </p>
        </div>
      </div>

      {/* Scrolling Track — full width, outside container */}
      <div className="relative w-full">
        {/* Left fade */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-red-50 to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-scroll w-max px-6">
          {doubled.map((t, index) => (
            <div
              key={index}
              className="w-80 flex-shrink-0 bg-white rounded-3xl p-7 shadow-sm border border-gray-100 hover:shadow-md hover:border-red-200 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Quote icon */}
              <div className="text-red-200 text-5xl font-serif leading-none mb-3 select-none">
                {`"`}
              </div>

              {/* Story */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">
                {t.story}
              </p>

              {/* Footer */}
              <div className="flex items-center gap-4 mt-6 pt-5 border-t border-gray-100">
                {/* Avatar */}
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-red-400 to-rose-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 shadow-md shadow-red-100">
                  {t.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 font-semibold text-sm truncate">
                    {t.name}
                  </p>
                  <p className="text-gray-400 text-xs truncate">{t.location}</p>
                </div>
                {/* Blood type badge */}
                <span className="text-xs font-extrabold text-primary bg-red-50 border border-red-200 px-2.5 py-1 rounded-full flex-shrink-0">
                  {t.bloodType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stars row */}
      <div className="text-center mt-12">
        <div className="flex justify-center gap-1 mb-2">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
        </div>
        <p className="text-gray-400 text-sm">
          Trusted by <span className="text-gray-700 font-semibold">5,000+</span>{" "}
          families across Bangladesh
        </p>
      </div>

      {/* Scroll animation */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
