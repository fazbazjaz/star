import { useRef, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box, Typography } from "@mui/material";
import {
  consistentPrimaryBackgroundColor,
  consistentHeaderFooterBorder,
} from "../themes/ConsistentStyles";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "AIzaSyCODlhg_73yAwYNpOcjCE3nQOWWy-xioJs",
      version: "weekly",
    });

    const initialLocation = {
      lat: 51.52205390886717,
      lng: -0.08467381645964438,
    };

    loader.load().then((google) => {
      const map = new google.maps.Map(mapContainerRef.current, {
        center: initialLocation,
        zoom: 14,
      });

      new google.maps.Marker({
        position: initialLocation,
        map: map,
      });
    });
  }, []);

  return (
    <>
      <Box
        py={1.5}
        backgroundColor={consistentPrimaryBackgroundColor}
        borderTop={consistentHeaderFooterBorder}
        textAlign="center"
        color="white">
        <Typography>Find Us - 69 Wilson St, London, UK, EC2A 2BB</Typography>
      </Box>

      <Box
        ref={mapContainerRef}
        width={"100%"}
        height={"30vh"}
        marginTop={"auto"}></Box>
    </>
  );
};

export default Map;
