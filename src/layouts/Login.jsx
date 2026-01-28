import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/login.json";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toGo = location.state || "/";
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate(toGo);
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="flex items-center justify-center py-20">
      <Toaster />
      <div className="lg:flex flex-row-reverse items-center gap-6 shadow-lg rounded-2xl bg-base-100">
        <div className="md:w-[500px] w-96 md:mx-8">
          <Lottie animationData={loginLottie} />
        </div>
        <div className="card  w-full lg:max-w-md shrink-0 rounded-none lg:border-r-2 border-white">
          <h1 className="font-bold font-heading text-4xl text-center pt-8 text-dark1">
            Welcome Back!
          </h1>
          <form onSubmit={handleLogin} className="card-body">
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
                <span className="label-text">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input input-bordered w-full"
                  required
                  placeholder="Enter Your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-dark3 hover:text-dark2"
                >
                  {showPassword ? <IoEyeOff size={15} /> : <IoEye size={15} />}
                </button>
              </div>

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                className="btn border-none bg-primary text-white
               hover:bg-secondary hover:text-dark1"
              >
                Login
              </button>
            </div>
          </form>

          <p className="px-8 pb-8">
            {"Don't"} have an account?{" "}
            <Link to={"/register"} className="font-bold text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
