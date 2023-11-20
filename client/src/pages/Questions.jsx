import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Questions = () => {
  // define state to store the Questions Data
  const [questionsData, setQuestionsData] = useState(null);

  useEffect(() => {
    // fetch the Questions Data from the backend
    const fetchAllQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions`,
          { credentials: "include" } // include HTTP-Only Cookie with customJWT
        );
        // console.log("fetchAllQuestions response:", response);

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        // console.log("fetchAllQuestions data:", data);

        const payload = data.payload;
        // console.log("fetchAllQuestions payload:", payload);

        // store the Users Data in state
        setQuestionsData(payload);
      } catch (error) {
        console.error("fetchAllQuestions error:", error);
      }
    };
    fetchAllQuestions();
  }, []);

  const questionsBackroundImage = "/images/background-001.jpg";

  return (
    <Box
      sx={{
        color: "white",
        minHeight: "70vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${questionsBackroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
      p={3}>
      <Typography variant={"h3"} mb={1}>
        Questions Page
      </Typography>
      <Box py={2}>
        <Button variant="contained" component={NavLink} to="/questions/add">
          Add Question
        </Button>
      </Box>
      <Box>
        {questionsData && (
          <>
            <Typography variant={"h6"} mb={1}>
              questions Table from the Database
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    {Object.keys(questionsData[0]).map((column) => (
                      <TableCell key={column}>{column}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionsData.map((question) => (
                    <TableRow key={question.id}>
                      {Object.keys(questionsData[0]).map((column) => (
                        <TableCell key={column}>{question[column]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Questions;
