import PropTypes from "prop-types";
import { BsCircleFill } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { GoClock } from "react-icons/go";
import { IoChevronForward } from "react-icons/io5";
import { LuDroplets, LuHospital } from "react-icons/lu";

const DonationCard = ({ donation }) => {
  const {
    patientName,
    patientAge,
    patientGender,
    medicalCondition,
    bloodType,
    unitsNeeded,
    requiredBy,
    urgency,
    hospitalName,
    city,
    ward,
    contactPerson,
  } = donation;

  const formattedDate = new Date(requiredBy).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = new Date(requiredBy).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className="relative flex flex-col justify-between bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden max-w-sm w-full">
      {/* Top accent bar */}
      <div className="h-1.5 w-full bg-primary" />

      {/* Card Header */}
      <div className="px-5 pt-4 pb-3 flex items-start justify-between gap-3">
        {/* Blood type badge  */}
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shadow-sm">
              <span className="font-bold text-primary font-heading text-xl leading-none">
                {bloodType}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
              <LuDroplets className="w-2.5 h-2.5 text-white" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold font-heading text-dark1 text-base leading-tight">
              {patientName}
            </h3>
            <p className="text-xs text-dark2 mt-0.5 capitalize">
              {patientAge} yrs • {patientGender}
            </p>
            <p className="text-xs text-dark3 mt-1 font-medium">
              {medicalCondition}
            </p>
          </div>
        </div>

        {/* Urgency badge */}
        <span
          className={`flex-shrink-0 flex items-center gap-1 border text-xs font-semibold px-2 py-1 rounded-full ${
            urgency === "critical"
              ? "text-red-500 bg-red-50 border-red-300"
              : urgency === "urgent"
                ? "text-yellow-500 bg-yellow-50 border-yellow-300"
                : "text-green-500 bg-green-50 border-green-300"
          } `}
        >
          <BsCircleFill className={`text-md `} />
          {urgency}
        </span>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-slate-100" />

      {/* Info Rows */}
      <div className="px-5 py-3 space-y-2.5">
        {/* Hospital */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <LuHospital className="w-3.5 h-3.5 text-dark3" />
          </div>
          <div>
            <p className="text-sm font-medium text-dark1 leading-tight">
              {hospitalName}
            </p>
            <p className="text-xs text-dark2 mt-0.5">
              {ward} • {city}
            </p>
          </div>
        </div>

        {/* Required by */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <GoClock className="w-3.5 h-3.5 text-dark3" />
          </div>
          <div>
            <p className="text-sm text-dark1 font-medium leading-tight">
              {formattedDate} at {formattedTime}
            </p>
            <p className="text-xs text-dark2 mt-0.5">Required by</p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <FaRegUser className="w-3.5 h-3.5 text-dark3" />
          </div>
          <div>
            <p className="text-sm text-dark1 font-medium leading-tight">
              {contactPerson}
            </p>
            <p className="text-xs text-dark2 mt-0.5">Contact person</p>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="mx-5 border-t border-slate-100" />

      {/* Footer */}
      <div className="px-5 py-3.5 flex items-center justify-between gap-1">
        {/* Units needed */}
        <div className="flex flex-wrap gap-1.5">
          {[...Array(Number(unitsNeeded))].map((_, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-full border-primary bg-secondary border-2 flex items-center justify-center"
            >
              <LuDroplets className="w-3 h-3 text-dark1" />
            </div>
          ))}
        </div>
        <span className="text-xs text-dark3 ml-1 font-medium">
          {unitsNeeded} unit{Number(unitsNeeded) > 1 ? "s" : ""} <br /> needed
        </span>

        {/* View Details button */}
        <button className="btn btn-sm border-none bg-primary gap-1 hover:bg-secondary hover:text-primary  text-white text-xs font-semibold rounded-xl transition-all duration-300">
          View Details
          <IoChevronForward className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

DonationCard.propTypes = {
  donation: PropTypes.object,
};

export default DonationCard;
