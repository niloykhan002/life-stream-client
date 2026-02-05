import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import { IoIosMail } from "react-icons/io";
import useGetDistricts from "../hooks/useGetDistricts";
import useGetUpazila from "../hooks/useGetUpazila";
import PhoneInput from "react-phone-input-2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser, verifyUser, logOut, signInUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [districts] = useGetDistricts();
  const [selected, setSelected] = useState();
  const [upazila] = useGetUpazila(selected);
  const [phone, setPhone] = useState("");
  const [showVerifyUI, setShowVerifyUI] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleRegister = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const image = { image: formValues.image };
    const name = formValues.name;
    const confirm_password = formValues.confirm_password;
    const email = formValues.email;
    formValues.contactNumber = phone;

    if (!phone || phone.length !== 13) {
      toast.error("Please enter a valid Bangladesh phone number");
      return;
    }

    if (password !== confirm_password) {
      return toast.error("Please ensure both passwords are the same");
    }

    const res = await axiosPublic.post(image_hosting_api, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const photoURL = res.data.data.display_url;

    const userInfo = {
      name: name,
      email: email,
      image: photoURL,
      blood_group: formValues.group,
      district: formValues.district,
      upazila: formValues.upazila,
      contactNumber: formValues.contactNumber,
      status: "active",
      role: "donor",
    };

    const userRes = await axiosPublic.post("/users", userInfo);
    console.log(userRes.data);

    const updateInfo = { displayName: name, photoURL: photoURL };

    try {
      const result = await createUser(email, password);
      console.log(result.user);

      await updateUser(updateInfo);
      await verifyUser();

      toast.success("Please verify your email address");

      setVerifyEmail(email);
      setShowVerifyUI(true);

      await logOut();
    } catch (error) {
      toast.error(error.code);
    }
  };

  const handleCheckVerification = async () => {
    try {
      const result = await signInUser(verifyEmail, password);
      await result.user.reload();

      if (result.user.emailVerified) {
        toast.success("Email verified successfully!");
        navigate("/");
      } else {
        toast.error("Email not verified yet. Please check your inbox.");
        await logOut();
      }
    } catch (error) {
      console.error("Error checking verification:", error);
      toast.error("Failed to check verification status.");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResending(false);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    try {
      setIsResending(true);
      setCountdown(60);

      await signInUser(verifyEmail, password);
      await verifyUser();

      toast.success("Verification email resent");
      await logOut();
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast.error("Failed to send verification email. Please try again");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex items-center justify-center py-20 ">
        <Toaster />

        {!showVerifyUI ? (
          <>
            <div className="lg:flex flex-row-reverse gap-5 shadow-lg rounded-2xl bg-base-100">
              <div className=" md:w-[550px] flex flex-col justify-center  lg:px-8 rounded-lg bg-secondary">
                <div className="flex justify-center items-center gap-2 pt-5">
                  <div className="h-10 w-10">
                    <img src={logo} alt="" />
                  </div>
                  <div className="uppercase font-heading text-lg md:text-3xl font-bold">
                    Life <span className="text-primary">Stream</span>
                  </div>
                </div>
                <h1 className="text-center font-heading text-dark1 uppercase text-lg md:text-2xl font-bold pt-8">
                  Welcome to Life Stream!
                </h1>
                <p className="text-center font-body text-dark2 mt-4">
                  Where every drop becomes a lifeline. Join a community of
                  heroes saving lives every day.
                </p>
                <Lottie animationData={registerLottie} />
              </div>
              {/* form */}
              <div className="card w-full lg:max-w-md shrink-0 rounded-none lg:border-r-2 border-white">
                <h1 className="font-bold font-heading uppercase text-lg md:text-3xl text-center pt-8 text-dark1 ">
                  Create Account
                </h1>
                <form onSubmit={handleRegister} className="card-body">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter Your Name"
                      className="input input-bordered"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Your Email"
                      className="input input-bordered"
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Contact Number</span>
                    </label>
                    <PhoneInput
                      country="bd"
                      type="tel"
                      enableSearch={true}
                      name="contactNumber"
                      placeholder="Enter phone number"
                      onChange={(phone) => setPhone(phone)}
                      inputProps={{
                        required: true,
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "53px",
                        borderRadius: "8px",
                        fontSize: "1rem",
                      }}
                      buttonStyle={{
                        backgroundColor: "white",
                        borderRadius: "8px 0 0 8px",
                        paddingLeft: "5px",
                      }}
                      containerStyle={{
                        width: "100%",
                      }}
                      required
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Image</span>
                    </label>
                    <input
                      type="file"
                      name="image"
                      required
                      className="file-input file-input-bordered  w-full"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Blood Group</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      name="group"
                    >
                      <option defaultChecked>A+</option>
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
                      <span className="label-text">District</span>
                    </label>
                    <select
                      onChange={(e) => setSelected(e.target.value)}
                      className="select select-bordered w-full"
                      name="district"
                    >
                      {districts.map((district) => (
                        <option key={district.id}>{district.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Upazila</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      name="upazila"
                    >
                      {upazila.map((item) => (
                        <option key={item.id}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        name="password"
                        className="input input-bordered w-full validator"
                        required
                        placeholder="Password"
                        minLength={8}
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-dark3 hover:text-dark2"
                      >
                        {showPassword ? (
                          <IoEyeOff size={15} />
                        ) : (
                          <IoEye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="confirm_password"
                        className="input input-bordered w-full"
                        required
                        placeholder="Enter Password Again"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-dark3 hover:text-dark2"
                      >
                        {showPassword ? (
                          <IoEyeOff size={15} />
                        ) : (
                          <IoEye size={15} />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn uppercase border-none bg-primary text-white">
                      Create Account
                    </button>
                  </div>
                </form>
                <p className="pl-8 pb-8">
                  Already have an account?{" "}
                  <Link to={"/login"} className="font-bold text-blue-600">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* user verify */}

            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-12 text-center border">
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
              <div className="bg-slate-100 rounded-xl p-4 mb-6 border">
                <div className="text-dark2 text-sm mb-2">
                  Verification email sent to:
                </div>
                <div className="text-primary font-semibold text-lg break-all">
                  {verifyEmail}
                </div>
              </div>

              {/* Primary Button */}
              <button
                onClick={handleCheckVerification}
                className="w-full bg-gradient-to-r from-secondary to-primary text-white font-semibold py-4 px-6 rounded-xl mb-4 transition-all duration-300 hover:shadow-lg hover:shadow-secondary hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {"I've"} Verified My Email
              </button>

              {/* Resend Button */}
              <button
                onClick={handleResendEmail}
                disabled={isResending}
                className="w-full bg-transparent text-primary font-semibold py-4 px-6 rounded-xl border-2 border-primary transition-all duration-300 hover:bg-primary hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isResending
                  ? `Resend in ${countdown}s`
                  : "Resend Verification Email"}
              </button>

              {/* Help Text */}
              <p className="mt-6 text-sm text-gray-400">
                {"Didn't"} receive the email? Check your spam folder or{" "}
              </p>

              {/* Back to Login */}
              <div className="mt-6 pt-6 border-t border-gray-600">
                <button
                  onClick={() => navigate("/login")}
                  className="text-dark2 hover:text-gray-300 text-sm transition-colors"
                >
                  ← Back to Login
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
