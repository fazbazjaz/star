import { Box, Typography } from "@mui/material";

const Error = ({ message }) => {
  return (
    <Box>
      <Typography>Error</Typography>
      {message && <Typography>{message}</Typography>}
    </Box>
  );
};

export default Error;
