import toast, { Toaster } from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerLottie from "../assets/lottie/register.json";
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
    if (password.length < 6) {
      return toast.error("Length must be at least 6 character ");
    }
    if (!/[A-Z]/.test(password)) {
      return toast.error("Must have an Uppercase letter in the password");
    }
    if (!/[a-z]/.test(password)) {
      return toast.error("Must have a Lowercase letter in the password");
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
      <div className="lg:flex flex-row-reverse items-center gap-6 shadow-lg rounded-2xl bg-red-200">
        <div className="md:w-[600px] w-80 lg:mx-8">
          <Lottie animationData={registerLottie} />
        </div>
        <div className="card w-full lg:max-w-md shrink-0 rounded-none lg:border-r-2 border-white">
          <h1 className="font-bold text-4xl text-center pt-8 text-primary ">
            Register
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
                className="file-input file-input-bordered file-input-error w-full"
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
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                name="confirm_password"
                placeholder="Enter Password Again"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Register</button>
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
