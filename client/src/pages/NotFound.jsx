import { Box, Typography } from "@mui/material";

const NotFound = () => {
  const notFoundBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      minHeight={"50vh"}
      p={3}
      color="white"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${notFoundBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Typography variant="h2">Page Not Found</Typography>
    </Box>
  );
};

export default NotFound;
