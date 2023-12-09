import { Link as NavLink } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";
import {
  starCharacterThumbsUp,
  starCharacterLetter,
} from "../themes/StarCharacters";

const AboutPage = () => {
  return (
    <Box my={2} display={"grid"} gap={2}>
      {/* Box 1 */}
      <Box
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Box
          display={"grid"}
          gridTemplateColumns={{ xs: "1fr", sm: "1fr auto", md: "1fr auto" }}
          justifyItems={"center"}
          alignItems={"center"}
          columnGap={2}>
          <Box>
            <Typography variant={"abouttitle"} gutterBottom>
              The STAR Method
            </Typography>
            <Typography mt={2} display="block" variant={"abouttitlesubtext"}>
              Use the STAR method to plan your answers to interview questions
              and to show your skills and experience on a CV or application
              form.
            </Typography>
          </Box>
          <Box>
            <Box
              component={"img"}
              src={starCharacterThumbsUp}
              maxHeight={"128px"}></Box>
          </Box>
        </Box>

        <Box display={"flex"} flexWrap={"wrap"} gap={2} mt={2}>
          <Link href="#what-star-stands-for">What STAR stands for</Link>
          <Link href="#when-to-use-star">When to use STAR</Link>
          <Link href="#how-to-use-star">How to use STAR</Link>
          <Link href="#star-example1">STAR Example 1</Link>
          <Link href="#star-example2">STAR Example 2</Link>
        </Box>
      </Box>

      {/* Box 2 */}
      <Box
        id="what-star-stands-for"
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography variant={"aboutsubtitle"}>What STAR stands for</Typography>
        <Box display={"grid"} gap={2} mt={2}>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutwhatsubtitle"}
                color={"primary"}>
                Situation
              </Typography>
            </Box>

            <Typography display="block" variant={"aboutwhatbody"}>
              the situation you had to deal with
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutwhatsubtitle"}
                color={"primary"}>
                Task
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutwhatbody"}>
              the task you were given to do
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutwhatsubtitle"}
                color={"primary"}>
                Action
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutwhatbody"}>
              the action you took
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutwhatsubtitle"}
                color={"primary"}>
                Result
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutwhatbody"}>
              what happened as a result of your action and what you learned from
              the experience
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Box 3 */}
      <Box
        id="when-to-use-star"
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography display="block" variant={"aboutsubtitle"}>
          When to use STAR
        </Typography>
        <Typography display="block" variant={"aboutwhensubtext"} mt={2}>
          You can use the STAR method in your:
        </Typography>
        <Box
          display={"grid"}
          gridTemplateColumns={{ xs: "1fr", sm: "auto 1fr", md: "auto 1fr" }}
          // justifyItems={"center"}
          alignItems={"center"}
          columnGap={3}>
          <Box>
            <Box
              component={"img"}
              src={starCharacterLetter}
              maxHeight={"128px"}></Box>
          </Box>
          <Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              flexWrap={"wrap"}
              gap={2}
              mt={2}>
              <Link
                variant={"aboutwhenlink"}
                component={NavLink}
                to="/careers-advice/cv-sections">
                CV
              </Link>
              <Link
                variant={"aboutwhenlink"}
                component={NavLink}
                to="/careers-advice/covering-letter">
                Cover Letter
              </Link>
              <Link
                variant={"aboutwhenlink"}
                component={NavLink}
                to="/careers-advice/application-forms">
                Application Form
              </Link>
              <Link
                variant={"aboutwhenlink"}
                component={NavLink}
                to="/careers-advice/interview-advice">
                Interview
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Box 4 */}
      <Box
        id="how-to-use-star"
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography display="block" variant={"aboutsubtitle"}>
          How to use STAR
        </Typography>
        <Typography display="block" variant={"abouthowsubtext"} mt={2}>
          You can use the STAR method to structure the examples you give to
          questions, especially in interviews. You can use it to highlight
          particular skills and qualities you have that the employer is looking
          for.
        </Typography>
        <Typography mt={2} display="block" variant={"abouthowsubtext"}>
          When using STAR, remember:
        </Typography>
        <Box mt={2} display={"grid"} gap={2}>
          <Box display="flex" alignItems={"center"} gap={0.5}>
            <ArrowForwardIosRoundedIcon fontSize={"medium"} color={"primary"} />
            <Typography
              display="block"
              variant={"abouthowbulletpoint"}
              color={"primary"}>
              You can use examples from work, home, or volunteering
            </Typography>
          </Box>

          <Box display="flex" alignItems={"center"} gap={0.5}>
            <ArrowForwardIosRoundedIcon fontSize={"medium"} color={"primary"} />
            <Typography
              display="block"
              variant={"abouthowbulletpoint"}
              color={"primary"}>
              Keep examples short and to the point
            </Typography>
          </Box>

          <Box display="flex" alignItems={"center"} gap={0.5}>
            <ArrowForwardIosRoundedIcon fontSize={"medium"} color={"primary"} />
            <Typography
              display="block"
              variant={"abouthowbulletpoint"}
              color={"primary"}>
              Try to get your points across in a conversational way so as not to
              appear too rehearsed
            </Typography>
          </Box>

          <Box display="flex" alignItems={"center"} gap={0.5}>
            <ArrowForwardIosRoundedIcon fontSize={"medium"} color={"primary"} />
            <Typography
              display="block"
              variant={"abouthowbulletpoint"}
              color={"primary"}>
              Be prepared to answer follow-up questions about the examples you
              give
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Box 5 */}
      <Box
        id="star-example1"
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography display="block" variant={"aboutexampletitle"}>
          STAR Example 1
        </Typography>
        <Box display="flex" alignItems={"center"} gap={1}>
          <HelpOutlineOutlinedIcon fontSize={"large"} color="primary" />
          <Typography
            display="inlineblock"
            variant={"aboutexamplequestion"}
            mt={1}>
            Tell me about a time when you have shown leadership skills
          </Typography>
        </Box>
        <Box display={"grid"} gap={2} mt={2}>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Situation
              </Typography>
            </Box>

            <Typography display="block" variant={"aboutexamplebody"}>
              In my previous digital marketing job, the company wanted to get
              more people to sign up to a newsletter which was not receiving a
              lot of attention.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Task
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              My job was to find a way of getting more people to sign up.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Action
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              Over a period of 3 months, there was an 25% increase in sign-ups
              to the newsletter and the approach I took was used by the
              management team in other departments.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Result
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              The customers were grateful that we had acted quickly. Later on,
              they both came back to the shop to spend their vouchers and have
              since recommended us to their friends.
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Box 6 */}
      <Box
        id="star-example2"
        px={4}
        py={3}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Typography display="block" variant={"aboutexampletitle"}>
          STAR Example 2
        </Typography>
        <Box display="flex" alignItems={"center"} gap={1}>
          <HelpOutlineOutlinedIcon fontSize={"large"} color="primary" />
          <Typography
            display="inlineblock"
            variant={"aboutexamplequestion"}
            mt={1}>
            Give me an example of when you faced a problem at work. How did you
            handle it?
          </Typography>
        </Box>
        <Box display={"grid"} gap={2} mt={2}>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Situation
              </Typography>
            </Box>

            <Typography display="block" variant={"aboutexamplebody"}>
              I was working in a florist shop with the manager and we were
              arranging an order of flowers for 2 weddings. The manager, who had
              taken the order, had mixed up the customers addresses and the
              flowers were delivered to the wrong venues.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Task
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              I had to get the flowers to the right place and apologise to the
              customers
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Action
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              I told my boss that I would deal with the mistake, leaving her to
              take care of the shop. I spoke to both customers on the telephone
              to explain, and reassured them that we would put things right
              straight away. I drove to both venues, swapped the flowers in time
              and apologised in person. I gave both customers a voucher for a
              bouquet as compensation.
            </Typography>
          </Box>
          <Box>
            <Box display="flex" alignItems={"center"} gap={0.5}>
              <ArrowForwardIosRoundedIcon
                fontSize={"medium"}
                color={"primary"}
              />
              <Typography
                display="block"
                variant={"aboutexamplestarsubtitle"}
                color={"primary"}>
                Result
              </Typography>
            </Box>
            <Typography display="block" variant={"aboutexamplebody"}>
              The customers were grateful that we had acted quickly. Later on,
              they both came back to the shop to spend their vouchers and have
              since recommended us to their friends.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AboutPage;
