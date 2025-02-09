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
import AllUsers from "../layouts/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../layouts/Dashboard/Admin/AllDonationRequests";
import DonationRequests from "../layouts/pages/DonationRequests/DonationRequests";
import DonationDetails from "../layouts/pages/DonationDetails";
import ContentManagement from "../layouts/Dashboard/Admin/ContentManagement";
import AddBlog from "../layouts/Dashboard/Admin/AddBlog";
import VolunteerHome from "../layouts/Dashboard/Volunteer/VolunteerHome";
import VolunteerRoute from "./VolunteerRoute";
import AllBloodDonationRequests from "../layouts/Dashboard/Volunteer/AllBloodDonationRequests";
import VolunteerContentManagement from "../layouts/Dashboard/Volunteer/VolunteerContentManagement";
import Blog from "../layouts/Blog";
import BlogDetails from "../layouts/BlogDetails";

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
        path: "/donation-requests",
        element: <DonationRequests />,
      },
      {
        path: "donation-details/:id",
        element: (
          <PrivateRoute>
            <DonationDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "/blogs",
        element: <Blog />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
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
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllDonationRequests />
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <AdminRoute>
            <AddBlog />
          </AdminRoute>
        ),
      },
      // volunteer route
      {
        path: "volunteerHome",
        element: (
          <VolunteerRoute>
            <VolunteerHome />
          </VolunteerRoute>
        ),
      },
      {
        path: "all-donation-request",
        element: (
          <VolunteerRoute>
            <AllBloodDonationRequests />
          </VolunteerRoute>
        ),
      },
      {
        path: "volunteer-content-management",
        element: (
          <VolunteerRoute>
            <VolunteerContentManagement />
          </VolunteerRoute>
        ),
      },
    ],
  },
]);

export default router;
