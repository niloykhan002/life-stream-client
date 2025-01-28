import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("all");

  const {
    data: donations = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donations", status],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-donations", {
        params: { status: status },
      });
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donations/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your donation request has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  const handleDone = (id) => {
    const updateInfo = { donation_status: "done" };
    axiosSecure.patch(`/donations/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };
  const handleCancel = (id) => {
    const updateInfo = { donation_status: "canceled" };
    axiosSecure.patch(`/donations/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      refetch();
    });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2 className="text-center text-4xl font-bold mb-10 mt-12">
        Donation <span className="text-primary">Requests</span>
      </h2>
      <div className="flex justify-end mr-4">
        <label className="form-control w-fit my-12">
          <div className="label">
            <span className="label-text">Filter</span>
          </div>
          <select
            onChange={(e) => setStatus(e.target.value)}
            className="select select-bordered"
            name="status"
          >
            <option defaultChecked>all</option>
            <option>pending</option>
            <option>inprogress</option>
            <option>done</option>
            <option>canceled</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
              <th>Donor Information</th>
              <th className="md:text-center">Action</th>
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
                <td>{donation.date}</td>
                <td>{donation.time}</td>
                <td>{donation.group}</td>
                <td>
                  {donation.donation_status === "inprogress" ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDone(donation._id)}
                        className="btn btn-neutral btn-xs"
                      >
                        Done
                      </button>
                      <button
                        onClick={() => handleCancel(donation._id)}
                        className="btn bg-primary text-white btn-xs"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    donation.donation_status
                  )}
                </td>
                <td>
                  {donation.donation_status === "inprogress" ? (
                    <div className="flex flex-col text-xs">
                      <p>Name: {donation.requester_name}</p>{" "}
                      <p>Email: {donation.requester_email}</p>
                    </div>
                  ) : (
                    "None"
                  )}
                </td>

                <td className="flex md:justify-end gap-4">
                  <div className="flex items-center  gap-1">
                    <div className="flex items-center gap-1">
                      <Link
                        to={`/dashboard/donations/${donation._id}`}
                        className="btn btn-neutral btn-xs"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(donation._id)}
                        className="btn bg-primary text-white btn-xs"
                      >
                        Delete
                      </button>
                    </div>
                    <Link
                      to={`/donation-details/${donation._id}`}
                      className="btn btn-neutral btn-xs"
                    >
                      View
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllDonationRequests;
