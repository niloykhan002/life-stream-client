import { FaHome, FaUser, FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline, IoArrowBack, IoMenu } from "react-icons/io5";
import { IoIosCreate } from "react-icons/io";
import { MdBloodtype, MdContentCopy } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import logo from "../../assets/logo.png";
import useAdmin from "../../hooks/useAdmin";
import useVolunteer from "../../hooks/useVolunteer";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [isVolunteer] = useVolunteer();
  const { logOut } = useAuth();

  const handleSignOut = () => {
    logOut();
  };
  return (
    <div className="bg-slate-100">
      <div className="flex container mx-auto">
        <div>
          <div className="drawer z-10 lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              {/* Page content here */}
              <label
                htmlFor="my-drawer-2"
                className="text-5xl drawer-button lg:hidden"
              >
                <IoMenu />
              </label>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer-2"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>

              <div className="bg-white mt-5 rounded-lg shadow-lg text-base-content fixed top-0 h-screen lg:w-80 p-4">
                <Link
                  to={"/"}
                  className="btn font-heading border-none btn-ghost hover:bg-transparent font-bold text-lg uppercase md:text-2xl"
                >
                  <div className="h-8 w-8">
                    <img src={logo} alt="" />
                  </div>
                  <div>
                    Life <span className="text-primary">Stream</span>
                  </div>
                </Link>
                <div className="divider"></div>
                <ul className="menu ">
                  <li>
                    <NavLink
                      to={"/dashboard/profile"}
                      className={"uppercase font-semibold"}
                    >
                      <FaUserCircle className="text-xl" /> Profile
                    </NavLink>
                  </li>
                  {isAdmin ? (
                    <>
                      {/* admin nav */}
                      <li>
                        <NavLink
                          to={"/dashboard/adminHome"}
                          className={"uppercase font-semibold"}
                        >
                          <FaHome className="text-xl" /> Admin Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/all-users"}
                          className={"uppercase font-semibold"}
                        >
                          <FaUser className="text-xl" /> All Users
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/all-donation-request"}
                          className={"uppercase font-semibold"}
                        >
                          <MdBloodtype className="text-xl" /> All Donation
                          Request
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/content-management"}
                          className={"uppercase font-semibold"}
                        >
                          <MdContentCopy className="text-xl" /> Content
                          Management
                        </NavLink>
                      </li>
                    </>
                  ) : isVolunteer ? (
                    <>
                      {/* Volunteer nav */}
                      <li>
                        <NavLink
                          to={"/dashboard/volunteerHome"}
                          className={"uppercase font-semibold"}
                        >
                          <FaHome className="text-xl" /> Volunteer Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/all-donation-request"}
                          className={"uppercase font-semibold"}
                        >
                          <MdBloodtype className="text-xl" /> All Donation
                          Request
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/content-management"}
                          className={"uppercase font-semibold"}
                        >
                          <MdContentCopy className="text-xl" /> Content
                          Management
                        </NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* Sidebar content here */}

                      <li>
                        <NavLink
                          to={"/dashboard/donorHome"}
                          className={"uppercase font-semibold"}
                        >
                          <FaHome className="text-xl" /> Donor Home
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/my-donation-requests"}
                          className={"uppercase font-semibold"}
                        >
                          <MdBloodtype className="text-xl" /> My Donation
                          Requests
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to={"/dashboard/create-blood-donation-request"}
                          className={"uppercase font-semibold"}
                        >
                          <IoIosCreate className="text-xl" /> Create Donation
                          Request
                        </NavLink>
                      </li>
                    </>
                  )}
                  <div className="divider"></div>
                  <li>
                    <Link
                      to={"/"}
                      className="uppercase font-semibold hover:bg-transparent"
                    >
                      <IoArrowBack className="text-xl" />
                      Back
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="uppercase font-semibold hover:bg-transparent"
                    >
                      <IoLogOutOutline className="text-xl" />
                      LogOut
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 lg:ml-[380px] mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
