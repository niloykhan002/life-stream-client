import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const link = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/assignments"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/blog"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Blog
        </NavLink>
      </li>
    </>
  );
  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className=" bg-black text-white fixed z-10 right-0 left-0 top-0">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn btn-ghost font-bold text-lg uppercase md:text-3xl"
          >
            Life <span className="text-primary">Stream</span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="flex md:gap-4 gap-1 items-center">
              <div className="dropdown dropdown-end">
                <img
                  className="md:w-12 md:h-12 h-6 w-6 rounded-full"
                  src={user.photoURL}
                  role="button"
                  tabIndex={0}
                  id="image-hover"
                  alt=""
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to={"/dashboard"}
                      className={({ isActive }) => (isActive ? "active" : "")}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn border-none btn-sm md:h-12 bg-primary text-white md:w-24"
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="md:space-x-4 flex items-center">
              <Link to={"/login"}>
                <button className="btn border-none btn-xs md:h-12 bg-primary text-white md:w-24">
                  Login
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="btn border-none btn-xs md:h-12 bg-primary text-white md:w-24">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
