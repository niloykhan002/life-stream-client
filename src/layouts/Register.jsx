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

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUser } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [districts] = useGetDistricts();
  const [selected, setSelected] = useState();
  const [upazila] = useGetUpazila(selected);

  const handleRegister = async (e) => {
    e.preventDefault();

    let formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    const image = { image: formValues.image };
    const name = formValues.name;
    const password = formValues.password;
    const confirm_password = formValues.confirm_password;
    const email = formValues.email;

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
      status: "active",
      role: "donor",
    };

    const userRes = await axiosPublic.post("/users", userInfo);
    console.log(userRes.data);

    const updateInfo = { displayName: name, photoURL: photoURL };

    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Registration Successful");
        updateUser(updateInfo)
          .then(() => {
            navigate("/");
          })
          .catch((error) => {
            toast.error(error.code);
          });
      })
      .catch((error) => {
        toast.error(error.code);
      });
  };
  return (
    <div className="flex items-center justify-center mt-32 mb-20">
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
              <select className="select select-bordered w-full" name="upazila">
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
                  {showPassword ? <IoEyeOff size={15} /> : <IoEye size={15} />}
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
                  {showPassword ? <IoEyeOff size={15} /> : <IoEye size={15} />}
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
  );
};

export default Register;
