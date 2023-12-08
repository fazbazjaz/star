import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Box, Typography, IconButton, Avatar } from "@mui/material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import CommentForm from "./CommentForm";
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

  const [showUpdateCommentForm, setShowUpdateCommentForm] = useState(false);

  const answerId = commentData.answerId;
  const commentId = commentData.id;

  const handleDelete = () => {
    deleteCommentMutation.mutate();
  };

  const handleEdit = () => {
    setShowUpdateCommentForm(true);
  };

  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => deleteComment(questionId, answerId, commentId),
    onError: (error) => {
      console.log("deleteCommentMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["questions", questionId]);
    },
  });

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
        <Box
          display={"flex"}
          flexWrap={"wrap"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          <Box display={"flex"} alignItems={"center"} gap={0.75}>
            <Box>
              <Avatar
                src={commentData?.user?.picture}
                sx={{ height: 22, width: 22 }}
              />
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
              <MessageRoundedIcon fontSize={"small"} color="primary" />
              <Typography
                variant={"commenttitle"}
                color="primary"
                paddingLeft={0.5}>
                Comment{" "}
              </Typography>
              {/* <Typography
                fontSize={"small"}
                component={"span"}
                color="primary"
                pl={0.5}>
                ({commentData?.id})
              </Typography> */}
            </Box>
            <Box display={"flex"} flexWrap={"wrap"} alignItems={"center"}>
              <Typography variant={"body2"}>
                from{" "}
                <Typography
                  component={"span"}
                  variant={"body2"}
                  color="primary">
                  {commentData?.user?.firstName}
                </Typography>
              </Typography>
            </Box>
          </Box>
          <Box
            marginLeft={"auto"}
            display={"flex"}
            alignItems={"center"}
            gap={0.5}>
            {commentData.userId === authenticatedUser.id && (
              <IconButton onClick={handleEdit} color="primary">
                <EditOutlinedIcon />
              </IconButton>
            )}
            {commentData.userId === authenticatedUser.id && (
              <IconButton
                onClick={() => handleDelete(commentData.id)}
                color="primary">
                <DeleteOutlineIcon />
              </IconButton>
            )}
          </Box>
        </Box>
        {showUpdateCommentForm ? (
          <CommentForm
            questionId={questionId}
            answerId={commentData.answerId}
            commentId={commentId}
            originalComment={commentData.comment}
            setShowUpdateCommentForm={setShowUpdateCommentForm}
          />
        ) : (
          <Box>
            <Typography mt={0.5} variant={"commentbody"}>
              {commentData.comment}
            </Typography>
          </Box>
        )}
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
