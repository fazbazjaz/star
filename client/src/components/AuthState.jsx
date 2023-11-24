import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";

const AuthState = () => {
  const { userCookie } = useContext(AuthContext);

  return (
    <Box display={"flex"} flexDirection={"column"} p={1} border={1}>
      <Typography fontSize={10} fontWeight={700}>
        AuthProvider State &quot;userCookie&quot;
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} flexShrink={1} gap={0.5}>
        {!userCookie && (
          <Typography
            fontSize={10}
            border={1}
            p={0.2}
            borderColor={"lightgray"}>
            null
          </Typography>
        )}
        {userCookie && (
          <>
            {Object.entries(userCookie).map((entry) => {
              return (
                <Typography
                  key={entry}
                  fontSize={10}
                  border={1}
                  p={0.2}
                  borderColor={"lightgray"}>
                  {`${entry[0]}: ${entry[1]}`}
                </Typography>
              );
            })}
          </>
        )}
      </Box>
    </Box>
  );
};

export default AuthState;
