import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }) => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  if (userCookie) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Protected;
