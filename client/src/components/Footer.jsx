import { Box, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      justifyContent={"space-between"}
      px={{ xs: 2, sm: 4, md: 8, lg: 12 }}
      py={4}
      // border={1}
      backgroundColor={"#15164b"}
      color={"white"}>
      <Box display={"flex"} flexDirection={"column"} maxWidth={"250px"}>
        <Link
          href="https://codeyourfuture.io/"
          target={"_blank"}
          underline={"hover"}
          variant={"body1"}>
          CodeYourFuture
        </Link>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Link
          href="https://www.linkedin.com/in/farzaneh-haghani/"
          target={"_blank"}
          underline={"hover"}
          variant={"body1"}>
          Coder Faz
        </Link>
        <Link
          href="https://www.linkedin.com/in/bazmurphy/"
          target={"_blank"}
          underline={"hover"}
          variant={"body1"}>
          Coder Baz
        </Link>
        <Link
          href="https://www.linkedin.com/in/jan-softa-680a79b2/"
          target={"_blank"}
          underline={"hover"}
          variant={"body1"}>
          Coder Jaz
        </Link>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Link
          href="https://github.com/fazbazjaz/star"
          target={"_blank"}
          underline={"hover"}
          variant={"body1"}>
          Project Repository
        </Link>
      </Box>
      <Box color={"white"}>
        <Typography variant={"body1"}>
          &copy; {new Date().getFullYear()} STAR All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
