import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";

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
    <div className="mt-40 mb-20 container mx-auto">
      <h2 className="text-center text-4xl font-bold mb-10 mt-12">
        Donation <span className="text-primary">Requests</span>
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Recipient Location</th>
              <th>Blood Group</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {donations.map((donation, index) => (
              <tr key={donation._id}>
                <th>{index + 1}</th>
                <td>{donation.recipient_name}</td>
                <td>
                  {donation.recipient_upazila}, {donation.recipient_district}{" "}
                </td>
                <td>{donation.group}</td>
                <td>{donation.date}</td>
                <td>{donation.time}</td>

                <td>
                  <Link
                    to={`/donation-details/${donation._id}`}
                    className="btn btn-neutral btn-xs"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationRequests;
