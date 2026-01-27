import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo.png";
import { IoSearch } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import "./Navbar.css";

const Navbar = () => {
  const { user, logOut } = useAuth();
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
  const handleSignOut = () => {
    logOut();
  };

  return (
    <div className=" bg-base-200 text-dark1 fixed z-10 right-0 left-0 top-0">
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
            className="btn px-1 md:px-2 font-heading border-none btn-ghost hover:bg-secondary font-bold text-lg uppercase md:text-3xl"
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
          {user ? (
            <div className="flex md:gap-4 gap-1 items-center">
              <div className="dropdown dropdown-end">
                <img
                  className="w-12 h-12 rounded-full"
                  src={user.photoURL}
                  role="button"
                  tabIndex={0}
                  id="image-hover"
                  alt=""
                />
                <ul
                  tabIndex={0}
                  className="dropdown-content menu gap-1 bg-dark1 rounded-box z-[1] w-38 p-2 shadow"
                >
                  <li>
                    <NavLink
                      to={"/dashboard/profile"}
                      className={({ isActive }) =>
                        isActive
                          ? "active btn btn-xs bg-primary text-white md:w-24"
                          : "btn btn-xs border-none bg-primary text-white md:w-24"
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="btn border-none btn-xs  bg-primary text-white md:w-24"
                    >
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
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
              <Link to={"/search"}>
                <button className="flex justify-center items-center text-dark3 text-xl hover:text-primary">
                  <IoSearch />
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
