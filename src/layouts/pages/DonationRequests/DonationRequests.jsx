import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DonationCard from "../../../components/DonationCard";

const DonationRequests = () => {
  const axiosPublic = useAxiosPublic();
  const { data: donations = [] } = useQuery({
    queryKey: ["donations"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-pending");
      return res.data;
    },
  });
  return (
    <div className="container mx-auto">
      <div className="pt-20">
        <h2 className="text-center text-4xl font-bold mb-10">
          Donation <span className="text-primary">Requests</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
          {donations.map((donation, idx) => (
            <DonationCard key={idx} donation={donation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationRequests;
