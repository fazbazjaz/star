import { useState } from "react";
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
    error: undefined,
  });

  const [status, setStatus] = useState({
    submitting: false,
    error: false,
    success: false,
    message: null,
  });

  const changeHandler = (event) => {
    setComment((prevComment) => {
      return {
        ...prevComment,
        content: event.target.value,
        error:
          event.target.value.length < 10 || event.target.value.length > 500
            ? true
            : false,
      };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (comment.error) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There are problems with your Comment",
      });
      return;
    }

    try {
      setStatus({
        submitting: true,
        error: false,
        success: false,
        message: null,
      });
      const response = await fetch(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/questions/${questionId}/answers/${answerId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // attach the HTTP-Only Cookie with customJWT
          body: JSON.stringify({ comment: comment.content }),
        }
      );
      // console.log("AddComment response:", response);

      if (!response.ok) {
        throw response;
      }

      // const data = await response.json();
      // console.log("AddComment postAnswer data:", data);

      setStatus({
        submitting: false,
        error: false,
        success: true,
        message: "Your Comment was successfully added!",
      });

      setComment({
        content: "",
        error: undefined,
      });
    } catch (error) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There was an error sending your Comment to the Server",
      });
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
          {comment.error && (
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
              disabled={status.submitting}>
              Add Comment
            </Button>
          </Box>
          <Box>
            {status.submitting && (
              <Typography color={"info"} mt={2} px={1}>
                Submitting...
              </Typography>
            )}
            {status.success && (
              <Typography color={"success.main"} mt={2} px={1}>
                Success: {status.message}
              </Typography>
            )}
            {status.error && (
              <Typography color={"error"} mt={2} px={1}>
                Error: {status.message}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddCommentForm;
