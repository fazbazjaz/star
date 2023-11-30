import { Box, Typography } from "@mui/material";
import {
  consistentBgColor,
  consistentBorderRadius,
  consistentHeroCardPadding,
  consistentHeroCardBorder,
} from "../themes/ConsistentStyles";
import { starCharacterFlyingCape } from "../themes/StarCharacters";

const Hero = () => {
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        gap={3}
        m={4}
        p={consistentHeroCardPadding}
        border={consistentHeroCardBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        color={"white"}>
        <Box
          component={"img"}
          src={starCharacterFlyingCape}
          alt="star character flying with a cape on"
          maxHeight={"128px"}
          maxWidth={"100%"}
          className="star-cape"
        />
        <Box>
          <Typography variant={"heromaincardtitle"}>
            Achieve{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}>
              interview success
            </Typography>{" "}
            and secure your{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}>
              tech career
            </Typography>{" "}
            with our{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}>
              community!
            </Typography>
          </Typography>
        </Box>
      </Box>
      <Box
        display={"grid"}
        gridTemplateColumns={"1fr 1fr"}
        gridTemplateRows={"1fr 1fr"}
        rowGap={4}
        columnGap={4}
        m={4}
        color={"white"}>
        <Box
          p={4}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}>
          <Typography textAlign={"center"} fontSize={"2rem"} fontWeight={500}>
            <Typography
              component={"span"}
              color="primary"
              fontSize={"inherit"}
              fontWeight={700}>
              S
            </Typography>
            ituation
          </Typography>
          <Typography>
            Set the Scene: Outline the context of your experience or challenge.
          </Typography>
        </Box>
        <Box
          p={4}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}>
          <Typography textAlign={"center"} fontSize={"2rem"} fontWeight={500}>
            <Typography
              component={"span"}
              color="primary"
              fontSize={"inherit"}
              fontWeight={700}>
              T
            </Typography>
            ask
          </Typography>
          <Typography>
            Define Your Goal: Specify the task or objective you were assigned.
          </Typography>
        </Box>
        <Box
          p={4}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}>
          <Typography textAlign={"center"} fontSize={"2rem"} fontWeight={500}>
            <Typography
              component={"span"}
              color="primary"
              fontSize={"inherit"}
              fontWeight={700}>
              A
            </Typography>
            ction
          </Typography>
          <Typography>
            Take Initiative: Describe the steps you took to address the task.
          </Typography>
        </Box>
        <Box
          p={4}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}>
          <Typography textAlign={"center"} fontSize={"2rem"} fontWeight={500}>
            <Typography
              component={"span"}
              color="primary"
              fontSize={"inherit"}
              fontWeight={700}>
              R
            </Typography>
            esult
          </Typography>
          <Typography>
            Show Impact: Share the positive outcomes of your actions.
          </Typography>
        </Box>
      </Box>
      {/* <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Trainees and Volunteers unite for shared growth and collective
            success!
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Community Connection: Engage with Peers and Professionals to Elevate
            Your Answers.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Unlock Your Potential: Navigating the Tech Interview Galaxy with
            STAR.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Guiding Stars: Elevate Your Coding Career through Interview
            Excellence.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Shine Bright in Tech: Mastering STAR Interviews for Success.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            You are a STAR...now realise your Potential!
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Dive into Excellence: Explore a Rich Bank of Interview Questions.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Mentorship Matters: Industry Professionals, Contribute Your
            Questions and Wisdom. Pay it forward and help shape the future of
            tech by sharing your expertise with diverse and aspiring talents.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Inspiration for your Interview journey learn from those who've
            conquered the coding bootcamp and landed their dream jobs.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Get expert guidance on crafting effective STAR answers.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Transform your interview skills with STAR.
          </Typography>
        </Box>
      </Box>
      <Box border={1}>
        <Box>
          <Typography variant={"heromaincardbody"}>
            Master the STAR technique and land your dream tech job.
          </Typography>
        </Box>
      </Box> */}
    </Box>
  );
};

export default Hero;

// <Box
//   display={"flex"}
//   flexDirection={"column"}
//   alignItems={"center"}
//   py={6}
//   color={"white"}>
//   <Typography align={"center"} variant={"h2"} marked={"center"}>
//     STAR - Situation, Task, Action, Result!
//   </Typography>
//   <Typography variant={"h5"} align={"center"} mt={6}>
//     STAR solves a business problem.
//   </Typography>
//   <Typography mt={4}>
//     At CodeYourFuture, trainees keep a brag diary to build up a bank of
//     examples of their skills, knowledge and capabilities.
//   </Typography>
//   <Typography mt={4}>Build your future</Typography>
// </Box>
