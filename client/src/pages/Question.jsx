import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Question = () => {
  const [question, setQuestion] = useState("");
  const questionId = useParams().questionId;

  useEffect(() => {
    const fetchQuestionById = async (questionId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        // console.log(data);
        setQuestion(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestionById(questionId);
  }, []);

  return (
    <Box margin={3}>
      <Typography variant="h2">{question.question}</Typography>
      <Typography>
        Created At: {new Date(question.createdAt).toLocaleString()}
      </Typography>
      <Typography>
        Modified At:{new Date(question.updatedAt).toLocaleString()}
      </Typography>
    </Box>
  );
};

export default Question;
