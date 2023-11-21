import { Box } from "@mui/material";
import Hero from "../components/Hero";
import Map from "../components/Map";

const Home = () => {
  return (
    <Box border={1}>
      <Hero />
      <Map />
    </Box>
  );
};

export default Home;
