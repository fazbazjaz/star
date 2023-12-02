import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const LoginLogoutButton = () => {
  // const { authenticatedUser, login, logout } = useContext(AuthContext);
  const { authenticatedUser, promptGoogleSignIn, logout } =
    useContext(AuthContext);

  return (
    <Box marginLeft={{ xs: "inherit", sm: "auto" }}>
      {authenticatedUser ? (
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => {
            promptGoogleSignIn();
          }}>
          Login
        </Button>
      )}
    </Box>
  );
};

export default LoginLogoutButton;
