import { Box, CardMedia, Typography } from "@mui/material";

const AboutPage = () => {
  const topBannerImage = "/images/about-us-top-image.jpg";
  const bottomBannerImage = "/images/about-us-bottom-image.jpg";

  return (
    <Box>
      <CardMedia
        component={"img"}
        height={"500"}
        image={topBannerImage}
        alt={"Top Banner"}
      />
      <Box px={4} py={6}>
        <Typography variant={"h1"} mt={4}>
          About Us
        </Typography>
        <Typography variant={"h2"} mt={4}>
          Users and Roles
        </Typography>
        <Typography variant={"h5"} mt={4}>
          🌐 Elevate Your Interview Game: Say goodbye to interview jitters and
          hello to confidence! Our app is your secret weapon for mastering the
          art of STAR - Situation, Task, Action, Result - ensuring you shine in
          every interview scenario.
        </Typography>
        <Typography variant={"h5"} mt={2}>
          💻 Tech Interview Mastery: Dive into a world of personalized coaching
          from industry experts and seasoned coders. We're not just an app;
          we're your virtual mentor, guiding you through the intricacies of tech
          interviews with real-world insights.
        </Typography>
        <Typography variant={"h5"} mt={2}>
          📖 Brag Diary Revolution: At CodeYourFuture, we believe in the power
          of showcasing your skills. Say hello to your digital brag diary – a
          repository of your achievements, skills, and knowledge. Let it be your
          toolkit for success!
        </Typography>
        <Typography variant={"h5"} mt={2}>
          👥 Community Support: Join a community that thrives on collaboration!
          Connect with personal development coaches and seasoned coders who've
          been there, done that. Together, we're building futures and forging
          connections that last a lifetime.
        </Typography>
      </Box>
      <CardMedia
        component={"img"}
        height={200}
        image={bottomBannerImage}
        alt={"Bottom Banner"}
      />
    </Box>
  );
};

export default AboutPage;
