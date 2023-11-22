import { useContext, useState, useEffect } from "react";
import {
  Box,
  CardMedia,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
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
      <Box marginBottom={5}>
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
        <>
          <Typography variant="h4" padding={3}>
            {userQuestionsData.length} Questions
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Question</TableCell>
                  <TableCell>Created At</TableCell>
                  <TableCell>Modified At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userQuestionsData.map((question) => (
                  <TableRow
                    hover
                    style={{ textDecoration: "none" }}
                    key={question.id}
                    component={NavLink}
                    to={`/questions/${question.id}`}>
                    <TableCell key={`${question.id}1`}>{question.id}</TableCell>
                    <TableCell key={`${question.id}2`}>
                      {question.question}
                    </TableCell>
                    <TableCell key={`${question.id}3`}>
                      {new Date(question.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell key={`${question.id}4`}>
                      {new Date(question.updatedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Profile;
