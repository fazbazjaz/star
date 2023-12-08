import { Box, Typography } from "@mui/material";
import Navigation from "./Navigation";
import {
  consistentHeaderFooterBorder,
  consistentPrimaryBackgroundColor,
} from "../themes/ConsistentStyles";
import { starCharacterThumbRub } from "../themes/StarCharacters";

const Header = () => {
  return (
    <Box
      px={2}
      pb={1}
      backgroundColor={consistentPrimaryBackgroundColor}
      borderBottom={consistentHeaderFooterBorder}>
      <Box maxWidth={1200} mx={"auto"}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}>
          <Box display="flex" flexWrap={"wrap"} gap={1} alignItems={"center"}>
            <Box height={{ xs: "4rem", sm: "5.5rem" }}>
              <img
                src={starCharacterThumbRub}
                alt="Star Character"
                style={{ height: "100%" }}
              />
            </Box>
            <Typography
              fontSize={{ xs: "2.5rem", sm: "3.5rem" }}
              fontWeight={800}>
              STAR
            </Typography>
          </Box>
          <Box height={{ xs: "3rem", sm: "5rem" }}>
            <img
              src="/images/cyf-logo.svg"
              alt="CodeYourFuture Logo"
              style={{ height: "100%" }}
            />
          </Box>
        </Box>
        <Navigation />
      </Box>
    </Box>
  );
};

export default Header;
