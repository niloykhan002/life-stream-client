import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import DonationCard from "../../../components/DonationCard";
import Loader from "../../../components/Loader";
import { useState } from "react";

const DonationRequests = () => {
  const [bloodType, setBloodType] = useState("All");
  const [urgency, setUrgency] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 20;
  const axiosPublic = useAxiosPublic();

  const bloodTypes = ["All", "A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const urgencyLevel = ["All", "critical", "urgent", "scheduled"];

  const { data, isLoading } = useQuery({
    queryKey: ["donations", bloodType, urgency, page],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-pending", {
        params: { bloodType, urgency, page, limit },
      });
      return res.data;
    },
  });

  const donations = data?.data || [];
  const totalPages = data?.totalPages || 1;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-2">
        <h2 className="text-center text-4xl font-bold">
          Donation <span className="text-primary">Requests</span>
        </h2>
        <p className="text-center text-dark2 text-base font-medium">
          Every drop counts. Find a request near you and save a life today.
        </p>
      </div>
      {/* blood types filter */}
      <div className="flex gap-4 mt-20 overflow-x-auto">
        {bloodTypes.map((t) => (
          <button
            key={t}
            onClick={() => {
              setBloodType(t);
              setPage(1);
            }}
            className={`flex-shrink-0 px-4  py-1.5 rounded-full text-sm font-semibold
                 
                transition-all duration-200 ${bloodType === t ? "bg-primary text-white border-none" : "bg-secondary text-primary border border-primary hover:bg-primary hover:text-white hover:border-none"}`}
          >
            {t}
          </button>
        ))}
      </div>
      {/* urgency filter */}
      <div className="flex gap-4 mt-5 overflow-x-auto">
        {urgencyLevel.map((u) => (
          <button
            key={u}
            onClick={() => {
              setUrgency(u);
              setPage(1);
            }}
            className={`flex-shrink-0 uppercase px-4  py-1.5 rounded-full
               text-sm font-semibold transition-all duration-200 
               ${
                 urgency === u
                   ? "bg-dark3 text-white border-none"
                   : "bg-gray-200 text-dark3 border border-dark3 hover:text-white hover:bg-dark3 hover:border-none"
               }`}
          >
            {u}
          </button>
        ))}
      </div>

      {/* cards */}

      {isLoading ? (
        <Loader fullPage={false} />
      ) : donations.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          No donation requests found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-12">
          {donations.map((donation, idx) => (
            <DonationCard key={idx} donation={donation} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
          >
            ← Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`w-9 h-9 rounded-lg text-sm font-semibold border transition-all ${
                page === p
                  ? "bg-primary text-white border-primary"
                  : "hover:bg-gray-100 text-gray-600 border-gray-300"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border text-sm font-medium disabled:opacity-40 hover:bg-gray-100 transition"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
