import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../components/Loader";
import { IoArrowBack } from "react-icons/io5";
import PropTypes from "prop-types";

const Section = ({ title, children }) => (
  <div className="bg-slate-100 rounded-xl p-5">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-1 h-6 rounded-full bg-primary" />
      <h3 className="text-primary font-semibold text-base">{title}</h3>
    </div>
    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

const Field = ({ label, children, className = "" }) => (
  <div className={`form-control ${className}`}>
    <label className="label">
      <span className="label-text text-slate-500 text-sm">{label}</span>
    </label>
    {children}
  </div>
);

Field.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

const UpdateDonations = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const { data: info = {}, isLoading } = useQuery({
    queryKey: ["donation", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader fullPage={false} />;

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);

    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());

    formValues.agreeTerms = agreeTerms;
    formValues.donation_status = donation_status;
    formValues.userEmail = userEmail;

    try {
      const res = await axiosSecure.put(`/donations/${_id}`, formValues);
      if (res.data.modifiedCount > 0) {
        toast.success("Donation request updated successfully");
        setTimeout(() => navigate(-1), 1000);
      } else {
        toast("No changes were made", { icon: "ℹ️" });
      }
    } catch {
      toast.error("Update failed. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white p-6 md:p-10 rounded-lg">
      <Toaster />

      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn btn-sm btn-ghost"
        >
          <IoArrowBack size={18} />
        </button>
        <div>
          <h2 className="text-3xl font-bold">
            Update Donation <span className="text-primary">Request</span>
          </h2>
          <p className="text-slate-400 text-sm mt-0.5">
            Edit the details below and save your changes
          </p>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="space-y-6">
        {/* Section: Patient Info */}
        <Section title="Patient Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Patient Name">
              <input
                type="text"
                name="patientName"
                className="input input-bordered w-full"
                defaultValue={patientName}
                required
              />
            </Field>

            <Field label="Patient Age">
              <input
                type="number"
                name="patientAge"
                className="input input-bordered w-full"
                defaultValue={patientAge}
                min={1}
                max={120}
                required
              />
            </Field>

            <Field label="Gender">
              <select
                name="patientGender"
                className="select select-bordered w-full"
                defaultValue={patientGender}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </Field>

            <Field label="Contact Number">
              <input
                type="tel"
                name="contactNumber"
                className="input input-bordered w-full"
                defaultValue={contactNumber}
                required
              />
            </Field>

            <Field label="Medical Condition" className="sm:col-span-2">
              <input
                type="text"
                name="medicalCondition"
                className="input input-bordered w-full"
                defaultValue={medicalCondition}
                required
              />
            </Field>
          </div>
        </Section>

        {/* Section: Blood Requirement */}
        <Section title="Blood Requirement">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Blood Type">
              <select
                name="bloodType"
                className="select select-bordered w-full"
                defaultValue={bloodType}
              >
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (bg) => (
                    <option key={bg}>{bg}</option>
                  ),
                )}
              </select>
            </Field>

            <Field label="Units Needed">
              <input
                type="number"
                name="unitsNeeded"
                className="input input-bordered w-full"
                defaultValue={unitsNeeded}
                min={1}
                required
              />
            </Field>

            <Field label="Required By">
              <input
                type="datetime-local"
                name="requiredBy"
                className="input input-bordered w-full"
                defaultValue={requiredBy}
                required
              />
            </Field>

            <Field label="Urgency">
              <select
                name="urgency"
                className="select select-bordered w-full"
                defaultValue={urgency}
              >
                <option value="critical">Critical</option>
                <option value="urgent">Urgent</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </Field>
          </div>
        </Section>

        {/* Section: Hospital & Location */}
        <Section title="Hospital & Location">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Hospital Name">
              <input
                type="text"
                name="hospitalName"
                className="input input-bordered w-full"
                defaultValue={hospitalName}
                required
              />
            </Field>

            <Field label="Hospital Address">
              <input
                type="text"
                name="hospitalAddress"
                className="input input-bordered w-full"
                defaultValue={hospitalAddress}
                required
              />
            </Field>

            <Field label="City">
              <input
                type="text"
                name="city"
                className="input input-bordered w-full"
                defaultValue={city}
                required
              />
            </Field>

            <Field label="Ward">
              <input
                type="text"
                name="ward"
                className="input input-bordered w-full"
                defaultValue={ward}
                required
              />
            </Field>
          </div>
        </Section>

        {/* Section: Contact & Notes */}
        <Section title="Contact & Notes">
          <div className="grid grid-cols-1 gap-4">
            <Field label="Contact Person">
              <input
                type="text"
                name="contactPerson"
                className="input input-bordered w-full"
                defaultValue={contactPerson}
                required
              />
            </Field>

            <Field label="Additional Notes">
              <textarea
                name="additionalNotes"
                className="textarea textarea-bordered w-full h-28"
                defaultValue={additionalNotes}
                required
              />
            </Field>
          </div>
        </Section>

        {/* Action buttons */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={saving}
            className="btn btn-ghost border border-slate-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn bg-primary text-white border-none px-8 disabled:opacity-60"
          >
            {saving ? (
              <>
                <span className="loading loading-spinner loading-xs" />
                Saving...
              </>
            ) : (
              "Update Request"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateDonations;
