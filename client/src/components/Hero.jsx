// version1
import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      py={6}
      color={"white"}>
      <Typography align={"center"} variant={"h1"} marked={"center"}>
        STAR - Situation, Task, Action, Result!
      </Typography>
      <Typography variant={"h4"} align={"center"} mt={6}>
        Unleash the power of your potential with our cutting-edge app
        exclusively for aspiring coders seeking tech jobs! 🚀
      </Typography>
      <Typography variant={"h5"} mt={4}>
        Your journey to a thriving tech career starts here. Don't just dream it;
        build it with CodeYourFuture! 💼✨
      </Typography>
    </Box>
  );
};

export default Hero;

// version original
// import { Box, Typography } from "@mui/material";

// const Hero = () => {
//   return (
//     <Box
//       display={"flex"}
//       flexDirection={"column"}
//       alignItems={"center"}
//       py={6}
//       color={"white"}>
//       <Typography align={"center"} variant={"h2"} marked={"center"}>
//         STAR - Situation, Task, Action, Result!
//       </Typography>
//       <Typography variant={"h5"} align={"center"} mt={6}>
//         STAR solves a business problem.
//       </Typography>
//       <Typography mt={4}>
//         At CodeYourFuture, trainees keep a brag diary to build up a bank of
//         examples of their skills, knowledge and capabilities.
//       </Typography>
//       <Typography mt={4}>Build your future</Typography>
//     </Box>
//   );
// };

// export default Hero;
