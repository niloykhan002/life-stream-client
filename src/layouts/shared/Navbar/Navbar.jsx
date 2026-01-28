import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  const link = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? "active text-sm " : " inactive hover:text-primary"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/donation-requests"}
          className={({ isActive }) =>
            isActive ? "active text-sm" : "inactive text-sm hover:text-primary"
          }
        >
          Donation Requests
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/search"}
          className={({ isActive }) =>
            isActive ? "active text-sm" : "inactive text-sm hover:text-primary"
          }
        >
          Find Donors
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/blogs"}
          className={({ isActive }) =>
            isActive ? "active text-sm" : "inactive text-sm hover:text-primary"
          }
        >
          Blog
        </NavLink>
      </li>
    </>
  );

  return (
    <div className=" bg-white shadow-md text-dark1 fixed z-10 right-0 left-0 top-0">
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
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-40 p-2 shadow"
            >
              {link}
            </ul>
          </div>
          <Link
            to={"/"}
            className="btn px-0 font-heading border-none btn-ghost hover:bg-transparent font-bold text-lg uppercase md:text-3xl"
          >
            <div className="h-6 w-6 md:h-12 md:w-12">
              <img src={logo} alt="" />
            </div>
            <div>
              Life <span className="text-primary">Stream</span>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{link}</ul>
        </div>
        <div className="navbar-end">
          <Link to={"/search"}>
            <button className="flex mr-3 justify-center items-center text-dark3 text-xl hover:text-primary">
              <IoSearch />
            </button>
          </Link>
          {user ? (
            <Link to={"/dashboard/profile"}>
              <div
                className="flex justify-center bg-base-200 p-1 rounded-full items-center gap-2 tooltip tooltip-bottom"
                data-tip="view profile"
              >
                <div>
                  <img
                    className="w-8 h-8 rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-dark2 text-sm font-heading">
                    {user.displayName}
                  </p>
                </div>
              </div>
            </Link>
          ) : (
            <div className="md:space-x-4 space-x-1 flex items-center">
              <Link to={"/login"}>
                <button className="btn btn-xs border-none rounded-md md:btn-sm bg-primary text-white hover:bg-secondary hover:text-dark2">
                  <p>Login</p>
                  <span>
                    <FaUser />
                  </span>
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
