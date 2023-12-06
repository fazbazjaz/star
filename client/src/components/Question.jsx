import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Typography,
  // Button,
  Link,
  IconButton,
  Avatar,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
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

const Question = ({ questionData }) => {
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
              <Box display={"flex"} alignItems={"center"} gap={0.75}>
                <HelpOutlineOutlinedIcon
                  fontSize={"medium"}
                  color="primary"
                  sx={{ alignSelf: "center" }}
                />
                <Typography variant={"questiontitle"} color="primary">
                  Question ({questionData?.id})
                </Typography>
                <Avatar
                  src={questionData?.user?.picture}
                  sx={{ height: 24, width: 24 }}
                />
                <Typography variant={"body2"}>
                  by {questionData?.user?.firstName}
                </Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexWrap={"wrap"}
                  gap={0.5}>
                  <Typography variant={"body2"}>
                    ({questionData?.answers?.length}) Answers
                  </Typography>
                  <Typography variant={"body2"}>
                    (
                    {questionData?.answers?.reduce((acc, answer) => {
                      if (
                        answer &&
                        answer.comments &&
                        answer.comments.length > 0
                      ) {
                        return answer.comments.length + acc;
                      }
                      return acc;
                    }, 0)}
                    ) Comments
                  </Typography>
                </Box>
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
                  variant="questionbody"
                  sx={{ wordBreak: "break-word" }}>
                  {questionData.question}
                </Link>
              )}
            {!showUpdateQuestionForm &&
              currentPage === "individualQuestionPage" && (
                <Typography
                  variant={"questionbody"}
                  sx={{ wordBreak: "break-word" }}>
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
      )}
    </>
  );
};

export default Question;
