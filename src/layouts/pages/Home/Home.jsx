import Banner from "./Banner/Banner";
import FAQSection from "./FAQSection";
import Featured from "./Featured";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import UrgentBloodRequests from "./UrgentBloodRequests";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <StatsSection />
      <UrgentBloodRequests />
      <TestimonialsSection />
      <FAQSection />
    </div>
  );
};

export default Home;
