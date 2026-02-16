import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";

const UpdateDonations = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: info = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  const {
    _id,
    patientName,
    patientAge,
    patientGender,
    contactNumber,
    medicalCondition,
    bloodType,
    unitsNeeded,
    requiredBy,
    urgency,
    hospitalName,
    hospitalAddress,
    city,
    ward,
    contactPerson,
    additionalNotes,
    agreeTerms,
    donation_status,
    userEmail,
  } = info;
  if (isLoading) {
    return <Loader />;
  }

  const handleCreate = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    formValues.agreeTerms = agreeTerms;
    formValues.donation_status = donation_status;
    formValues.userEmail = userEmail;

    axiosSecure.put(`/donations/${_id}`, formValues).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");
        setTimeout(() => {
          navigate(-1);
        }, 1000);
        return;
      }
    });
  };
  return (
    <div>
      <Toaster />
      <div className=" bg-white p-10 rounded-lg ">
        <h2 className="text-center text-4xl font-bold mb-10">
          Update Donation Request
        </h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Patient Name</span>
            </label>
            <input
              type="text"
              name="patientName"
              className="input input-bordered"
              defaultValue={patientName}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Patient Age</span>
            </label>
            <input
              type="number"
              name="patientAge"
              className="input input-bordered"
              defaultValue={patientAge}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Gender</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="patientGender"
              defaultValue={patientGender}
            >
              <option>male</option>
              <option>female</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Number</span>
            </label>
            <input
              type="number"
              name="contactNumber"
              className="input input-bordered"
              defaultValue={contactNumber}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Medical Condition</span>
            </label>
            <input
              type="text"
              name="medicalCondition"
              className="input input-bordered"
              defaultValue={medicalCondition}
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Blood Type</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="bloodType"
              defaultValue={bloodType}
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
              <span className="label-text">Units Needed</span>
            </label>
            <input
              type="number"
              name="unitsNeeded"
              placeholder="Enter recipient name"
              defaultValue={unitsNeeded}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Required By</span>
            </label>
            <input
              type="datetime-local"
              name="requiredBy"
              defaultValue={requiredBy}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Urgency</span>
            </label>
            <select
              className="select select-bordered w-full"
              name="urgency"
              defaultValue={urgency}
            >
              <option>critical</option>
              <option>urgent</option>
              <option>scheduled</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Name</span>
            </label>
            <input
              type="text"
              name="hospitalName"
              defaultValue={hospitalName}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Hospital Address</span>
            </label>
            <input
              type="text"
              name="hospitalAddress"
              defaultValue={hospitalAddress}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">City</span>
            </label>
            <input
              type="text"
              name="city"
              defaultValue={city}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Ward</span>
            </label>
            <input
              type="text"
              name="ward"
              defaultValue={ward}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Contact Person</span>
            </label>
            <input
              type="text"
              name="contactPerson"
              defaultValue={contactPerson}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Additional Notes</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-24"
              name="additionalNotes"
              defaultValue={additionalNotes}
              required
            ></textarea>
          </div>
          <button className="btn btn-block bg-primary text-white font-bold">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateDonations;
