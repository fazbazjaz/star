import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import AddAnswer from "../components/AddAnswer";
import { formatDate } from "../utils/formatDate";

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
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${questionBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box
        p={4}
        borderRadius={2}
        sx={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}>
        <Typography variant="h4" textAlign={"center"}>
          {questionData.question}
        </Typography>
        <Box textAlign="end">
          <Typography variant={"body2"}>
            Created {formatDate(new Date(questionData.createdAt))}
          </Typography>
          <Typography variant={"body2"}>
            Updated {formatDate(new Date(questionData.updatedAt))}
          </Typography>
        </Box>
      </Box>
      <AddAnswer />
    </Box>
  );
};

export default Question;
