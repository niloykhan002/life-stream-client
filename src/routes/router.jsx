import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../layouts/ErrorPage";
import Home from "../layouts/pages/Home/Home";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Search from "../layouts/pages/Search/Search";
import PrivateRoute from "./PrivateRoute";
import ProfilePage from "../layouts/Dashboard/ProfilePage";
import DonorHome from "../layouts/Dashboard/Donor/DonorHome";
import MyDonationRequests from "../layouts/Dashboard/Donor/MyDonationRequests";
import CreateDonationRequest from "../layouts/Dashboard/Donor/CreateDonationRequest";
import UpdateDonations from "../layouts/Dashboard/Donor/UpdateDonations";
import AdminHome from "../layouts/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "donorHome",
        element: <DonorHome />,
      },
      {
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonationRequest />,
      },
      {
        path: "donations/:id",
        element: <UpdateDonations />,
      },
      // admin routes
      {
        path: "adminHome",
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default router;
