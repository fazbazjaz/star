import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Protected = ({ children }) => {
  const { authenticatedUser } = useContext(AuthContext);

  if (authenticatedUser) {
    return children;
  }

  return <Navigate to="/" />;
};

export default Protected;
