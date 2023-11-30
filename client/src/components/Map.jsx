// version1 my code
import { useRef, useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import { Box, Typography } from "@mui/material";

const Map = () => {
  const mapContainerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

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

      setMapLoaded(true); // Set mapLoaded to true once the map is loaded
    });
  }, []);

  return (
    <Box position="relative" width={"100%"} height={"30vh"} border={1}>
      {/* Map container */}
      <Box
        ref={mapContainerRef}
        width="100%"
        height="100%"
        position="absolute"
        top="35px" // Adjusted the top position to make space for the text
        left="0"></Box>
      {/* Add text above the map with a background color */}
      {mapLoaded && (
        <Box
          width="100%"
          position="absolute"
          top="0"
          left="0"
          backgroundColor="#15164b"
          textAlign="center"
          padding="10px"
          color="white">
          <Typography variant="h6">
            Find us - 69 Wilson St, London, EC2A 2BB, England
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Map;

// version original
// import { useRef, useEffect } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import { Box } from "@mui/material";

// const Map = () => {
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     const loader = new Loader({
//       apiKey: "AIzaSyCODlhg_73yAwYNpOcjCE3nQOWWy-xioJs",
//       version: "weekly",
//     });

//     const initialLocation = {
//       lat: 51.52205390886717,
//       lng: -0.08467381645964438,
//     };

//     loader.load().then((google) => {
//       const map = new google.maps.Map(mapContainerRef.current, {
//         center: initialLocation,
//         zoom: 14,
//       });

//       new google.maps.Marker({
//         position: initialLocation,
//         map: map,
//       });
//     });
//   }, []);

//   return (
//     <Box
//       ref={mapContainerRef}
//       width={"100%"}
//       height={"30vh"}
//       marginTop={"auto"}></Box>
//   );
// };

// export default Map;
