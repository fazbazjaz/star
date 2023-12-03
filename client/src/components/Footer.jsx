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
      px={2}
      pt={2}
      pb={3}
      borderTop={consistentHeaderFooterBorder}
      backgroundColor={consistentPrimaryBackgroundColor}>
      <Box
        maxWidth={1200}
        mx={"auto"}
        display={"flex"}
        flexDirection={{ xs: "column", sm: "row" }}
        flexWrap={"wrap"}
        justifyContent={"space-between"}
        gap={2}>
        <Box display={"flex"} flexDirection={"column"} maxWidth={"25%"}>
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
    </Box>
  );
};

export default Footer;
