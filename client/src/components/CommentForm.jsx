import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SmsIcon from "@mui/icons-material/Sms";
import SendIcon from "@mui/icons-material/Send";
import postComment from "../api/postComment";
import putComment from "../api/putComment";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";

const CommentForm = ({
  questionId,
  answerId,
  setShowAddCommentForm,
  commentId,
  originalComment,
  setShowUpdateCommentForm,
}) => {
  const [comment, setComment] = useState(commentId ? originalComment : "");
  const [commentValidation, setCommentValidation] = useState(undefined);

  const changeHandler = (event) => {
    setComment(event.target.value);
    setCommentValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const queryClient = useQueryClient();

  const commentMutation = useMutation({
    mutationFn: () =>
      commentId
        ? putComment(questionId, answerId, commentId, comment)
        : postComment(questionId, answerId, comment),
    onSuccess: () => {
      queryClient.refetchQueries([`question-${questionId}`]);
      setComment("");
      setCommentValidation(undefined);
      setTimeout(() => {
        if (commentId) {
          setShowUpdateCommentForm(false);
        } else {
          setShowAddCommentForm((prev) => !prev);
        }
      }, 1000);
    },
  });

  const { isPending, isError, error, isSuccess } = commentMutation;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (commentValidation === undefined) {
      setCommentValidation(false);
    }
    if (!commentValidation) {
      return;
    }
    if (commentId && comment === originalComment) {
      setShowUpdateCommentForm(false);
      return;
    }
    commentMutation.mutate();
  };

  return (
    <Box
      mt={1}
      p={3}
      border={consistentBorder}
      borderRadius={consistentBorderRadius}
      bgcolor={consistentBgColor}
      boxShadow={consistentBoxShadow}
      sx={{
        backdropFilter: consistentBackdropFilter,
      }}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "grid",
        }}>
        <FormControl>
          <Box display={"flex"} alignItems={"center"} gap={0.5} mb={1}>
            <SmsIcon fontSize="medium" color="primary" />
            <Typography variant={"commentformtitle"} color={"primary"}>
              {commentId ? "Edit your Comment" : "Add your Comment"}
            </Typography>
          </Box>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Comment"
            minRows={2}
            placeholder="Please carefully type out your Comment"
            value={comment}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                commentValidation === false ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {commentValidation === false && (
            <Typography color="error">
              Your Comment needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} alignItems={"center"} gap={1} mt={1.5}>
            <Button
              variant={"contained"}
              onClick={() =>
                commentId
                  ? setShowUpdateCommentForm(false)
                  : setShowAddCommentForm((prev) => !prev)
              }>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type={"submit"}
              endIcon={<SendIcon />}
              disabled={isPending || !commentValidation}>
              Add Comment
            </Button>
          </Box>
          <Box>
            {isPending && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                Submitting...
              </Typography>
            )}
            {isSuccess && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                ✅ Your Comment was successfully added! Thank you
              </Typography>
            )}
            {isError && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                ❌ Error: {error.message}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default CommentForm;
