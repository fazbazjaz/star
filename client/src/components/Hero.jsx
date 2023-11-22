import { Box, Typography } from "@mui/material";

const Hero = () => {
  const heroBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      overflow={"hidden"}
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${heroBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        py={6}
        color={"white"}>
        <Typography align={"center"} variant={"h2"} marked={"center"}>
          STAR - Situation, Task, Action and Result
        </Typography>
        <Typography variant={"h5"} align={"center"} mt={6}>
          STAR solves a business problem.
        </Typography>
        <Typography mt={4}>
          At CodeYourFuture, trainees keep a brag diary to build up a bank of
          examples of their skills, knowledge and capabilities.
        </Typography>
        <Typography mt={4}>Build your future</Typography>
      </Box>
    </Box>
  );
};

export default Hero;
