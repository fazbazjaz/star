import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}>
      <Box>
        <Typography textAlign={"center"} mb={1}>
          Loading...
        </Typography>
        <CircularProgress color="primary" size={"8rem"} />
      </Box>
    </Box>
  );
};

export default Loading;
