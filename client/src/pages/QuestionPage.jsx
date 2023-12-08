import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Button } from "@mui/material";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import Loading from "../components/Loading";
import Error from "../components/Loading";
import Question from "../components/Question";
import AnswerForm from "../components/AnswerForm";
import Answer from "../components/Answer";
import Sort from "../components/Sort";
import getQuestionById from "../api/getQuestionById";

const QuestionPage = () => {
  const { id: questionId } = useParams();

  const [sort, setSort] = useState("popular");

  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);

  const {
    isPending,
    isError,
    error,
    data: questionData,
  } = useQuery({
    queryKey: ["questions", questionId, sort],
    queryFn: () => getQuestionById(questionId, sort),
  });

  return (
    <Box py={2}>
      {isPending && <Loading />}
      {isError && <Error message={error.message} />}
      {questionData && (
        <Box>
          <Typography variant={"pagetitle"}>
            Individual Question (id: {questionData.id})
          </Typography>
          <Box display={"grid"} gap={2} mt={2}>
            <Question
              questionData={questionData}
              showAddAnswerForm={showAddAnswerForm}
              setShowAddAnswerForm={setShowAddAnswerForm}
            />
            {showAddAnswerForm && (
              <AnswerForm
                questionId={questionData.id}
                setShowAddAnswerForm={setShowAddAnswerForm}
              />
            )}
            <Box
              display={"flex"}
              flexWrap={"wrap"}
              justifyContent={"space-between"}
              alignItems={"center"}
              gap={2}>
              <Box
                display={"flex"}
                flexWrap={"wrap"}
                alignItems={"center"}
                gap={2}>
                {questionData?.answers.length > 0 && (
                  <>
                    <Typography variant={"pagetitle"}>
                      Answers ({questionData?.answers.length})
                    </Typography>
                    <Sort sort={sort} setSort={setSort} />
                  </>
                )}
              </Box>
              <Box>
                <Button
                  variant="contained"
                  startIcon={<RateReviewOutlinedIcon />}
                  onClick={() => setShowAddAnswerForm((prev) => !prev)}
                  disabled={showAddAnswerForm}>
                  Add an Answer
                </Button>
              </Box>
            </Box>
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
