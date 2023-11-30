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
      py={1}
      backgroundColor={consistentPrimaryBackgroundColor}
      borderBottom={consistentHeaderFooterBorder}>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={1}
        color={"white"}>
        <Box display="flex" flexWrap={"wrap"} gap={1} alignItems={"center"}>
          <Box height={{ xs: "4rem", sm: "6rem" }}>
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
  );
};

export default Header;
