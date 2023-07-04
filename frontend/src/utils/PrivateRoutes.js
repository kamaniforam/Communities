import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = ({ path, ...props }) => {
  const { user } = useSelector((state) => state.auth);
  const isAuthenticated = !!user;

  return isAuthenticated ? <Outlet {...props} /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
