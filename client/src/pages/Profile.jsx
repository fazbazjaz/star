import { useContext, useState, useEffect } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);

  // define state to store the Users Data
  const [userQuestionsData, setUserQuestionsData] = useState(null);

  useEffect(() => {
    // fetch the Users Data from the backend
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
  }, []);

  const profileBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      minHeight={"50vh"}
      p={3}
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${profileBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box color={"white"}>
        <Typography variant={"h3"}>Profile Page</Typography>
        <CardMedia
          component={"img"}
          image={userCookie.picture}
          sx={{ height: 64, width: 64 }}
        />
        <Box mt={2}>
          <Typography fontWeight={"bold"}>Name:</Typography>
          <Typography>
            {userCookie.firstname} {userCookie.lastname}
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography fontWeight={"bold"}>Email:</Typography>
          <Typography>{userCookie.email}</Typography>
        </Box>
      </Box>
      {userQuestionsData && (
        <Box color={"white"} mt={2}>
          <Typography variant={"h4"} mb={2}>
            Your Questions
          </Typography>
          {userQuestionsData.map((question) => (
            <Typography key={question.id}>
              {question.id} {question.question}{" "}
              {new Date(question.createdAt).toLocaleString()}{" "}
              {new Date(question.updatedAt).toLocaleString()}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
