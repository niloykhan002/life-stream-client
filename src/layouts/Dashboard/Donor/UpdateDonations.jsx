import DatePicker from "react-datepicker";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useGetDistricts from "../../../hooks/useGetDistricts";
import { useState } from "react";
import useGetUpazila from "../../../hooks/useGetUpazila";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const UpdateDonations = () => {
  const { id } = useParams();

  const [districts] = useGetDistricts();
  const [selected, setSelected] = useState();
  const [upazila] = useGetUpazila(selected);
  const [time, setTime] = useState(new Date());
  const axiosSecure = useAxiosSecure();

  const { data: info = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });
  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleCreate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    formValues.donation_status = "pending";

    if (info.status !== "active") {
      return toast.error("You cannot update donation request");
    }

    axiosSecure.put(`/donations/${info._id}`, formValues).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        return toast.success("Donation request created successfully");
      }
    });
  };
  return (
    <div>
      <Toaster />
      <div className=" bg-base-200 p-10 rounded-lg ">
        <h2 className="text-center text-4xl font-bold mb-10">
          Update Donation Request
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Name</span>
            </label>
            <input
              type="text"
              name="requester_name"
              className="input input-bordered"
              readOnly
              defaultValue={info.requester_name}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Requester Email</span>
            </label>
            <input
              type="email"
              name="requester_email"
              className="input input-bordered"
              defaultValue={info.requester_email}
              readOnly
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              name="recipient_name"
              placeholder="Enter recipient name"
              defaultValue={info.recipient_name}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient District</span>
            </label>
            <select
              onChange={(e) => setSelected(e.target.value)}
              defaultValue={info.recipient_district}
              className="select select-bordered w-full"
              name="recipient_district"
            >
              {districts.map((district) => (
                <option key={district.id}>{district.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipient Upazila</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue={info.recipient_upazila}
              name="recipient_upazila"
            >
              {upazila.map((item) => (
                <option key={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              name="hospital_name"
              defaultValue={info.hospital_name}
              placeholder="Enter hospital name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Address</span>
            </label>
            <input
              type="text"
              name="full_address"
              defaultValue={info.full_address}
              placeholder="Enter full address"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Group</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="group"
              defaultValue={info.group}
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Date</span>
            </label>
            <input
              type="date"
              name="date"
              defaultValue={info.date}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Donation Time</span>
            </label>
            <DatePicker
              className="input input-bordered w-full"
              selected={time}
              name="time"
              onChange={(date) => setTime(date)}
              showTimeSelect
              timeIntervals={15}
              timeFormat="h:mm aa"
              dateFormat="h:mm aa"
              timeCaption="Time"
              showTimeSelectOnly
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Request Message</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              name="request_message"
              defaultValue={info.request_message}
              placeholder="Request Message"
              required
            ></textarea>
          </div>
          <button className="btn btn-block bg-primary text-white font-bold">
            Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonations;
