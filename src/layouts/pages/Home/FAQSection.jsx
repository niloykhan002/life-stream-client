import { useState } from "react";
import { useNavigate } from "react-router-dom";

const faqs = [
  {
    category: "Donor",
    question: "Who is eligible to donate blood?",
    answer:
      "Generally, anyone who is 18–60 years old, weighs at least 50kg, and is in good health can donate blood. You should not have any infections, chronic illnesses, or have donated blood in the last 3 months.",
  },
  {
    category: "Donor",
    question: "How often can I donate blood?",
    answer:
      "Whole blood can be donated once every 3 months (90 days). This gives your body enough time to replenish the donated blood fully without affecting your health.",
  },
  {
    category: "Donor",
    question: "Does donating blood hurt?",
    answer:
      "You may feel a small pinch when the needle is inserted, but the donation process itself is generally painless. The entire process takes about 8–10 minutes and most donors feel completely fine afterward.",
  },
  {
    category: "Donor",
    question: "How do I register as a donor on this platform?",
    answer:
      "Simply create an account, complete your profile with your blood type and location, and toggle your availability. You'll start receiving notifications when someone nearby needs your blood type.",
  },
  {
    category: "Donor",
    question: "Will donating blood affect my daily activities?",
    answer:
      "Most donors return to their normal routine immediately. We recommend drinking extra fluids, avoiding heavy exercise for 24 hours, and eating a healthy meal before and after donating.",
  },
  {
    category: "Recipient",
    question: "How do I request blood for a patient?",
    answer:
      "Log in to your account, go to the Blood Request page, and fill in the required details — blood type, hospital, urgency level, and contact info. Your request will be visible to matching donors immediately.",
  },
  {
    category: "Recipient",
    question: "How long does it take to find a donor?",
    answer:
      "For urgent requests, donors are notified instantly and many respond within minutes. Response time depends on donor availability in your area, but our platform prioritizes urgent requests at the top.",
  },
  {
    category: "Recipient",
    question: "Is there any cost involved in requesting blood?",
    answer:
      "Our platform is completely free to use. We connect patients with voluntary donors at no charge. Any hospital or processing fees are separate and handled directly between you and the medical facility.",
  },
  {
    category: "Recipient",
    question: "What if no donor is available in my area?",
    answer:
      "If no local donor is found, we expand the search radius automatically. You can also share your request on social media directly from the platform to reach more potential donors quickly.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = ["All", "Donor", "Recipient"];

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="pb-20 bg-slate-100 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-secondary text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1 leading-tight">
            Got Questions?{" "}
            <span className="text-primary">{"We've"} Got Answers.</span>
          </h2>
          <p className="mt-4 text-dark3 text-base">
            Everything you need to know about donating or requesting blood on
            our platform.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setActiveIndex(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-gray-500 hover:bg-secondary hover:text-primary"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filtered.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-red-300 shadow-md shadow-red-100"
                    : "border-gray-200 hover:border-red-200"
                }`}
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-secondary transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    {/* Category badge */}
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-secondary text-primary">
                      {faq.category}
                    </span>
                    <span className="text-gray-800 font-semibold text-sm md:text-base">
                      {faq.question}
                    </span>
                  </div>

                  {/* Icon */}
                  <span
                    className={`ml-4 flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-primary text-white rotate-45"
                        : "bg-gray-100 text-dark3"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-dark3 text-sm md:text-base leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 p-8 bg-secondary rounded-3xl border border-red-100">
          <p className="text-dark1 font-semibold text-lg">
            Still have questions?
          </p>
          <p className="text-dark3 text-sm mt-1 mb-5">
            Our team is happy to help you anytime.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3 rounded-full shadow-lg shadow-red-200 hover:-translate-y-0.5   transition-all duration-200 active:scale-95"
          >
            Contact Us
            <svg
              className="w-4 h-4"
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
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
