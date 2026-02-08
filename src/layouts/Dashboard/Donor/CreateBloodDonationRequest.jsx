import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const CreateBloodDonationRequest = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    patientGender: "",
    contactNumber: "",
    medicalCondition: "",
    bloodType: "",
    unitsNeeded: "",
    requiredBy: "",
    urgency: "",
    hospitalName: "",
    hospitalAddress: "",
    city: "",
    ward: "",
    contactPerson: "",
    additionalNotes: "",
    agreeTerms: false,
  });

  const totalSteps = 4;
  const bloodTypes = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
  const axiosSecure = useAxiosSecure();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateStep = (step) => {
    const requiredFields = {
      1: [
        "patientName",
        "patientAge",
        "patientGender",
        "contactNumber",
        "medicalCondition",
      ],
      2: ["bloodType", "unitsNeeded", "requiredBy", "urgency"],
      3: ["hospitalName", "hospitalAddress", "city", "contactPerson"],
      4: ["agreeTerms"],
    };

    const fields = requiredFields[step];
    return fields.every((field) => {
      if (field === "agreeTerms") return formData[field] === true;
      return formData[field] && formData[field].toString().trim() !== "";
    });
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
      alert("Please fill in all required fields before proceeding.");
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.donation_status = "pending";
    formData.userEmail = user.email;
    if (validateStep(4)) {
      axiosSecure.post("/donations", formData).then((res) => {
        console.log(res.data);
        toast.success("Donation request created successfully");
      });
      setShowSuccess(true);
    } else {
      alert("Please accept the terms and conditions.");
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      patientName: "",
      patientAge: "",
      patientGender: "",
      contactNumber: "",
      medicalCondition: "",
      bloodType: "",
      unitsNeeded: "",
      requiredBy: "",
      urgency: "",
      hospitalName: "",
      hospitalAddress: "",
      city: "",
      ward: "",
      contactPerson: "",
      additionalNotes: "",
      agreeTerms: false,
    });
  };
  return (
    <div>
      <Toaster />
      <div className="flex flex-col items-center justify-center">
        <Link
          to={"/"}
          className="btn font-heading border-none btn-ghost hover:bg-transparent font-bold text-lg uppercase md:text-2xl"
        >
          <div className="h-8 w-8">
            <img src={logo} alt="" />
          </div>
          <div>
            Life <span className="text-primary">Stream</span>
          </div>
        </Link>
        <div>
          <h1 className="text-center text-3xl font-bold font-heading my-2 text-dark1">
            Create Blood Donation Request
          </h1>
          <p className="text-center text-dark2">
            Help us connect you with potential donors. Fill out this form to{" "}
            <br />
            submit your urgent blood requirement.
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-10 border-t-4 my-12 border-primary">
        {!showSuccess ? (
          <>
            <div className="mb-12">
              <ul className="steps w-full steps-vertical lg:steps-horizontal">
                <li
                  className={`step ${currentStep >= 1 ? "step-neutral" : ""}`}
                >
                  Patient Info
                </li>
                <li
                  className={`step ${currentStep >= 2 ? "step-neutral" : ""}`}
                >
                  Blood Details
                </li>
                <li
                  className={`step ${currentStep >= 3 ? "step-neutral" : ""}`}
                >
                  Hospital Info
                </li>
                <li
                  className={`step ${currentStep == 4 ? "step-neutral" : ""}`}
                >
                  Review
                </li>
              </ul>
            </div>
            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <div className="animate-fade-in">
                  <h3 className="text-3xl font-bold text-dark1 mb-2">
                    Patient Information
                  </h3>
                  <p className="text-dark2 mb-6">
                    Tell us about the patient who needs blood
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-dark1">
                          Patient Name <span className="text-primary">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-dark1">
                          Age <span className="text-primary">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleInputChange}
                        placeholder="25"
                        min="0"
                        max="120"
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          Gender <span className="text-primary">*</span>
                        </span>
                      </label>
                      <select
                        name="patientGender"
                        value={formData.patientGender}
                        onChange={handleInputChange}
                        className="select select-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          Contact Number <span className="text-primary">*</span>
                        </span>
                      </label>
                      <PhoneInput
                        country="bd"
                        type="tel"
                        enableSearch={true}
                        onlyCountries={["bd"]}
                        countryCodeEditable={false}
                        name="contactNumber"
                        value={formData.contactNumber}
                        placeholder="+880 1XXX-XXXXXX"
                        onChange={(phone) =>
                          setFormData((prev) => ({
                            ...prev,
                            contactNumber: phone,
                          }))
                        }
                        inputStyle={{
                          width: "100%",
                          height: "48px",
                          backgroundColor: "#f1f5f9",
                          border: "2px solid #e2e8f0",
                          borderRadius: "0.75rem",
                          fontSize: "1rem",
                          paddingLeft: "48px",
                        }}
                        buttonStyle={{
                          backgroundColor: "#f1f5f9",
                          border: "2px solid #e2e8f0",
                          borderRadius: "0.75rem 0 0 0.75rem",
                          borderRight: "none",
                        }}
                        containerStyle={{
                          width: "100%",
                        }}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Medical Condition / Reason for Request{" "}
                        <span className="text-primary">*</span>
                      </span>
                    </label>
                    <textarea
                      name="medicalCondition"
                      value={formData.medicalCondition}
                      onChange={handleInputChange}
                      placeholder="Please describe the medical condition or reason for blood requirement..."
                      className="textarea textarea-bordered h-32 bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl resize-y"
                      required
                    ></textarea>
                    <label className="label">
                      <span className="label-text-alt text-[#5A4438] italic">
                        This helps donors understand the urgency and importance
                        of the request
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 2: Blood Details */}
              {currentStep === 2 && (
                <div className="animate-fade-in">
                  <h3 className="text-3xl font-bold text-[#2C1810] mb-2">
                    Blood Requirement Details
                  </h3>
                  <p className="text-[#5A4438] mb-6">
                    Specify the blood type and quantity needed
                  </p>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Blood Type Required{" "}
                        <span className="text-primary">*</span>
                      </span>
                    </label>
                    <div className="grid grid-cols-4 gap-4">
                      {bloodTypes.map((type) => (
                        <label
                          key={type}
                          className={`cursor-pointer border-2 rounded-xl p-4 md:p-6 text-center font-bold text-2xl md:text-3xl transition-all hover:scale-105 ${
                            formData.bloodType === type
                              ? "bg-primary text-white border-[#C41E3A] shadow-lg"
                              : "bg-slate-100 text-[#2C1810]  hover:border-[#C41E3A]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="bloodType"
                            value={type}
                            checked={formData.bloodType === type}
                            onChange={handleInputChange}
                            className="hidden"
                            required
                          />
                          {type}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          Units Required <span className="text-primary">*</span>
                        </span>
                      </label>
                      <input
                        type="number"
                        name="unitsNeeded"
                        value={formData.unitsNeeded}
                        onChange={handleInputChange}
                        placeholder="e.g., 3"
                        min="1"
                        max="20"
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      />
                      <label className="label">
                        <span className="label-text-alt text-[#5A4438] italic">
                          1 unit = approximately 450ml
                        </span>
                      </label>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          Required By <span className="text-primary">*</span>
                        </span>
                      </label>
                      <input
                        type="datetime-local"
                        name="requiredBy"
                        value={formData.requiredBy}
                        onChange={handleInputChange}
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Urgency Level <span className="text-primary">*</span>
                      </span>
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label
                        className={`cursor-pointer border-2 rounded-xl p-6 transition-all hover:scale-105 ${
                          formData.urgency === "critical"
                            ? "bg-red-50 border-red-300 shadow-lg"
                            : "bg-slate-100  hover:border-[#C41E3A]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value="critical"
                          checked={formData.urgency === "critical"}
                          onChange={handleInputChange}
                          className="hidden"
                          required
                        />
                        <div className="text-center">
                          <div className="text-3xl mb-2">🔴</div>
                          <div className="font-bold text-lg mb-1">Critical</div>
                          <div className="text-sm text-[#5A4438]">
                            Needed within 24 hours
                          </div>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer border-2 rounded-xl p-6 transition-all hover:scale-105 ${
                          formData.urgency === "urgent"
                            ? "bg-yellow-50 border-yellow-300 shadow-lg"
                            : "bg-slate-100  hover:border-[#C41E3A]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value="urgent"
                          checked={formData.urgency === "urgent"}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-center">
                          <div className="text-3xl mb-2">🟡</div>
                          <div className="font-bold text-lg mb-1">Urgent</div>
                          <div className="text-sm text-[#5A4438]">
                            Needed within 2-3 days
                          </div>
                        </div>
                      </label>

                      <label
                        className={`cursor-pointer border-2 rounded-xl p-6 transition-all hover:scale-105 ${
                          formData.urgency === "normal"
                            ? "bg-green-50 border-green-300 shadow-lg"
                            : "bg-slate-100  hover:border-[#C41E3A]"
                        }`}
                      >
                        <input
                          type="radio"
                          name="urgency"
                          value="normal"
                          checked={formData.urgency === "normal"}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <div className="text-center">
                          <div className="text-3xl mb-2">🟢</div>
                          <div className="font-bold text-lg mb-1">
                            Scheduled
                          </div>
                          <div className="text-sm text-[#5A4438]">
                            Planned procedure
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Hospital Information */}
              {currentStep === 3 && (
                <div className="animate-fade-in">
                  <h3 className="text-3xl font-bold text-[#2C1810] mb-2">
                    Hospital & Location Details
                  </h3>
                  <p className="text-[#5A4438] mb-6">
                    Where should donors go to donate?
                  </p>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Hospital Name <span className="text-primary">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleInputChange}
                      placeholder="City General Hospital"
                      className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                      required
                    />
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Hospital Address <span className="text-primary">*</span>
                      </span>
                    </label>
                    <textarea
                      name="hospitalAddress"
                      value={formData.hospitalAddress}
                      onChange={handleInputChange}
                      placeholder="Street address, City, State/Province"
                      className="textarea textarea-bordered h-24 bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl resize-y"
                      required
                    ></textarea>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          City <span className="text-primary">*</span>
                        </span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="Dhaka"
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold text-[#2C1810]">
                          Ward/Department
                        </span>
                      </label>
                      <input
                        type="text"
                        name="ward"
                        value={formData.ward}
                        onChange={handleInputChange}
                        placeholder="e.g., ICU, Emergency"
                        className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Contact Person at Hospital{" "}
                        <span className="text-primary">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleInputChange}
                      placeholder="Dr. Name or Nurse Name"
                      className="input input-bordered bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl"
                      required
                    />
                  </div>

                  <div className="form-control mb-6">
                    <label className="label">
                      <span className="label-text font-semibold text-[#2C1810]">
                        Additional Instructions for Donors
                      </span>
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions, visiting hours, parking information, etc."
                      className="textarea textarea-bordered h-24 bg-slate-100 border-2  focus:border-secondary focus:bg-white focus:outline-none rounded-xl resize-y"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 4: Review */}
              {currentStep === 4 && (
                <div className="animate-fade-in">
                  <h3 className="text-3xl font-bold text-dark1 mb-2">
                    Review Your Request
                  </h3>
                  <p className="text-dark2 mb-6">
                    Please review all information before submitting
                  </p>

                  <div className="bg-slate-100 rounded-xl p-8">
                    {/* Patient Information */}
                    <h4 className="text-2xl font-bold text-primary mb-6">
                      Patient Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Name:</span>
                        <span>{formData.patientName}</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Age:</span>
                        <span>{formData.patientAge} years</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Gender:</span>
                        <span className="capitalize">
                          {formData.patientGender}
                        </span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Contact:</span>
                        <span>+{formData.contactNumber}</span>
                      </div>
                    </div>

                    {/* Blood Requirement */}
                    <h4 className="text-2xl font-bold text-primary mb-6">
                      Blood Requirement
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Blood Type:</span>
                        <span className="text-xl font-bold text-primary">
                          {formData.bloodType}
                        </span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Units Needed:</span>
                        <span>{formData.unitsNeeded} units</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Urgency:</span>
                        <span className="capitalize">{formData.urgency}</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Required By:</span>
                        <span>
                          {formData.requiredBy
                            ? new Date(formData.requiredBy).toLocaleString()
                            : "-"}
                        </span>
                      </div>
                    </div>

                    {/* Hospital Details */}
                    <h4 className="text-2xl font-bold text-primary mb-6">
                      Hospital Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Hospital:</span>
                        <span>{formData.hospitalName}</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">City:</span>
                        <span>{formData.city}</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Ward:</span>
                        <span>{formData.ward || "N/A"}</span>
                      </div>
                      <div className="flex justify-between pb-3 border-b border-gray-300">
                        <span className="font-semibold">Contact Person:</span>
                        <span>{formData.contactPerson}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-control mt-8">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleInputChange}
                        className="checkbox checkbox-md"
                        required
                      />
                      <span className="label-text text-[#2C1810]">
                        I confirm that all information provided is accurate and
                        I agree to the terms and conditions{" "}
                        <span className="text-primary">*</span>
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12 pt-8 border-t ">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-8 py-3 bg-secondary text-dark2 rounded-full font-semibold transition-all hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Previous
                </button>

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3 bg-primary text-white rounded-full font-semibold transition-all hover:bg-[#8B1538] hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-primary text-white rounded-full font-semibold transition-all hover:bg-[#8B1538] hover:shadow-lg hover:-translate-y-0.5"
                  >
                    Submit Request
                  </button>
                )}
              </div>
            </form>
          </>
        ) : (
          /* Success Message */
          <div className="text-center py-16 animate-fade-in">
            <div className="w-24 h-24 bg-[#2D5E4F] rounded-full mx-auto mb-8 flex items-center justify-center text-white text-5xl animate-scale-in">
              ✓
            </div>
            <h2 className="text-4xl font-bold text-dark1 mb-4">
              Request Submitted Successfully!
            </h2>
            <p className="text-lg text-dark2 mb-2">
              Your blood donation request has been submitted and will be
              reviewed by our team.
            </p>
            <p className="text-lg text-dark2 mb-8">
              We ll notify potential donors in your area immediately.
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-primary text-white rounded-full font-semibold transition-all hover:bg-[#8B1538] hover:shadow-lg hover:-translate-y-0.5"
            >
              Submit Another Request
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBloodDonationRequest;
