import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography, List, ListItem } from "@mui/material";

const Questions = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions`,
          { credentials: "include" }
        );
        // console.log("fetchQuestions response:", response);

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        // console.log("fetchQuestions data:", data);

        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };
    fetchQuestions();
  }, []);

  return (
    <Box marginY={5}>
      <Button variant="contained" component={NavLink} to="/questions/add">
        Add Question
      </Button>

      <Box marginTop={3}>
        <Typography variant="h4">List of Questions</Typography>
        <List>
          {questions &&
            questions.map((question) => (
              <ListItem key={question.id}>{question.question}</ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default Questions;
