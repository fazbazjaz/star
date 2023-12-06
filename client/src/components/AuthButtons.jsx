import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const AuthButtons = () => {
  const { authenticatedUser, login, logout } = useContext(AuthContext);

  return (
    <Box marginLeft={{ xs: "inherit", sm: "auto" }} display={"flex"} gap={1}>
      {authenticatedUser && authenticatedUser.roleId === 1 && (
        <Button component={NavLink} to={"/verify"} variant="contained">
          Verify
        </Button>
      )}
      {authenticatedUser ? (
        <Button variant="contained" startIcon={<LogoutIcon />} onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button variant="contained" startIcon={<LoginIcon />} onClick={login}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default AuthButtons;
