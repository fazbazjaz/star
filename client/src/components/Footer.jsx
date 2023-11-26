import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import {
  consistentPrimaryBackgroundColor,
  consistentHeaderFooterBorder,
} from "../themes/ConsistentStyles";
import CodeIcon from "@mui/icons-material/Code";

const Footer = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={{ xs: "column", sm: "row" }}
      flexWrap={"wrap"}
      justifyContent={"space-between"}
      p={4}
      gap={2}
      backgroundColor={consistentPrimaryBackgroundColor}
      color={"white"}
      borderTop={consistentHeaderFooterBorder}>
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
          target={"_blank"}>
          <Box display={"flex"} gap={0.5}>
            <CodeIcon />
            <Typography variant={"body1"}>Developer Faz</Typography>
          </Box>
        </Link>
        <Link href="https://www.linkedin.com/in/bazmurphy/" target={"_blank"}>
          <Box display={"flex"} gap={0.5}>
            <CodeIcon />
            <Typography variant={"body1"}>Developer Baz</Typography>
          </Box>
        </Link>
        <Link
          href="https://www.linkedin.com/in/jan-softa-680a79b2/"
          target={"_blank"}>
          <Box display={"flex"} gap={0.5}>
            <CodeIcon />
            <Typography variant={"body1"}>Developer Jaz</Typography>
          </Box>
        </Link>
      </Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Link
          href="https://github.com/fazbazjaz/star"
          target={"_blank"}
          display={"flex"}
          gap={1}>
          <GitHubIcon />
          <Typography variant={"body1"}>Project Repository</Typography>
        </Link>
      </Box>
      <Box>
        <Typography variant={"body2"}>
          &copy; {new Date().getFullYear()} STAR All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
