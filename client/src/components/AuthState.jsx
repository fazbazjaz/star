import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography } from "@mui/material";
import {
  consistentHeaderFooterBorder,
  consistentPrimaryBackgroundColor,
} from "../themes/ConsistentStyles";

const AuthState = () => {
  const { authenticatedUser } = useContext(AuthContext);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      p={1}
      borderBottom={consistentHeaderFooterBorder}
      backgroundColor={consistentPrimaryBackgroundColor}
      color={"white"}>
      <Typography fontSize={10} fontWeight={700}>
        AuthProvider State &quot;user&quot;
      </Typography>
      <Box display={"flex"} flexWrap={"wrap"} flexShrink={1} gap={0.5}>
        {!authenticatedUser && (
          <Typography
            fontSize={10}
            border={1}
            p={0.2}
            borderColor={"lightgray"}>
            null
          </Typography>
        )}
        {authenticatedUser && (
          <>
            {Object.entries(authenticatedUser).map((entry) => {
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
