import { Box, Typography } from "@mui/material";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const NotFoundPage = () => {
  return (
    <Box
      p={3}
      color="white"
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Typography variant="h2">Page Not Found</Typography>
    </Box>
  );
};

export default NotFoundPage;
