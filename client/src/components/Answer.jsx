import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, Button, IconButton, Avatar } from "@mui/material";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import AddCommentForm from "./CommentForm";
import Comment from "./Comment";
import deleteAnswer from "../api/deleteAnswer";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";
import AnswerForm from "./AnswerForm";

const Answer = ({ answerData }) => {
  console.log(answerData);
  const { authenticatedUser } = useContext(AuthContext);

  const [showUpdateAnswerForm, setShowUpdateAnswerForm] = useState(false);

  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const handleEdit = async () => {
    setShowUpdateAnswerForm(true);
  };

  const questionId = answerData.questionId;
  const answerId = answerData.id;

  const queryClient = useQueryClient();

  const deleteAnswerMutation = useMutation({
    mutationFn: () => deleteAnswer(questionId, answerId),
    onError: (error) => {
      console.log("deleteAnswerMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", questionId]);
    },
  });

  const handleDelete = () => {
    deleteAnswerMutation.mutate();
  };

  return (
    <>
      {answerData && (
        <Box
          p={2}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Box display={"flex"} alignItems={"center"} gap={0.75}>
              <Box>
                <Avatar
                  src={answerData?.user?.picture}
                  sx={{ height: 28, width: 28 }}
                />
              </Box>
              <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
                <PsychologyAltRoundedIcon fontSize={"medium"} color="primary" />
                <Typography
                  variant={"answertitle"}
                  color="primary"
                  paddingLeft={0.5}>
                  Answer{" "}
                </Typography>
                <Typography component={"span"} color="primary" pl={0.5}>
                  ({answerData?.id})
                </Typography>
              </Box>
              <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
                <Typography variant={"body2"}>
                  from{" "}
                  <Typography
                    component={"span"}
                    variant={"body2"}
                    color="primary">
                    {answerData?.user?.firstName}
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box
              marginLeft={"auto"}
              display={"flex"}
              alignItems={"center"}
              gap={0.5}>
              {answerData.userId === authenticatedUser.id && (
                <IconButton onClick={handleEdit} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {answerData.userId === authenticatedUser.id && (
                <IconButton
                  onClick={() => handleDelete(answerData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box display={"grid"} gap={1} mt={1}>
            {showUpdateAnswerForm ? (
              <AnswerForm
                answerId={answerData.id}
                questionId={answerData.questionId}
                originalSituation={answerData.situation}
                originalTask={answerData.task}
                originalAction={answerData.action}
                originalResult={answerData.result}
                setShowUpdateAnswerForm={setShowUpdateAnswerForm}
              />
            ) : (
              <>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography variant={"answersubtitles"} color={"primary"}>
                      Situation
                    </Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.situation}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography variant={"answersubtitles"} color={"primary"}>
                      Task
                    </Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.task}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography variant={"answersubtitles"} color={"primary"}>
                      Action
                    </Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.action}
                  </Typography>
                </Box>
                <Box
                  p={2}
                  border={consistentBorder}
                  borderRadius={consistentBorderRadius}
                  bgcolor={consistentBgColor}
                  boxShadow={consistentBoxShadow}
                  sx={{
                    backdropFilter: consistentBackdropFilter,
                  }}>
                  <Box display="flex" alignItems={"center"} gap={0.5}>
                    <ArrowForwardIosRoundedIcon
                      fontSize={"small"}
                      color={"primary"}
                    />
                    <Typography variant={"answersubtitles"} color={"primary"}>
                      Result
                    </Typography>
                  </Box>
                  <Typography mt={1.5} variant={"answerbody"}>
                    {answerData.result}
                  </Typography>
                </Box>
              </>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}>
            <Box>
              {answerData?.comments.length > 0 && (
                <Typography variant={"body2"}>
                  ({answerData?.comments?.length}) Comments
                </Typography>
              )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
              mt={1}>
              <Typography variant={"body2"}>
                updated {formatDate(answerData.updatedAt)}
              </Typography>
              <Typography variant={"body2"}>
                created {formatDate(answerData.createdAt)}
              </Typography>
            </Box>
          </Box>
          {answerData.comments &&
            answerData.comments.map((commentData) => (
              <Comment
                key={commentData.id}
                questionId={answerData.questionId}
                commentData={commentData}
              />
            ))}
          <Box mt={2} display={"flex"} justifyContent={"flex-end"}>
            <Button
              variant="contained"
              startIcon={<SmsOutlinedIcon />}
              onClick={() => setShowAddCommentForm((prev) => !prev)}
              disabled={showAddCommentForm}>
              Add a Comment
            </Button>
          </Box>
          {showAddCommentForm && (
            <AddCommentForm
              questionId={answerData.questionId}
              answerId={answerData.id}
              setShowAddCommentForm={setShowAddCommentForm}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Answer;
