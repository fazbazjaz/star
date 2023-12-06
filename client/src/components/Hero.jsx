import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} py={6}>
      <Typography align={"center"} variant={"h3"} marked={"center"}>
        Situation Task Action Result
      </Typography>
      {/* <Typography variant={"h4"} align={"center"} mt={6}>
        Unleash the power of your potential with our cutting-edge app
        exclusively for aspiring coders seeking tech jobs! 🚀
      </Typography>
      <Typography variant={"h5"} mt={4}>
        Your journey to a thriving tech career starts here. Don&apos;t just
        dream it; build it with CodeYourFuture! 💼✨
      </Typography> */}
    </Box>
  );
};

export default Hero;
