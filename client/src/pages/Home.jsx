import { Box } from "@mui/material";
import Hero from "../components/Hero";
import Map from "../components/Map";

const Home = () => {
  const homeBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${homeBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
      <Hero />
      <Map />
    </Box>
  );
};

export default Home;
