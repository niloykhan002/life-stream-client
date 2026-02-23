import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "../../../components/Loader";
import DonationRequestManagement from "../../../components/DonationRequestManagement";

const MyDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [status, setStatus] = useState("all");

  const {
    refetch,
    data: donations = [],
    isLoading,
  } = useQuery({
    queryKey: ["donations", user?.email, status],
    queryFn: async () => {
      const res = await axiosSecure.get("/donations", {
        params: { email: user?.email, status },
      });
      return res.data;
    },
  });

  const stats = [
    { label: "Total", value: donations.length, color: "text-dark1" },
    {
      label: "Pending",
      value: donations.filter((d) => d.donation_status === "pending").length,
      color: "text-amber-500",
    },
    {
      label: "In Progress",
      value: donations.filter((d) => d.donation_status === "inprogress").length,
      color: "text-blue-500",
    },
    {
      label: "Done",
      value: donations.filter((d) => d.donation_status === "done").length,
      color: "text-green-500",
    },
  ];

  if (isLoading) return <Loader fullPage={false} />;

  return (
    <div className="bg-white rounded-lg min-h-screen p-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold">
            My Donation <span className="text-primary">Requests</span>
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage and track all your donation requests
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 font-medium">Filter by:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value.toLowerCase())}
            className="select select-bordered select-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
            <option value="canceled">Canceled</option>
          </select>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center bg-slate-100 rounded-xl px-4 py-3"
          >
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-dark3 text-xs mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table or empty state */}
      {donations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <svg
            viewBox="0 0 24 24"
            className="w-14 h-14 mb-4 text-slate-200"
            fill="currentColor"
          >
            <path d="M12 2C8.5 7 4 11.5 4 15.5a8 8 0 0016 0C20 11.5 15.5 7 12 2z" />
          </svg>
          <p className="text-slate-500 font-semibold text-lg">
            No requests found
          </p>
          <p className="text-slate-400 text-sm mt-1">
            {status === "all"
              ? "You haven't made any donation requests yet."
              : `No requests with status "${status}".`}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-100">
          <table className="table table-pin-rows">
            <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
              <tr>
                <th>#</th>
                <th>Recipient Name</th>
                <th>Donation Date</th>
                <th>Hospital Name</th>
                <th>Hospital Address</th>
                <th>Blood Type</th>
                <th>Status</th>
                <th>Donor Info</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <DonationRequestManagement
                  key={donation._id}
                  donation={donation}
                  index={index}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
