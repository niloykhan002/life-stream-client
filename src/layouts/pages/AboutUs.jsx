import { Link } from "react-router-dom";
import mission from "../../assets/about-icons/mission.png";
import vision from "../../assets/about-icons/vision.png";
import compassion from "../../assets/about-icons/compassion.png";
import community from "../../assets/about-icons/community.png";
import improvement from "../../assets/about-icons/improvement.png";
import inclusivity from "../../assets/about-icons/inclusivity.png";
import safety from "../../assets/about-icons/safety.png";
import speed from "../../assets/about-icons/speed.png";

const missions = [
  {
    icon: mission,
    title: "Our Mission",
    description:
      "To bridge the gap between blood donors and patients in need by providing a fast, reliable, and accessible platform that saves lives. We are committed to making blood donation effortless and impactful for every individual involved.",
  },
  {
    icon: vision,
    title: "Our Vision",
    description:
      "A world where no patient loses their life due to a shortage of blood. We envision a connected community of voluntary donors ready to respond at any moment, powered by technology and driven by compassion.",
  },
];

const values = [
  {
    icon: compassion,
    title: "Compassion",
    description:
      "Every feature we build and every decision we make is rooted in genuine care for human life. We treat every request with the urgency and empathy it deserves.",
  },
  {
    icon: safety,
    title: "Trust & Safety",
    description:
      "We verify donors, protect user data, and maintain transparency at every step. Our community is built on trust — between donors, recipients, and our platform.",
  },
  {
    icon: speed,
    title: "Speed & Reliability",
    description:
      "In emergencies, every second counts. We are committed to connecting patients with donors as fast as possible, with a platform that is always available and always responsive.",
  },
  {
    icon: community,
    title: "Community First",
    description:
      "We believe in the power of people helping people. Our platform is built to strengthen local communities by making voluntary blood donation a normal and celebrated act.",
  },
  {
    icon: inclusivity,
    title: "Inclusivity",
    description:
      "We welcome donors and recipients from all backgrounds. Our platform is designed to be accessible, easy to use, and free for everyone regardless of circumstance.",
  },
  {
    icon: improvement,
    title: "Continuous Improvement",
    description:
      "We are always listening, learning, and evolving. Feedback from our community drives us to improve our platform, expand our reach, and serve better every day.",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="relative py-24 bg-primary overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 uppercase tracking-widest border border-white/20">
            About Us
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
            We Exist to Save Lives —{" "}
            <span className="text-red-200">One Drop at a Time</span>
          </h1>
          <p className="mt-6 text-red-100 text-lg max-w-2xl mx-auto leading-relaxed">
            We are a dedicated team building technology that connects voluntary
            blood donors with patients in critical need — making the process
            faster, safer, and more human.
          </p>

          {/* Divider */}
          <div className="mt-10 flex justify-center gap-2">
            <div className="w-12 h-1 bg-white rounded-full opacity-60" />
            <div className="w-3 h-1 bg-white rounded-full opacity-40" />
            <div className="w-3 h-1 bg-white rounded-full opacity-20" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-red-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              What Drives Us
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1">
              Our Mission & <span className="text-primary">Vision</span>
            </h2>
            <p className="mt-4 text-dark3 text-base max-w-xl mx-auto">
              Everything we do is guided by a clear purpose — to make blood
              donation accessible, fast, and life-changing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {missions.map((item, index) => (
              <div
                key={index}
                className="relative bg-white border border-gray-100 rounded-3xl p-10 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300 group overflow-hidden"
              >
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="w-16 h-16 bg-red-50 group-hover:bg-red-100 rounded-2xl flex items-center justify-center text-3xl mb-6 transition-colors duration-300">
                  <img src={item.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-extrabold text-dark1 mb-4">
                  {item.title}
                </h3>
                <p className="text-dark3 leading-relaxed">{item.description}</p>

                {/* Bottom accent line */}
                <div className="mt-8 w-12 h-1 bg-secondary group-hover:w-24 group-hover:bg-primary rounded-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-100" />
      </div>

      {/* Core Values */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 bg-rose-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
              What We Stand For
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1">
              Our Core <span className="text-primary">Values</span>
            </h2>
            <p className="mt-4 text-dark3 text-base max-w-xl mx-auto">
              These principles shape how we build our platform, serve our
              community, and show up for every life that depends on us.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gray-50 hover:bg-white border border-transparent hover:border-red-100 rounded-3xl p-8 transition-all duration-300 hover:shadow-md group"
              >
                <div className="w-13 h-13 w-14 h-14 bg-white group-hover:bg-red-50 rounded-2xl flex items-center justify-center text-2xl mb-5 shadow-sm transition-colors duration-300">
                  <img src={value.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-dark1 font-bold text-lg mb-3">
                  {value.title}
                </h3>
                <p className="text-dark3 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-red-100 text-lg mb-8">
            Join thousands of donors and help us build a world where no life is
            lost due to a lack of blood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary font-semibold px-8 py-3.5 rounded-full shadow-lg hover:bg-red-50 active:scale-95 transition-all duration-200 group"
            >
              Become a Donor
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
            <Link
              to="/dashboard/create-blood-donation-request"
              className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-semibold px-8 py-3.5 rounded-full border-2 border-white/40 hover:border-white hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Request Blood
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
