import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

const UserAuth = () => {
  const location = useLocation();
  // const user = useSelector((state) => state.getUser.user);
  const token = localStorage.getItem("access_token");
  // console.log(userData);
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default UserAuth;
