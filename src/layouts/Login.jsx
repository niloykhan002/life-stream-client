import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/login.json";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { signInUser, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const toGo = location.state?.from || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const result = await signInUser(email, password);
      const user = result.user;
      await user.reload();

      if (!user.emailVerified) {
        localStorage.setItem("pendingVerification", email);
        toast.error("Please verify your email before logging in");
        navigate("/verify-email", { state: { email } });
        await logOut();
        return;
      }

      localStorage.removeItem("pendingVerification");

      toast.success("Login Successful");

      setTimeout(() => {
        navigate(toGo, { replace: true });
      }, 1000);
    } catch (error) {
      console.error("Login error:", error.code);
      toast.error("Login failed. Please try again");
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen">
      <div className="container mx-auto">
        {/* navbar */}
        <div className="navbar">
          <Link
            to={"/"}
            className="btn px-2 font-heading border-none btn-ghost hover:bg-transparent font-bold text-lg uppercase md:text-3xl"
          >
            <div className="h-6 w-6 md:h-12 md:w-12">
              <img src={logo} alt="" />
            </div>
            <div>
              Life <span className="text-primary">Stream</span>
            </div>
          </Link>
        </div>
        {/* Form */}
        <div className="flex items-center justify-center py-20">
          <Toaster />
          <div className="lg:flex items-center gap-6 shadow-lg rounded-2xl bg-base-100">
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
                      {showPassword ? (
                        <IoEyeOff size={15} />
                      ) : (
                        <IoEye size={15} />
                      )}
                    </button>
                  </div>

                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control">
                  <button
                    type="submit"
                    className="btn border-none bg-primary text-white hover:bg-secondary hover:text-dark1"
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
            <div className="md:w-[500px] w-96 md:mx-8">
              <Lottie animationData={loginLottie} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
