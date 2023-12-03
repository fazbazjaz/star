import { Box, Typography } from "@mui/material";
import {
  consistentHeaderFooterBorder,
  consistentPrimaryBackgroundColor,
} from "../themes/ConsistentStyles";
import Navigation from "./Navigation";

const Header = () => {
  return (
    <Box
      backgroundColor={consistentPrimaryBackgroundColor}
      borderBottom={consistentHeaderFooterBorder}
      px={2}
      pb={1}>
      <Box maxWidth={1200} mx={"auto"}>
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={1}>
          <Box display="flex" flexWrap={"wrap"} gap={1} alignItems={"center"}>
            <Box height={{ xs: "4rem", sm: "6rem" }}>
              <img
                src="/images/star-character-thumb-rub.png"
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
