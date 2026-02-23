import Banner from "./Banner/Banner";
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
    </div>
  );
};

export default Home;
