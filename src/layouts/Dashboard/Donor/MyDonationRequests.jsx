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
        params: { email: user?.email, status: status },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="bg-white rounded-lg min-h-screen">
      <h2 className="text-center text-4xl font-bold pt-10">
        Donation <span className="text-primary">Requests</span>
      </h2>
      <div className="flex justify-end mr-4">
        <label className="form-control w-fit my-12">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select
            onChange={(e) => setStatus(e.target.value.toLowerCase())}
            className="select select-bordered"
            name="status"
          >
            <option defaultChecked>All</option>
            <option>Pending</option>
            <option>Inprogress</option>
            <option>Done</option>
            <option>Canceled</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-pin-rows">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Recipient Name</th>
              <th>Donation Date</th>
              <th>Hospital Name</th>
              <th>Hospital Address</th>
              <th>Blood Type</th>
              <th>Donation Status</th>
              <th>Donor Information</th>
              <th className="md:text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row */}
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
    </div>
  );
};

export default MyDonationRequests;
