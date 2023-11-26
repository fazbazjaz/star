import { Box } from "@mui/material";
import Hero from "../components/Hero";
import Map from "../components/Map";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const HomePage = () => {
  return (
    <Box
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
      }}>
      <Hero />
      <Map />
    </Box>
  );
};

export default HomePage;
