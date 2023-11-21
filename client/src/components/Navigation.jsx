import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LoginLogoutButton from "./LoginLogoutButton";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      px={1}
      py={1}
      border={1}>
      <Box display={"flex"} gap={1}>
        <Button component={NavLink} to={"/"} variant="contained">
          Home
        </Button>
        <Button component={NavLink} to={"/about"} variant="contained">
          About
        </Button>
        {userCookie && (
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
