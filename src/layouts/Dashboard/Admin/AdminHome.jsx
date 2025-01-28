import { FaUser } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import { FaSackDollar } from "react-icons/fa6";
import { BiSolidDonateHeart } from "react-icons/bi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: donors = [] } = useQuery({
    queryKey: ["donors"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/donors");
      return res.data;
    },
  });
  const { data: donationRequests = [] } = useQuery({
    queryKey: ["donationRequests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donations", {
        params: { status: "all" },
      });
      return res.data;
    },
  });
  return (
    <div>
      <h2 className="text-3xl font-bold ">Welcome {user.displayName}</h2>
      <h2 className="text-center text-3xl font-bold uppercase my-12 text-primary">
        Statistics
      </h2>
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-10 p-10 bg-base-200 rounded-xl w-full">
          <div className="bg-primary p-4 rounded-xl">
            <FaUser className="text-xl text-white" />
          </div>
          <div className="flex flex-col  gap-2">
            <h2 className="text-xl ">Total Donors</h2>
            <p className="text-green-600 text-2xl font-semibold">
              {donors.length}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-10 p-10 bg-base-200 rounded-xl w-full">
          <div className="bg-primary p-4 rounded-xl">
            <FaSackDollar className="text-xl text-white" />
          </div>
          <div className="flex flex-col  gap-2">
            <h2 className="text-xl">Total Funding</h2>
            <p className="text-green-600 text-2xl font-semibold">$23,000</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center p-10 bg-base-200 rounded-xl  mt-8">
        <div className="flex items-center gap-10 ">
          <div className="bg-primary p-4 rounded-xl">
            <BiSolidDonateHeart className="text-xl text-white" />
          </div>
          <div className="flex flex-col  gap-2">
            <h2 className="text-xl">Total Blood Donation Request</h2>
            <p className="text-green-600 text-2xl font-semibold">
              {donationRequests.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
