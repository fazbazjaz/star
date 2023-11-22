import { useContext, useState, useEffect } from "react";
import { Box, Card, CardMedia, ListItem, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { NavLink } from "react-router-dom";

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
      color="white"
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${profileBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box>
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
        <Card>
          <Typography variant="h4" padding={3}>
            {userQuestionsData.length} Questions
          </Typography>
          <Box display="flex" padding={2} backgroundColor="#dcdfe3">
            <Typography marginRight={10}>ID</Typography>
            <Typography width={500}>Question</Typography>
            <Typography marginRight={20}>Created At</Typography>
            <Typography>Modified AT</Typography>
          </Box>
          {userQuestionsData.map((question) => (
            <ListItem
              component={NavLink}
              key={question.id}
              to={`/questions/${question.id}`}>
              <Typography marginRight={10}>{question.id}</Typography>
              <Typography width={500}>{question.question}</Typography>
              <Typography marginRight={10}>
                {new Date(question.createdAt).toLocaleString()}
              </Typography>
              <Typography>
                {new Date(question.updatedAt).toLocaleString()}
              </Typography>
            </ListItem>
          ))}
        </Card>
      )}
    </Box>
  );
};

export default Profile;
