import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Question from "../components/Question";
import AddQuestionForm from "../components/AddQuestionForm";
import getAllQuestions from "../api/getAllQuestions";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const QuestionsPage = () => {
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);

  const {
    isPending,
    isError,
    error,
    data: allQuestionsData,
  } = useQuery({
    queryKey: ["questions"],
    queryFn: getAllQuestions,
  });

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
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {allQuestionsData && (
        <Box>
          <Box display={"flex"} justifyContent={"space-between"}>
            <Typography variant={"pagetitle"}>
              All Questions ({allQuestionsData.length})
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setShowAddQuestionForm((prev) => !prev)}
              disabled={showAddQuestionForm}
              sx={{ display: "flex", gap: 0.5 }}>
              Add a Question
            </Button>
          </Box>
          {showAddQuestionForm && (
            <AddQuestionForm setShowAddQuestionForm={setShowAddQuestionForm} />
          )}
          <Box display={"grid"} gap={2} mt={1}>
            {allQuestionsData.map((questionData) => (
              <Question key={questionData.id} questionData={questionData} />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default QuestionsPage;
