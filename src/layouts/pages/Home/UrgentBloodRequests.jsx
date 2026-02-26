import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DonationCard from "../../../components/DonationCard";
import Loader from "../../../components/Loader";
import { FiArrowRight } from "react-icons/fi";

const UrgentBloodRequests = () => {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ["urgent-donations-home"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-pending", {
        params: { urgency: "critical", limit: 4, page: 1 },
      });
      return res.data;
    },
  });

  const donations = data?.data || [];
  const total = data?.total || 0;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-red-50 relative overflow-hidden">
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          {/* Live badge */}
          <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-semibold px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Live Requests
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-dark1 leading-tight">
            Urgent Blood Needed <span className="text-primary">Right Now</span>
          </h2>
          <p className="mt-4 text-dark3 text-base max-w-xl mx-auto">
            These patients need your help immediately. Check if your blood type
            matches and become {"someone's"} lifesaver today.
          </p>

          {!isLoading && total > 0 && (
            <p className="mt-2 text-sm text-red-400 font-medium">
              Showing 4 most urgent —{" "}
              <span className="font-bold text-red-600">
                {total}+ active requests
              </span>{" "}
              waiting
            </p>
          )}
        </div>

        {/* Cards Grid */}
        {isLoading ? (
          <Loader fullPage={false} />
        ) : donations.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🩸</p>
            <p className="text-lg font-medium">No urgent requests right now.</p>
            <p className="text-sm mt-1">
              Check back soon or view all pending requests.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {donations.map((donation) => (
              <DonationCard key={donation._id} donation={donation} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/donation-requests")}
            className="inline-flex items-center gap-2 bg-primary active:scale-95 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-red-200 hover:-translate-y-0.5 transition-all duration-200"
          >
            View All Blood Requests
            <FiArrowRight size={18} />
          </button>
          <p className="text-xs text-gray-400 mt-3">
            All requests are verified and updated in real time
          </p>
        </div>
      </div>
    </section>
  );
};

export default UrgentBloodRequests;
