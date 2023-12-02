import { Box, Typography } from "@mui/material";
import maskEmail from "../utils/maskEmail";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const User = ({ userData }) => {
  return (
    <Box
      display="flex"
      flexWrap={"wrap"}
      gap={1.5}
      p={2}
      border={consistentBorder}
      borderRadius={consistentBorderRadius}
      bgcolor={consistentBgColor}
      boxShadow={consistentBoxShadow}
      sx={{
        backdropFilter: consistentBackdropFilter,
      }}>
      <Box display="flex" gap={1}>
        <Typography>id:</Typography>
        <Typography>{userData.id}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>googleId:</Typography>
        <Typography>~{userData.googleId.slice(-8)}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>firstName:</Typography>
        <Typography>{userData.firstName && userData.firstName}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>lastName:</Typography>
        <Typography>
          {userData.lastName && `${userData.lastName.slice(0, 3)}~`}
        </Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>email:</Typography>
        <Typography>{userData.email && maskEmail(userData.email)}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>picture:</Typography>
        <Typography>
          {userData.picture && `~${userData.picture.slice(-10)}`}
        </Typography>
      </Box>
    </Box>
  );
};

export default User;
