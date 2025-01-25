import { FaHome, FaUserCircle } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex container mx-auto">
      <div>
        <div className="drawer lg:drawer-open">
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

            <div className="bg-red-200 text-base-content min-h-full lg:w-80 p-4">
              <h2
                className="text-3xl font-bold uppercase text-center
               py-8"
              >
                Life <span className="text-primary">Stream</span>
              </h2>
              <ul className="menu ">
                {/* Sidebar content here */}
                <li>
                  <NavLink
                    to={"/dashboard/profile"}
                    className={"uppercase font-semibold"}
                  >
                    <FaUserCircle className="text-xl" /> Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/dashboard/donorHome"}
                    className={"uppercase font-semibold"}
                  >
                    <FaHome className="text-xl" /> Donor Home
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
