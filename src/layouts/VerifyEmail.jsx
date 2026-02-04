import { useState, useEffect } from "react";
import { auth } from "./firebase"; // Your Firebase config
import { sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    // Get current user email
    if (auth.currentUser) {
      setUserEmail(auth.currentUser.email);

      // Check if already verified
      if (auth.currentUser.emailVerified) {
        navigate("/dashboard");
      }
    } else {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    // Countdown timer
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResending(false);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (isResending) return;

    try {
      setIsResending(true);
      setCountdown(60);

      await sendEmailVerification(auth.currentUser);
      alert("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email. Please try again.");
      setIsResending(false);
      setCountdown(0);
    }
  };

  const handleCheckVerification = async () => {
    try {
      setChecking(true);
      await auth.currentUser.reload();

      if (auth.currentUser.emailVerified) {
        navigate("/dashboard");
      } else {
        alert(
          "Email not verified yet. Please check your inbox and click the verification link.",
        );
      }
    } catch (error) {
      console.error("Error checking verification:", error);
      alert("Failed to check verification status.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-5">
      <div className="bg-gray-700 rounded-2xl shadow-2xl max-w-lg w-full p-12 text-center border border-gray-600">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-purple-500/50">
          <span className="text-5xl">📬</span>
        </div>

        {/* Title */}
        <h1 className="text-gray-50 text-3xl font-semibold mb-4">
          Email Verification Required
        </h1>

        {/* Description */}
        <p className="text-gray-300 text-base leading-relaxed mb-6">
          To complete your registration, please verify your email address.{" "}
          {"We've"}
          sent a verification link to your inbox.
        </p>

        {/* Email Display Box */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6 border border-gray-600">
          <div className="text-gray-400 text-sm mb-2">
            Verification email sent to:
          </div>
          <div className="text-purple-400 font-semibold text-lg break-all">
            {userEmail}
          </div>
        </div>

        {/* Primary Button */}
        <button
          onClick={handleCheckVerification}
          disabled={checking}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-4 px-6 rounded-xl mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {checking ? "Checking..." : "I've Verified My Email"}
        </button>

        {/* Resend Button */}
        <button
          onClick={handleResendEmail}
          disabled={isResending}
          className="w-full bg-transparent text-purple-400 font-semibold py-4 px-6 rounded-xl border-2 border-purple-500 transition-all duration-300 hover:bg-purple-500 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isResending
            ? `Resend in ${countdown}s`
            : "Resend Verification Email"}
        </button>

        {/* Help Text */}
        <p className="mt-6 text-sm text-gray-400">
          {"Didn't"} receive the email? Check your spam folder or{" "}
          <a
            href="/support"
            className="text-purple-400 hover:text-purple-300 no-underline font-semibold transition-colors"
          >
            contact support
          </a>
        </p>

        {/* Back to Login */}
        <div className="mt-6 pt-6 border-t border-gray-600">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-gray-300 text-sm transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
