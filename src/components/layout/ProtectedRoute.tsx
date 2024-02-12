import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { currentToken, logout } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { TUser } from "../../types";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  const token = useAppSelector(currentToken);
  const dispatch = useAppDispatch();
  let user;
  if (token) {
    user = verifyToken(token) as TUser;
  }
  console.log(user, "er");
  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;
