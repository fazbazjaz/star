import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SaveAsRoundedIcon from "@mui/icons-material/SaveAsRounded";
import {
  consistentBackdropFilter,
  consistentBgColor,
  consistentBorder,
  consistentBorderRadius,
  consistentBoxShadow,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";

const EditQuestionForm = ({ questionData, setIsEditing }) => {
  const [status, setStatus] = useState({
    submitting: false,
    error: false,
    success: false,
    message: null,
  });
  const [question, setQuestion] = useState({
    content: questionData.question,
    error: undefined,
  });

  const changeHandler = (event) => {
    const { value } = event.target;

    setQuestion((prevQuestion) => {
      return {
        ...prevQuestion,
        content: value,
        error:
          !value.trim || value.trim().length < 10 || value.trim().length > 500,
      };
    });
  };

  const handleSubmit = async (event, questionId) => {
    event.preventDefault();

    if (question.error || question.error === undefined) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "Your Question needs to be between 10-500 Characters",
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
      const questionContent = question.content;
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}/edit`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questionContent }),
        }
      );
      // console.log("Edit response:", response);
      if (!response.ok) {
        throw new Error("Failed to Edit question");
      }
      // const data = await response.json();
      // console.log("Edit data:", data);
      setIsEditing(false);
      setStatus({
        submitting: false,
        error: false,
        success: true,
        message: "Your Edit successfully saved!",
      });
      setQuestion({
        content: "",
        error: undefined,
      });
    } catch (error) {
      console.error(error);
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message:
          "There was an error to send your Editing Question to the Server",
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
      <form onSubmit={() => handleSubmit(event, questionData.id)}>
        <FormControl sx={{ width: "100%" }}>
          <TextareaAutosize
            aria-label="Edit your question"
            value={question.content}
            onChange={() => changeHandler(event)}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                question.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          <Box display={"flex"} gap={1} mt={1}>
            <Button variant="contained" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={status.submitting}>
              Save <SaveAsRoundedIcon />
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

export default EditQuestionForm;
