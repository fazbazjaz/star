import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import Question from "../components/Question";
import AddAnswerForm from "../components/AddAnswerForm";
import Answer from "../components/Answer";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const QuestionPage = () => {
  const { id } = useParams();
  const [questionData, setQuestionData] = useState(null);
  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);

  useEffect(() => {
    const fetchQuestionData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/${id}`,
          { credentials: "include" }
        );
        // console.log("response:", response);
        const data = await response.json();
        // console.log("data:", data);
        setQuestionData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuestionData();
  }, [id]);

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
      {questionData && (
        <Box>
          <Typography variant={"pagetitle"}>
            Individual Question (id: {questionData.id})
          </Typography>
          <Box display={"grid"} gap={2}>
            <Question
              questionData={questionData}
              showAddAnswerForm={showAddAnswerForm}
              setShowAddAnswerForm={setShowAddAnswerForm}
            />
            {showAddAnswerForm && (
              <AddAnswerForm
                questionId={questionData.id}
                setShowAnswerForm={setShowAddAnswerForm}
              />
            )}
            <Box display={"grid"} gap={2}>
              {questionData.answers.map((answerData) => {
                return <Answer key={answerData.id} answerData={answerData} />;
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionPage;
