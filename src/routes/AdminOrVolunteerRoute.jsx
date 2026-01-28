import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import useVolunteer from "../hooks/useVolunteer";
import PropTypes from "prop-types";

const AdminOrVolunteerRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isVolunteer, isVolunteerLoading] = useVolunteer();
  const location = useLocation();

  console.group("🔒 AdminOrVolunteerRoute Debug");
  console.log("Current Path:", location.pathname);
  console.log("User:", user?.email);
  console.log("Loading States:", {
    loading,
    isAdminLoading,
    isVolunteerLoading,
  });
  console.log("Role States:", { isAdmin, isVolunteer });
  console.log("Will Allow Access:", user && (isAdmin || isVolunteer));
  console.groupEnd();

  if (loading || isAdminLoading || isVolunteerLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (user && (isAdmin || isVolunteer)) {
    return children;
  }

  return <Navigate to={"/login"} state={location.pathname} />;
};

AdminOrVolunteerRoute.propTypes = {
  children: PropTypes.node,
};

export default AdminOrVolunteerRoute;
