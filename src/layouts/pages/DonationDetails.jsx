import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  FiArrowLeft,
  FiUser,
  FiMapPin,
  FiPhone,
  FiDroplet,
  FiShare2,
  FiMessageSquare,
  FiCheckCircle,
  FiCalendar,
  FiActivity,
  FiHome,
} from "react-icons/fi";
import { GiHeartOrgan } from "react-icons/gi";
import PropTypes from "prop-types";
import { BsCircleFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import Loader from "../../components/Loader";

// ─── Countdown Hook ───────────────────────────────────────────────────────────
function useCountdown(targetDateStr) {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    if (!targetDateStr) return;
    const target = new Date(targetDateStr);

    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setTimeLeft(
        days > 0 ? `${days}d ${hours}h ${mins}m` : `${hours}h ${mins}m`,
      );
    };

    tick();
    const id = setInterval(tick, 60000);
    return () => clearInterval(id);
  }, [targetDateStr]);

  return timeLeft;
}

// ─── Info Row
function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 py-3.5 border-b border-base-200 last:border-b-0">
      <span className="flex items-center gap-2 text-dark3 font-semibold text-sm shrink-0">
        <span className="text-primary">{icon}</span>
        {label}
      </span>
      <span className="text-dark1 font-medium text-sm text-right">{value}</span>
    </div>
  );
}

const DonationDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

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

  const countdown = useCountdown(info.requiredBy);

  if (isLoading) {
    return <Loader />;
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
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Blood Donation Request – ${info.bloodType}`,
        text: `${info.unitsNeeded} units of ${info.bloodType} blood needed for ${info.patientName} at ${info.hospitalName}.`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };
  return (
    <div>
      <Toaster />
      {/* ── Page background ── */}
      <div className="min-h-screen bg-slate-100 pb-16">
        <div className="relative container mx-auto px-4 pt-8">
          {/* ── Back Button ── */}
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost rounded-full border border-base-300 bg-white hover:bg-base-200 gap-2 mb-7 font-semibold text-dark2 shadow-sm"
          >
            <FiArrowLeft size={18} />
            Back to Requests
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT / MAIN  */}
            <div className="lg:col-span-2 space-y-5">
              {/* ── Hero Card ── */}
              <div className="bg-white rounded-3xl shadow-md overflow-hidden">
                {/* Top accent bar */}
                <div className="h-1.5 w-full bg-primary" />

                <div className="p-6">
                  {/* Blood type + urgency row */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                    <div className="flex items-center gap-4">
                      <div className=" text-7xl font-bold text-primary leading-none">
                        {info.bloodType}
                      </div>
                      {/* Urgency badge */}
                      <span
                        className={`flex-shrink-0 flex items-center gap-1 border text-base font-medium px-4 py-2 rounded-full ${
                          info.urgency === "critical"
                            ? "text-red-500 bg-red-50 border-red-300"
                            : info.urgency === "urgent"
                              ? "text-yellow-500 bg-yellow-50 border-yellow-300"
                              : "text-green-500 bg-green-50 border-green-300"
                        } `}
                      >
                        <BsCircleFill />
                        {info.urgency}
                      </span>
                    </div>

                    {/* Countdown */}
                    <div className="bg-primary text-white rounded-2xl px-5 py-3 text-center min-w-[130px]">
                      <p className="text-xs opacity-80 mb-1 font-medium">
                        Time Remaining
                      </p>
                      <p className="text-heading text-2xl font-bold leading-none">
                        {countdown || "—"}
                      </p>
                    </div>
                  </div>

                  {/* Headline */}
                  <h1 className="text-heading text-2xl font-bold text-dark1 mb-2">
                    {info.urgency === "critical"
                      ? "Urgent Blood Requirement"
                      : info.urgency === "urgent"
                        ? "Blood Donation Needed"
                        : "Scheduled Blood Request"}
                  </h1>
                  <p className="text-dark3 leading-relaxed text-base mb-5">
                    {info.unitsNeeded} unit
                    {info.unitsNeeded !== "1" ? "s" : ""} of{" "}
                    <strong className="text-primary">{info.bloodType}</strong>{" "}
                    blood needed for {info.medicalCondition?.toLowerCase()} at{" "}
                    {info.hospitalName}.
                  </p>
                </div>
              </div>

              {/* ── Patient Info Card ── */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 rounded-full bg-primary" />
                  <p className="text-2xl font-bold text-primary">
                    Patient Information
                  </p>
                </div>
                <div className="bg-slate-100 rounded-2xl border-l-4 border-primary p-5">
                  <h3 className="text-heading text-xl font-bold text-dark1 mb-2">
                    {info.patientName}
                  </h3>

                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="flex items-center gap-1.5 text-dark3 text-sm">
                      <FiUser size={15} className="text-primary" />
                      {info.patientAge} years old
                    </span>
                    <span className="flex items-center gap-1.5 text-dark3 text-sm capitalize">
                      <FiActivity size={15} className="text-primary" />
                      {info.patientGender}
                    </span>
                    <span className="flex items-center gap-1.5 text-dark3 text-sm">
                      <FiPhone size={15} className="text-primary" />
                      {info.contactNumber}
                    </span>
                  </div>

                  <div className="text-dark2 text-sm leading-relaxed">
                    <span className="font-semibold text-dark1">
                      Medical Condition:{" "}
                    </span>
                    {info.medicalCondition}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div className="bg-slate-100 rounded-2xl p-4 text-center ">
                    <FiDroplet
                      size={22}
                      className="text-primary mx-auto mb-1"
                    />
                    <p className="text-xs text-dark3 font-semibold mb-1">
                      Blood Type
                    </p>
                    <p className="text-heading text-3xl font-bold text-primary">
                      {info.bloodType}
                    </p>
                  </div>
                  <div className="bg-slate-100 rounded-2xl p-4 text-center">
                    <GiHeartOrgan
                      size={22}
                      className="text-primary mx-auto mb-1"
                    />
                    <p className="text-xs text-dark3 font-semibold mb-1">
                      Units Required
                    </p>
                    <p className="text-heading text-3xl font-bold text-primary">
                      {info.unitsNeeded}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Hospital Info Card ── */}
              <div className="bg-white rounded-3xl shadow-md p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-1 h-8 rounded-full bg-primary" />
                  <p className="text-2xl font-bold text-primary">
                    Hospital Information
                  </p>
                </div>

                <div className="divide-y divide-base-200">
                  <InfoRow
                    icon={<FiHome size={15} />}
                    label="Hospital"
                    value={info.hospitalName}
                  />
                  <InfoRow
                    icon={<FiMapPin size={15} />}
                    label="Address"
                    value={info.hospitalAddress}
                  />
                  <InfoRow
                    icon={<FiMapPin size={15} />}
                    label="City"
                    value={info.city}
                  />
                  <InfoRow
                    icon={<FiActivity size={15} />}
                    label="Ward / Dept"
                    value={info.ward}
                  />
                  <InfoRow
                    icon={<FiUser size={15} />}
                    label="Contact Person"
                    value={info.contactPerson}
                  />
                  <InfoRow
                    icon={<FiPhone size={15} />}
                    label="Phone"
                    value={`+${info.contactNumber}`}
                  />
                </div>
              </div>

              {/* ── Additional Notes ── */}
              {info.additionalNotes && (
                <div className="bg-white rounded-3xl shadow-md p-6">
                  <div className="bg-slate-100 rounded-2xl p-5">
                    <p className="text-heading font-bold text-dark1 mb-2 flex items-center gap-2">
                      <FiMessageSquare className="text-primary" size={18} />
                      Additional Instructions for Donors
                    </p>
                    <p className="text-dark2 text-sm leading-relaxed">
                      {info.additionalNotes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/*  RIGHT / SIDEBAR  */}
            <div className="space-y-5">
              {/* ── Action Buttons ── */}
              <div className="bg-white rounded-3xl shadow-md p-5 space-y-3">
                <button
                  onClick={handleDonate}
                  className="btn bg-primary border-none rounded-full w-full font-bold text-white gap-2 shadow-md hover:bg-secondary hover:text-primary hover:shadow-lg transition-all duration-300"
                >
                  <FiCheckCircle size={18} />I Can Donate
                </button>

                <button
                  onClick={handleShare}
                  className="btn rounded-full w-full font-bold gap-2 border-primary text-primary hover:bg-primary hover:text-white hover:border-none border-2 bg-white transition-colors"
                >
                  <FiShare2 size={18} />
                  Share Request
                </button>

                <Link
                  to={"/contact"}
                  className="btn rounded-full w-full font-bold gap-2 bg-base-200 text-dark2 hover:bg-base-300 border-0"
                >
                  <FiMessageSquare size={18} />
                  Send Message
                </Link>
              </div>

              {/* ── Quick Info ── */}
              <div className="bg-white rounded-3xl p-5">
                <h3 className="text-heading text-lg font-bold text-dark1 mb-4">
                  Quick Information
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-base-100 rounded-2xl p-3 text-center border border-base-200">
                    <FiDroplet
                      size={22}
                      className="text-primary mx-auto mb-1"
                    />
                    <p className="text-xs text-dark3 font-semibold mb-1">
                      Blood Type
                    </p>
                    <p className="text-heading text-2xl font-bold text-primary">
                      {info.bloodType}
                    </p>
                  </div>
                  <div className="bg-base-100 rounded-2xl p-3 text-center border border-base-200">
                    <FiCalendar
                      size={22}
                      className="text-primary mx-auto mb-1"
                    />
                    <p className="text-xs text-dark3 font-semibold mb-1">
                      Units
                    </p>
                    <p className="text-heading text-2xl font-bold text-primary">
                      {info.unitsNeeded}
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Donor Requirements ── */}
              <div className="bg-white rounded-3xl shadow-md p-5">
                <h3 className="text-heading text-lg font-bold text-dark1 mb-4">
                  Donor Requirements
                </h3>
                <ul className="space-y-3">
                  {[
                    "Age between 18–65 years",
                    "Weight above 50 kg (110 lbs)",
                    "Good general health",
                    "Valid ID proof required",
                    "No recent infections",
                  ].map((req) => (
                    <li
                      key={req}
                      className="flex items-start gap-2.5 text-sm text-dark2"
                    >
                      <FiCheckCircle
                        size={16}
                        className="text-success shrink-0 mt-0.5"
                      />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* ── Hero Quote Card ── */}
              <div className="bg-gradient-to-br from-secondary/20 to-primary/10 border border-secondary/30 rounded-3xl p-5 text-center shadow-sm">
                <div className="text-4xl flex justify-center text-primary mb-3">
                  <FaHeart />
                </div>
                <h3 className="text-heading text-lg font-bold text-dark1 mb-2">
                  Every Drop Counts
                </h3>
                <p className="text-dark3 text-sm leading-relaxed">
                  Your donation can save up to 3 lives. Be a hero today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
InfoRow.propTypes = {
  icon: PropTypes.text,
  label: PropTypes.text,
  value: PropTypes.text,
};

export default DonationDetails;
