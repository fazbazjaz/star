import { AppBar, Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position={"static"} sx={{ background: "white", color: "black" }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 2, md: 5 }}
        px={{ xs: 2, md: 2, lg: 2 }}
        py={{ xs: 2, md: 2, lg: 2 }}
        backgroundColor={"#15164b"}
        color={"white"}>
        <Typography variant={"h2"}>⭐ STAR by CodeYourFuture</Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
