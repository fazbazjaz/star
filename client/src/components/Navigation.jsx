import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AuthButtons from "./AuthButtons";
import { AuthContext } from "../context/AuthContext";

const Navigation = () => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={1}>
      <Button size={"small"} component={NavLink} to={"/"} variant="contained">
        Home
      </Button>
      <Button
        size={"small"}
        component={NavLink}
        to={"/about"}
        variant="contained">
        About
      </Button>
      {authenticatedUser && authenticatedUser.roleId !== 1 && (
        <>
          <Button
            size={"small"}
            component={NavLink}
            to={"/profile"}
            variant="contained">
            Profile
          </Button>
          <Button
            size={"small"}
            component={NavLink}
            to={"/questions"}
            variant="contained">
            Questions
          </Button>
          <Button
            size={"small"}
            component={NavLink}
            to={"/users"}
            variant="contained">
            Users
          </Button>
        </>
      )}
      <AuthButtons />
    </Box>
  );
};

export default Navigation;
