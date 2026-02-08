import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
import useGetDistricts from "../hooks/useGetDistricts";
import useGetUpazila from "../hooks/useGetUpazila";
import PhoneInput from "react-phone-input-2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser, verifyUser, logOut } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [districts] = useGetDistricts();
  const [selected, setSelected] = useState("Comilla");
  const [upazila] = useGetUpazila(selected);
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [showVerifyUI, setShowVerifyUI] = useState(false);
  // const [verifyEmail, setVerifyEmail] = useState("");
  // const [isResending, setIsResending] = useState(false);
  // const [countdown, setCountdown] = useState(0);

  const validateBangladeshiMobile = (phone) => {
    const bdMobileRegex = /^880(13|14|15|16|17|18|19)\d{8}$/;
    return bdMobileRegex.test(phone);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const image = { image: formValues.image };
    const name = formValues.name;
    const password = formValues.password;
    const confirm_password = formValues.confirm_password;
    const email = formValues.email;
    formValues.contactNumber = phoneNumber;
    let photoURL = "";

    if (!validateBangladeshiMobile(phoneNumber)) {
      toast.error("Please enter a valid Bangladeshi mobile number");
      return;
    }

    if (password !== confirm_password) {
      return toast.error("Please ensure both passwords are the same");
    }

    try {
      const res = await axiosPublic.post(image_hosting_api, image, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      photoURL = res.data.data.display_url;
    } catch (error) {
      toast.error("Image upload failed", error.code);
      return;
    }

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

    const updateInfo = {
      displayName: name,
      photoURL: photoURL,
    };

    try {
      await createUser(email, password);

      await updateUser(updateInfo);
      await verifyUser();

      await axiosPublic.post("/users", userInfo);

      toast.success("Verification email sent. Please check your email.");

      navigate("/verify-email", { state: { email } });

      await logOut();
    } catch (error) {
      toast.error(error.code);
    }
  };

  // const handleCheckVerification = async () => {
  //   try {
  //     const result = await signInUser(verifyEmail, password);
  //     await result.user.reload();

  //     if (result.user.emailVerified) {
  //       toast.success("Email verified successfully!");
  //       navigate("/");
  //     } else {
  //       toast.error("Email not verified yet. Please check your inbox.");
  //       await logOut();
  //     }
  //   } catch (error) {
  //     console.error("Error checking verification:", error);
  //     toast.error("Failed to check verification status.");
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   if (countdown > 0) {
  //     const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
  //     return () => clearTimeout(timer);
  //   } else {
  //     setIsResending(false);
  //   }
  // }, [countdown]);

  // const handleResendEmail = async () => {
  //   try {
  //     setIsResending(true);
  //     setCountdown(60);

  //     await signInUser(verifyEmail, password);
  //     await verifyUser();

  //     toast.success("Verification email resent");
  //     await logOut();
  //   } catch (error) {
  //     console.error("Error sending verification email:", error);
  //     toast.error("Failed to send verification email. Please try again");
  //   } finally {
  //     setIsResending(false);
  //   }
  // };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="flex items-center justify-center py-20 ">
        <Toaster />

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
              Where every drop becomes a lifeline. Join a community of heroes
              saving lives every day.
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
                  onlyCountries={["bd"]}
                  countryCodeEditable={false}
                  onChange={(phone) => setPhoneNumber(phone)}
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
                <select className="select select-bordered w-full" name="group">
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
      </div>
    </div>
  );
};

export default Register;
