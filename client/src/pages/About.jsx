import { Container, Typography, Box, CardMedia } from "@mui/material";

const About = () => {
  const topBannerImage = "/images/about-us-top-image.jpg";
  const bottomBannerImage = "/images/about-us-bottom-image.jpg";

  return (
    <Container>
      <CardMedia
        component="img"
        height="500"
        image={topBannerImage}
        alt="Top Banner"
      />
      <Box marginY={7}>
        <Typography variant="h2" marginBottom={4}>
          About Us
        </Typography>
        <Typography variant="h3" marginBottom={2}>
          Users and roles
        </Typography>
        <Typography>
          As a trainee, I am able to create an online diary that holds all of my
          Star based entries
        </Typography>
        <Typography>
          As a trainee, I am able to return, update and improve my entries as
          well as answer general interview questions using them
        </Typography>
        <Typography>
          As a TA, I can check that trainees are regularly adding to their STAR
          accounts and even suggest to them: hey, you should solve that, or
          helped - add it to your STAR account.
        </Typography>
        <Typography>
          As a PD mentor, I am able to discuss their examples and help them
          elaborate and celebrate both their CYF and non-CYF STAR examples
        </Typography>
      </Box>
      <CardMedia
        component="img"
        height="200"
        image={bottomBannerImage}
        alt="Bottom Banner"
      />
    </Container>
  );
};

export default About;
