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
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";

const AddCommentForm = ({ questionId, answerId, setShowAddCommentForm }) => {
  const [comment, setComment] = useState({
    content: "",
    isValid: undefined,
  });

  const changeHandler = (event) => {
    setComment((prevComment) => {
      return {
        ...prevComment,
        content: event.target.value,
        isValid:
          event.target.value.length < 10 || event.target.value.length > 500
            ? false
            : true,
      };
    });
  };

  const postComment = async () => {
    const response = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/api/questions/${questionId}/answers/${answerId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ comment: comment.content }),
      }
    );
    // console.log("postComment response", response);
    if (!response.ok) {
      throw new Error(response);
    }
    const data = await response.json();
    // console.log("postComment data", data);
    return data;
  };

  const queryClient = useQueryClient();

  const addCommentMutation = useMutation({
    mutationFn: postComment,
    // onMutate: () => {},
    onSuccess: () => {
      // Invalidate the Query Key
      // queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      // Refetch the Query Key
      queryClient.refetchQueries(["question", questionId]);
      // Reset the Comment State
      setComment({
        comment: "",
        isValid: undefined,
      });
    },
    // onError: () => {},
    // onSettled: () => {},
  });

  const { isPending, isError, error, isSuccess } = addCommentMutation;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!comment.isValid) {
      return;
    }
    if (comment.isValid) {
      addCommentMutation.mutate();
    }
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
      <form onSubmit={submitHandler}>
        <FormControl sx={{ width: "100%" }}>
          <Box display={"flex"} alignItems={"center"} gap={0.5} mb={1}>
            <SmsIcon fontSize="medium" color="primary" />
            <Typography variant={"commentformtitle"} color={"primary"}>
              Add your Comment
            </Typography>
          </Box>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Comment"
            minRows={2}
            placeholder="Please carefully type out your Comment"
            value={comment.content}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                comment.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {comment.isValid === false && (
            <Typography color="error">
              Your Comment needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} gap={1} mt={2}>
            <Button
              variant={"contained"}
              onClick={() => setShowAddCommentForm((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type="submit"
              endIcon={<SendIcon />}
              disabled={isPending}>
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
                ❌ Error: {error.toString()}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddCommentForm;
