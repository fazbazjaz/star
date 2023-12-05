import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Link,
  IconButton,
  CardMedia,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import deleteQuestion from "../api/deleteQuestion";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentLinkColor,
} from "../themes/ConsistentStyles";
import QuestionForm from "./QuestionForm";

const Question = ({
  questionData,
  showAddAnswerForm,
  setShowAddAnswerForm,
}) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [showUpdateQuestionForm, setShowUpdateQuestionForm] = useState(false);

  const handleEdit = async () => {
    setShowUpdateQuestionForm(true);
  };

  const location = useLocation();

  let currentPage;
  if (location.pathname.includes("/questions/")) {
    currentPage = "individualQuestionPage";
  } else if (location.pathname.includes("/questions")) {
    currentPage = "allQuestionsPage";
  } else if (location.pathname.includes("/profile")) {
    currentPage = "profilePage";
  }

  const questionId = questionData.id;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteQuestionMutation = useMutation({
    mutationFn: () => deleteQuestion(questionId),
    onError: (error) => {
      console.log("deleteQuestionMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      if (currentPage === "allQuestionsPage" || currentPage === "profilePage") {
        queryClient.refetchQueries(["questions"]);
      } else if (currentPage === "individualQuestionPage") {
        queryClient.removeQueries([`question-${questionId}`]);
        navigate("/questions");
      }
    },
  });

  const handleDelete = async () => {
    deleteQuestionMutation.mutate();
  };

  return (
    <>
      {questionData && (
        <Box
          display={"grid"}
          p={2}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box display={"flex"} alignItems={"center"}>
            <Box>
              <Box display={"flex"} alignItems={"center"} gap={0.5}>
                <CardMedia
                  component={"img"}
                  image={questionData?.user?.picture}
                  sx={{
                    height: 20,
                    width: 20,
                    borderRadius: "0.5rem",
                  }}
                />
                <HelpOutlineOutlinedIcon fontSize={"medium"} color="primary" />
                <Typography variant={"questiontitle"} color="primary">
                  Question
                </Typography>
                <Typography variant={"body2"}>by</Typography>
                <Typography variant={"body2"}>
                  {questionData?.user?.firstName}
                </Typography>
              </Box>
              <Box
                display={"flex"}
                alignItems={"center"}
                flexWrap={"wrap"}
                gap={1}>
                <Typography variant={"body2"}>
                  id: {questionData?.id}
                </Typography>
                <Typography variant={"body2"}>
                  Answers (
                  {currentPage === "individualQuestionPage"
                    ? questionData?.answers?.length || 0
                    : questionData?.answersLength}
                  )
                </Typography>
                <Typography variant={"body2"}>
                  Comments (
                  {currentPage === "individualQuestionPage"
                    ? questionData?.answers?.comments?.length || 0
                    : questionData?.commentsLength}
                  )
                </Typography>
              </Box>
            </Box>
            <Box
              marginLeft={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={0.5}>
              {questionData.userId === authenticatedUser.id && (
                <IconButton onClick={handleEdit} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {questionData.userId === authenticatedUser.id && (
                <IconButton
                  onClick={() => handleDelete(questionData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box my={1}>
            {!showUpdateQuestionForm &&
              (currentPage === "allQuestionsPage" ||
                currentPage === "profilePage") && (
                <Link
                  component={RouterLink}
                  to={`/questions/${questionData.id}`}
                  color={consistentLinkColor}
                  variant="questionbody">
                  {questionData.question}
                </Link>
              )}
            {!showUpdateQuestionForm &&
              currentPage === "individualQuestionPage" && (
                <Typography variant={"questionbody"}>
                  {questionData.question}
                </Typography>
              )}
            {showUpdateQuestionForm && (
              <QuestionForm
                questionId={questionData.id}
                originalQuestion={questionData.question}
                setShowUpdateQuestionForm={setShowUpdateQuestionForm}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={1}>
            <Box>
              {currentPage === "individualQuestionPage" && (
                <Button
                  variant="outlined"
                  startIcon={<RateReviewOutlinedIcon />}
                  onClick={() => setShowAddAnswerForm((prev) => !prev)}
                  disabled={showAddAnswerForm}>
                  Add an Answer
                </Button>
              )}
            </Box>
            <Box
              marginLeft={"auto"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              justifySelf={"flex-end"}
              alignItems={"flex-end"}>
              <Typography variant={"body2"}>
                updated {formatDate(questionData.updatedAt)}
              </Typography>
              <Typography variant={"body2"}>
                created {formatDate(questionData.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Question;
