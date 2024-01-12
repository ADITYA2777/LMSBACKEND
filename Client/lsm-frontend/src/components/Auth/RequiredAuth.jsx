import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequiredAuth({ allowedRole }) {
  const { isLoggedIn, role } = useSelector((state) => state.auth);

  return isLoggedIn && allowedRole.find((myRoles) => myRoles === role) ? (
  <Outlet/>
  ) : isLoggedIn ? (
    <Navigate to="/denied" />
  ) : (
    <Navigate to="/login" />
  );
}

export default RequiredAuth;
