import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LoginLogoutButton from "./LoginLogoutButton";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { token, user } = useContext(AuthContext);
  return (
    <Box
      border={1}
      px={1}
      py={1}
      display={"flex"}
      justifyContent={"space-between"}>
      <Box display={"flex"} gap={1}>
        <Button component={NavLink} to={"/"} variant="contained">
          Home
        </Button>
        <Button component={NavLink} to={"/about"} variant="contained">
          About
        </Button>
        {token && user && (
          <>
            <Button component={NavLink} to={"/profile"} variant="contained">
              Profile
            </Button>
            <Button component={NavLink} to={"/users"} variant="contained">
              Users
            </Button>
            <Button component={NavLink} to={"/questions"} variant="contained">
              Questions
            </Button>
          </>
        )}
      </Box>
      <LoginLogoutButton />
    </Box>
  );
};

export default Navigation;
