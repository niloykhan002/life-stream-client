import Lottie from "lottie-react";
import loginLottie from "../assets/lottie/login.json";
import toast, { Toaster } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Login = () => {
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
        toast.error(error.code);
      });
  };

  return (
    <div className="flex items-center justify-center my-20">
      <Toaster />
      <div className="lg:flex flex-row-reverse items-center gap-6 shadow-lg rounded-2xl bg-red-200">
        <div className="md:w-[500px] w-80 mx-8">
          <Lottie animationData={loginLottie} />
        </div>
        <div className="card  w-full max-w-md shrink-0 rounded-none border-r-2 border-white">
          <h1 className="font-bold text-4xl text-center pt-8 text-primary">
            Login
          </h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Login</button>
            </div>
          </form>

          <p className="px-8 py-8">
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
