import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import HelpOutlinedIcon from "@mui/icons-material/HelpOutlined";
import SendIcon from "@mui/icons-material/Send";
import postQuestion from "../api/postQuestion";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";
import putQuestion from "../api/putQuestion";

const QuestionForm = ({
  setShowAddQuestionForm,
  questionId,
  originalQuestion,
  setIsEditing,
}) => {
  const [question, setQuestion] = useState(questionId ? originalQuestion : "");

  const [questionValidation, setQuestionValidation] = useState(undefined);

  const changeHandler = (event) => {
    setQuestion(event.target.value);
    setQuestionValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const queryClient = useQueryClient();

  const questionMutation = useMutation({
    mutationFn: () =>
      questionId ? putQuestion(questionId, question) : postQuestion(question),
    onSuccess: () => {
      queryClient.refetchQueries(["questions"]);
      setQuestion("");
      setQuestionValidation(undefined);
      setTimeout(() => {
        if (questionId) {
          setIsEditing(false);
        } else {
          setShowAddQuestionForm((prev) => !prev);
        }
      }, 1000);
    },
  });

  const { isPending, isError, error, isSuccess } = questionMutation;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (questionValidation === undefined) {
      setQuestion(false);
    }
    if (!questionValidation) {
      return;
    }
    if (questionId && question === originalQuestion) {
      setIsEditing(false);
      return;
    }
    questionMutation.mutate();
  };

  return (
    <Box
      my={1}
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
            <HelpOutlinedIcon fontSize="medium" color="primary" />
            <Typography variant={"questionformtitle"} color={"primary"}>
              Add your Question
            </Typography>
          </Box>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Question"
            minRows={2}
            placeholder="Please carefully type out your Question"
            value={question}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                questionValidation === false ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {questionValidation === false && (
            <Typography color="error">
              Your Comment needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} alignItems={"center"} gap={1} mt={1.5}>
            <Button
              variant={"contained"}
              onClick={() =>
                questionId
                  ? setIsEditing(false)
                  : setShowAddQuestionForm((prev) => !prev)
              }>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type={"submit"}
              endIcon={<SendIcon />}
              disabled={isPending || !questionValidation}>
              Add Question
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
                ✅ Your Question was successfully added! Thank you
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

export default QuestionForm;
