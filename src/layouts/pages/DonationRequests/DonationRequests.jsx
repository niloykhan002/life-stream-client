import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DonationCard from "../../../components/DonationCard";
import Loader from "../../../components/Loader";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: donations = [], isLoading } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-pending");
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="container mx-auto px-4 pt-12">
      <h2 className="text-center text-4xl font-bold mb-10">
        Donation <span className="text-primary">Requests</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
        {donations.map((donation, idx) => (
          <DonationCard key={idx} donation={donation} />
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
