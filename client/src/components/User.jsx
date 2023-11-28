import { Box, Typography } from "@mui/material";
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
        <Typography>google_id:</Typography>
        <Typography>~{userData.google_id.slice(-8)}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>firstname:</Typography>
        <Typography>{userData.firstname}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>lastname:</Typography>
        <Typography>{userData.lastname}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>email:</Typography>
        <Typography>{userData.email}</Typography>
      </Box>
      <Box display="flex" gap={1} borderLeft={1} paddingLeft={1}>
        <Typography>picture:</Typography>
        <Typography>~{userData.picture.slice(-10)}</Typography>
      </Box>
    </Box>
  );
};

export default User;
