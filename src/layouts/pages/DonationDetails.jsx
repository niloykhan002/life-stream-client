import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const DonationDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: info = {},
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleDonate = (e) => {
    e.preventDefault();
    if (info.donation_status !== "pending") {
      return toast.error("You cannot donate this");
    }
    const updateInfo = { donation_status: "inprogress" };
    axiosSecure.patch(`/donations/${id}`, updateInfo).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        return toast.success("Your donation is in progress");
      }
      refetch();
    });
  };
  return (
    <div className="py-20">
      <h1 className="text-center font-bold text-4xl pb-12">
        Donation <span className="text-primary">Details</span>
      </h1>
      <Toaster />
      <div className=" bg-base-100 w-fit mx-auto border p-8 rounded-2xl">
        <div className="card-body">
          <p>
            <span className="font-bold">Requester Name:</span>{" "}
            {info.requester_name}
          </p>
          <p>
            <span className="font-bold">Requester Email:</span>{" "}
            {info.requester_email}
          </p>
          <p>
            <span className="font-bold">Recipient Name:</span>{" "}
            {info.recipient_name}
          </p>
          <p>
            <span className="font-bold">Recipient District:</span>{" "}
            {info.recipient_district}
          </p>
          <p>
            <span className="font-bold">Recipient Upazila:</span>{" "}
            {info.recipient_upazila}
          </p>
          <p>
            <span className="font-bold">Hospital Name:</span>{" "}
            {info.hospital_name}
          </p>
          <p>
            <span className="font-bold">Full Address:</span> {info.full_address}
          </p>
          <p>
            <span className="font-bold">Blood Group:</span> {info.group}
          </p>
          <p>
            <span className="font-bold">Date:</span> {info.date}
          </p>
          <p>
            <span className="font-bold">Time:</span> {info.time}
          </p>
          <p>
            <span className="font-bold">Message:</span> {info.request_message}
          </p>
          <p>
            <span className="font-bold">Donation Status:</span>{" "}
            <span
              className={
                info.donation_status === "pending"
                  ? "text-red-600"
                  : info.donation_status === "inprogress"
                    ? "text-green-600"
                    : ""
              }
            >
              {info.donation_status}
            </span>
          </p>
          <div>
            <button
              className="btn bg-primary border-none text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Donate
            </button>

            {/* Modal */}
            {isModalOpen && (
              <div className="modal modal-open">
                <div className="modal-box">
                  <h2 className="font-bold text-lg">Submit Your Assignment</h2>
                  <form onSubmit={handleDonate} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Donor Name</span>
                      </label>
                      <input
                        type="text"
                        name="donor_name"
                        className="input input-bordered"
                        defaultValue={user.displayName}
                        readOnly
                        required
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Donor Email</span>
                      </label>
                      <input
                        type="text"
                        name="donor_email"
                        className="input input-bordered"
                        defaultValue={user.email}
                        readOnly
                        required
                      />
                    </div>

                    <div className="modal-action">
                      <button
                        type="submit"
                        className="btn btn-success text-white"
                      >
                        Confirm
                      </button>

                      <button
                        type="button"
                        className="btn btn-error text-white"
                        onClick={() => setIsModalOpen(false)}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationDetails;
