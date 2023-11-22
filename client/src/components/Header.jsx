import { AppBar, Box, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar position="static" sx={{ background: "#15164b", color: "white" }}>
      <Box
        display="flex"
        justifyContent="left" // Center the content horizontally
        alignItems="left"
        flexDirection={{ xs: "column", md: "row" }}
        gap={{ xs: 2, md: 5 }}
        px={{ xs: 2, md: 2, lg: 2 }}
        py={{ xs: 2, md: 2, lg: 2 }}
        border={1}>
        {/* Add an image in the left corner */}
        <Box>
          <img
            src="/images/codeyourfuture.png" // Update the path accordingly
            alt="CodeYourFuture Logo"
            height={50} // Adjust the height as needed
          />
        </Box>

        <Typography variant="h2">STAR by CodeYourFuture</Typography>
      </Box>
    </AppBar>
  );
};

export default Header;
