import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const LoginLogoutButton = () => {
  const { authenticatedUser, login, logout } = useContext(AuthContext);

  return (
    <Box marginLeft={{ xs: "inherit", sm: "auto" }}>
      {authenticatedUser ? (
        <Button
          size={"small"}
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button
          size={"small"}
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={login}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default LoginLogoutButton;
