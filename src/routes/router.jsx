import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import ErrorPage from "../layouts/ErrorPage";
import Home from "../layouts/pages/Home/Home";
import Login from "../layouts/Login";
import Register from "../layouts/Register";
import Dashboard from "../layouts/Dashboard/Dashboard";
import Search from "../layouts/pages/Search/Search";

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
    element: <Dashboard />,
    children: [],
  },
]);

export default router;
