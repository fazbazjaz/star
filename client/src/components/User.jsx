import { Box, Typography } from "@mui/material";
import { consistentBorder } from "../themes/ConsistentStyles";

const User = ({ userData }) => {
  return (
    <>
      {Object.entries(userData).map(([key, value], index, array) => {
        if (key === "googleId") {
          value = `~${value.slice(-6)}`;
        } else if (key === "lastName") {
          value = `${value.slice(0, 3)}~`;
        } else if (key === "email") {
          value = `${value.split("@")[0].slice(0, 3)}~@${value.split("@")[1]}`;
        } else if (key === "picture") {
          value = `~${value.slice(-10)}`;
        } else if (key === "createdAt" || key === "updatedAt") {
          return;
        }
        return (
          <Box key={key}>
            <Typography
              p={1}
              borderRight={
                array.length - 3 !== index ? consistentBorder : null
              }>
              {value}
            </Typography>
          </Box>
        );
      })}
    </>
  );
};

export default User;
