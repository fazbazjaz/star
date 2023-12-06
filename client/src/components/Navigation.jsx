import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AuthButtons from "./AuthButtons";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      <Button component={NavLink} to={"/"} variant="contained">
        Home
      </Button>
      <Button component={NavLink} to={"/about"} variant="contained">
        About
      </Button>
      {authenticatedUser && authenticatedUser.roleId !== 1 && (
        <>
          <Button component={NavLink} to={"/profile"} variant="contained">
            Profile
          </Button>
          <Button component={NavLink} to={"/questions"} variant="contained">
            Questions
          </Button>
          <Button component={NavLink} to={"/users"} variant="contained">
            Users
          </Button>
        </>
      )}
      <AuthButtons />
    </Box>
  );
};

export default Navigation;
