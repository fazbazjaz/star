import { useContext } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography, IconButton } from "@mui/material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import deleteComment from "../api/deleteComment";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const Comment = ({ commentData, questionId }) => {
  const { authenticatedUser } = useContext(AuthContext);

  const answerId = commentData.answerId;
  const commentId = commentData.id;

  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(questionId, answerId, commentId),
    onError: (error) => {
      console.log("deleteCommentMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      queryClient.refetchQueries(["questions", questionId]);
    },
  });

  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };

  return (
    <>
      <Box
        mt={1}
        py={1}
        px={2}
        border={consistentBorder}
        borderRadius={consistentBorderRadius}
        bgcolor={consistentBgColor}
        boxShadow={consistentBoxShadow}
        sx={{
          backdropFilter: consistentBackdropFilter,
        }}>
        <Box display={"flex"} alignItems={"center"} gap={0.5}>
          <MessageRoundedIcon fontSize={"0.75rem"} color="primary" />
          <Typography variant={"commentitle"} color={"primary"}>
            Comment
          </Typography>
          <Typography variant={"body2"}>(id: {commentData.id})</Typography>
          <Typography variant={"body2"}>
            by userId: {commentData.userId}
          </Typography>
          <Box marginLeft={"auto"}>
            {commentData.userId === authenticatedUser.id && (
              <>
                <IconButton
                  onClick={() => handleDelete(commentData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        <Box>
          <Typography mt={0.5} variant={"commentbody"}>
            {commentData.comment}
          </Typography>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"flex-end"}
          alignItems={"flex-end"}>
          <Typography variant={"body2"}>
            updated {formatDate(commentData.updatedAt)}
          </Typography>
          <Typography variant={"body2"}>
            created {formatDate(commentData.createdAt)}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Comment;
