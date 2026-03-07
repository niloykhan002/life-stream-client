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
import MyDonationRequests from "../layouts/Dashboard/Donor/MyDonationRequests";
import UpdateDonations from "../layouts/Dashboard/Donor/UpdateDonations";
import AdminHome from "../layouts/Dashboard/Admin/AdminHome";
import AdminRoute from "./AdminRoute";
import AllUsers from "../layouts/Dashboard/Admin/AllUsers";
import AllDonationRequests from "../layouts/Dashboard/Admin/AllDonationRequests";
import DonationRequests from "../layouts/pages/DonationRequests/DonationRequests";
import DonationDetails from "../layouts/pages/DonationDetails";
import ContentManagement from "../layouts/Dashboard/Admin/ContentManagement";
import AddBlog from "../layouts/Dashboard/Admin/AddBlog";
import BlogDetails from "../layouts/BlogDetails";
import ContactUs from "../layouts/ContactUs";
import CreateBloodDonationRequest from "../layouts/Dashboard/Donor/CreateBloodDonationRequest";
import VerifyEmail from "../layouts/VerifyEmail";
import AboutUs from "../layouts/pages/AboutUs";
import BlogPage from "../layouts/pages/BlogPage";

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
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
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
        element: <BlogPage />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
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
        path: "my-donation-requests",
        element: <MyDonationRequests />,
      },
      {
        path: "create-blood-donation-request",
        element: <CreateBloodDonationRequest />,
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
        path: "all-donation-request",
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
    ],
  },
]);

export default router;
