import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AddAnswer from "../components/AddAnswer";

const Question = () => {
  const questionId = useParams().id;

  const [questionData, setQuestionData] = useState("");

  useEffect(() => {
    const fetchQuestionById = async (questionId) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
          {
            credentials: "include",
          }
        );
        // console.log("fetchQuestionById response:", response);

        const data = await response.json();
        // console.log("fetchQuestionById data:", data);

        setQuestionData(data);
      } catch (error) {
        console.error("fetchQuestionById error:", error);
      }
    };
    fetchQuestionById(questionId);
  }, [questionId]);

  const questionBackgroundImage = "/images/background-001.jpg";

  return (
    <Box
      minHeight={"50vh"}
      p={3}
      color="white"
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${questionBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Typography variant="h3">{questionData.question}</Typography>
      <Typography mt={2}>
        Created At: {new Date(questionData.createdAt).toLocaleString()}
      </Typography>
      <Typography mt={2}>
        Modified At:{new Date(questionData.updatedAt).toLocaleString()}
      </Typography>
      <AddAnswer />
    </Box>
  );
};

export default Question;
