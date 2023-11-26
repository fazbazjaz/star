import { useContext, useState, useEffect } from "react";
import { Box, Typography, CardMedia } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Question from "../components/Question";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const ProfilePage = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  // define state to store the Users Question Data
  const [userQuestionsData, setUserQuestionsData] = useState(null);

  useEffect(() => {
    // fetch the Users Question Data from the backend
    const fetchUserQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/user/${
            userCookie.id
          }`,
          { credentials: "include" } // include HTTP-Only Cookie with customJWT
        );
        // console.log("fetchUserQuestions response:", response);
        if (!response.ok) {
          throw response;
        }
        const data = await response.json();
        // console.log("fetchUserQuestions data:", data);
        // store the Users Questions in state
        setUserQuestionsData(data);
      } catch (error) {
        console.error("fetchUserQuestions error:", error);
      }
    };
    fetchUserQuestions();
  }, [userCookie]);

  return (
    <Box
      p={3}
      color="white"
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box>
        <Typography variant={"pagetitle"}>Your Profile</Typography>
      </Box>
      <Box display={"flex"} flexWrap={"wrap"} gap={{ xs: 1, sm: 1.5 }} mt={1}>
        <CardMedia
          component={"img"}
          image={userCookie.picture}
          sx={{
            height: 48,
            width: 48,
            gridTemplateRows: "span 2",
            borderRadius: "0.5rem",
          }}
        />
        <Box>
          <Typography variant={"body2"}>User ID:</Typography>
          <Typography fontWeight={"bold"}>{userCookie.id}</Typography>
        </Box>
        <Box>
          <Typography variant={"body2"}>Name:</Typography>
          <Typography fontWeight={"bold"}>
            {userCookie.firstname} {userCookie.lastname}
          </Typography>
        </Box>
        {userQuestionsData && (
          <>
            <Box>
              <Typography variant={"body2"}>Questions:</Typography>
              <Typography fontWeight={"bold"} textAlign={"center"}>
                {userQuestionsData.length}
              </Typography>
            </Box>

            <Box>
              <Typography variant={"body2"}>Answers:</Typography>
              <Typography fontWeight={"bold"} textAlign={"center"}>
                {0}
              </Typography>
            </Box>
            <Box>
              <Typography variant={"body2"}>Comments:</Typography>
              <Typography fontWeight={"bold"} textAlign={"center"}>
                {0}
              </Typography>
            </Box>
          </>
        )}
      </Box>
      {userQuestionsData && userQuestionsData.length > 0 && (
        <Box mt={2}>
          <Typography variant={"pagetitle"}>
            Your Questions ({userQuestionsData.length})
          </Typography>
          <Box display={"grid"} gap={2} mt={1}>
            {userQuestionsData.map((userQuestionData) => {
              return (
                <Question
                  key={userQuestionData.id}
                  questionData={userQuestionData}
                  questionAsLink={true}
                />
              );
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProfilePage;
