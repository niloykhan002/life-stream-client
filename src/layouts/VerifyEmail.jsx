import { IoIosMail } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

const VerifyEmail = () => {
  const { state } = useLocation();
  const email = state?.email;
  return (
    <div className="bg-slate-100 min-h-screen py-20">
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
          {/* Primary Button */}
          <Link
            to={"/login"}
            className="btn btn-block mt-6 border-none bg-gradient-to-r from-secondary to-primary text-white font-semibold py-4 px-6 rounded-xl mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-secondary hover:-translate-y-0.5"
          >
            Back to Login
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
