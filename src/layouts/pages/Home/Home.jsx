import Banner from "./Banner/Banner";
import FAQSection from "./FAQSection";
import Featured from "./Featured";
import StatsSection from "./StatsSection";
import UrgentBloodRequests from "./UrgentBloodRequests";

const Home = () => {
  return (
    <div>
      <Banner />
      <StatsSection />
      <UrgentBloodRequests />
      <Featured />
      <FAQSection />
    </div>
  );
};

export default Home;
