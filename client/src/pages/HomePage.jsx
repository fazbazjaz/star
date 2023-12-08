import { Box } from "@mui/material";
import Hero from "../components/Hero";
// import Map from "../components/Map";

const HomePage = () => {
  return (
    <Box display={"grid"} gridTemplateRows={"1fr auto"}>
      <Hero />
      {/* <Map /> */}
    </Box>
  );
};

export default HomePage;
