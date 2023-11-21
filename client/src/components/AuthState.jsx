import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";

const AuthState = () => {
  const { userCookie } = useContext(AuthContext);

  return (
    <>
      <Box display={"flex"} flexDirection={"column"} p={1} border={1}>
        <Typography fontSize={10} fontWeight={800}>
          Auth State:
        </Typography>
        <Typography fontSize={10} fontWeight={800}>
          userCookie:
        </Typography>
        <Typography fontSize={10} sx={{ overflowWrap: "break-word" }}>
          {userCookie ? JSON.stringify(userCookie) : "null"}
        </Typography>
      </Box>
    </>
  );
};

export default AuthState;
