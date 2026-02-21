import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from "prop-types";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <Loader />;
  }
  if (user) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} />;
};
PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
