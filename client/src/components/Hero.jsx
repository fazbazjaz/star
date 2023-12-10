import { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import {
  consistentBgColor,
  consistentBorderRadius,
  consistentHeroCardPadding,
  consistentHeroCardBorder,
  consistentTextShadowGlow,
} from "../themes/ConsistentStyles";
import {
  starCharacterFlyingCape,
  starCharacterHulaHoop,
  starCharacterJobKey,
  starCharacterPencilSpeechBubble,
  starCharacterMagnifyingGlass,
} from "../themes/StarCharacters";

const Hero = () => {
  const { login } = useContext(AuthContext);
  return (
    <Box>
      {/* Hero Main Card */}
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexWrap={{ xs: "wrap", md: "nowrap" }}
        alignItems={"center"}
        gap={6}
        mb={4}
        p={consistentHeroCardPadding}
        border={consistentHeroCardBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        color={"white"}>
        <Box
          component={"img"}
          src={starCharacterFlyingCape}
          alt="star character flying with a cape on"
          maxHeight={{ xs: "140px", md: "160px" }}
          maxWidth={"100%"}
          className="star-cape"
        />
        <Box display={"flex"} flexDirection={"column"}>
          <Typography variant={"heromaincardtitle"}>
            Guarantee{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}
              sx={{ textShadow: consistentTextShadowGlow }}>
              interview success
            </Typography>{" "}
            <br />
            and secure your{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}
              sx={{ textShadow: consistentTextShadowGlow }}>
              dream tech career
            </Typography>{" "}
            <br />
            with the help of our{" "}
            <Typography
              component={"span"}
              variant={"heromaincardtitle"}
              color="primary"
              fontWeight={600}
              sx={{ textShadow: consistentTextShadowGlow }}>
              community!
            </Typography>
          </Typography>
          <Box alignSelf={"flex-end"} mt={2}>
            <Button variant="contained" size="large" onClick={login}>
              Situation, Task, Action... Result!
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Hero Sub Card Grid */}
      <Box
        display={"grid"}
        gridTemplateColumns={{ xs: "1fr", sm: "1fr", md: "1fr 1fr" }}
        gap={6}>
        {/* Hero Sub Card 1 */}
        <Box
          px={3}
          py={2}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          display={"flex"}
          alignItems={"center"}
          gap={2}>
          <Box>
            <Typography
              color="primary"
              component={"p"}
              variant={"herosubcardtitle"}
              sx={{ textShadow: consistentTextShadowGlow }}>
              Shine
            </Typography>
            <Typography component={"p"} variant={"herosubcardslogan"} mt={2}>
              Refine your abilities, shine in every interview
            </Typography>
            <Typography component={"p"} variant={"herosubcardsubtitle"} mt={2}>
              Skills Enhancement
            </Typography>
          </Box>
          <Box>
            <Box
              component={"img"}
              maxHeight={"128px"}
              src={starCharacterMagnifyingGlass}></Box>
          </Box>
        </Box>

        {/* Hero Sub Card 2 */}
        <Box
          px={3}
          py={2}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          display={"flex"}
          alignItems={"center"}
          gap={2}>
          <Box>
            <Box
              component={"img"}
              maxHeight={"132px"}
              src={starCharacterPencilSpeechBubble}></Box>
          </Box>
          <Box textAlign={"right"}>
            <Typography
              color="primary"
              component={"p"}
              variant={"herosubcardtitle"}
              sx={{ textShadow: consistentTextShadowGlow }}>
              Thrive
            </Typography>
            <Typography component={"p"} variant={"herosubcardslogan"} mt={2}>
              Crafting success, through expert guidance
            </Typography>
            <Typography component={"p"} variant={"herosubcardsubtitle"} mt={2}>
              Tailored Feedback
            </Typography>
          </Box>
        </Box>

        {/* Hero Sub Card 3 */}
        <Box
          px={3}
          py={2}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          display={"flex"}
          alignItems={"center"}
          gap={2}>
          <Box>
            <Typography
              color="primary"
              component={"p"}
              variant={"herosubcardtitle"}
              sx={{ textShadow: consistentTextShadowGlow }}>
              Achieve
            </Typography>
            <Typography component={"p"} variant={"herosubcardslogan"} mt={2}>
              Nurturing potential, building futures
            </Typography>
            <Typography component={"p"} variant={"herosubcardsubtitle"} mt={2}>
              Attain your Goal
            </Typography>
          </Box>
          <Box>
            <Box
              component={"img"}
              maxHeight={"112px"}
              src={starCharacterHulaHoop}></Box>
          </Box>
        </Box>

        {/* Hero Sub Card 4 */}
        <Box
          px={3}
          py={2}
          border={consistentHeroCardBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          display={"flex"}
          alignItems={"center"}
          gap={2}>
          <Box>
            <Box
              component={"img"}
              maxHeight={"112px"}
              src={starCharacterJobKey}></Box>
          </Box>
          <Box textAlign={"right"}>
            <Typography
              color="primary"
              component={"p"}
              variant={"herosubcardtitle"}
              sx={{ textShadow: consistentTextShadowGlow }}>
              Rise
            </Typography>
            <Typography component={"p"} variant={"herosubcardslogan"} mt={2}>
              Master interviews, land your dream job
            </Typography>
            <Typography component={"p"} variant={"herosubcardsubtitle"} mt={2}>
              Real World Readiness
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
