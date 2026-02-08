import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosMail } from "react-icons/io";
import { Link, Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const { verifyUser } = useAuth();
  const { state } = useLocation();
  const email = state?.email || localStorage.getItem("pendingVerification");

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResending(false);
    }
  }, [countdown]);

  if (!email) {
    return <Navigate to="/register" replace />;
  }

  const handleResendVerification = async () => {
    if (countdown > 0) return;

    setIsResending(true);
    try {
      await verifyUser();
      toast.success("Verification email sent successfully!");
      setCountdown(60);
    } catch (error) {
      console.error("Resend error:", error);
      if (error.code === "auth/too-many-requests") {
        toast.error("Too many requests. Please try again later.");
      } else {
        toast.error("Failed to resend email. Please try registering again.");
      }
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className="bg-slate-100 min-h-screen py-20">
      <Toaster />
      <div className="flex items-center justify-center">
        {/* user verify */}
        <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-12 text-center border">
          {/* Icon */}
          <div className="w-20 h-20 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/50">
            <IoIosMail className="text-5xl text-white" />
          </div>
          {/* Title */}
          <h1 className="text-dark1 text-3xl font-semibold mb-4">
            Email Verification Required
          </h1>
          {/* Description */}
          <p className="text-dark2 text-base leading-relaxed mb-6">
            To complete your registration, please verify your email address.
            {"We've"} sent a verification link to your inbox.
          </p>
          {/* Email Display Box */}
          <div className="bg-slate-100 rounded-xl p-4 border">
            <div className="text-dark2 text-sm mb-2">
              Verification email sent to:
            </div>
            <div className="text-primary font-semibold text-lg break-all">
              {email}
            </div>
          </div>

          {/* Resend Button */}
          <button
            onClick={handleResendVerification}
            disabled={isResending || countdown > 0}
            className="btn btn-block mt-6 bg-white border border-primary text-primary font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-none hover:bg-primary hover:text-white hover:-translate-y-0.5 "
          >
            {isResending
              ? "Sending..."
              : countdown > 0
                ? `Resend in ${countdown}s`
                : "Resend Verification Email"}
          </button>
          {/* Primary Button */}
          <Link
            to={"/login"}
            className="btn btn-block mt-6 border-none bg-gradient-to-r from-secondary to-primary text-white font-semibold py-4 px-6 rounded-xl mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-secondary hover:-translate-y-0.5"
          >
            Already Verified? Back to Login
          </Link>
          {/* Help Text */}
          <p className="text-sm text-gray-400">
            {"Didn't"} receive the email? Check your spam folder
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
