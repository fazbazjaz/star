import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import RateReviewRoundedIcon from "@mui/icons-material/RateReviewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SendIcon from "@mui/icons-material/Send";
import postAnswer from "../api/postAnswer";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";
import putAnswer from "../api/putAnswer";

const AnswerForm = ({
  questionId,
  setShowAddAnswerForm,
  answerId,
  originalSituation,
  originalTask,
  originalAction,
  originalResult,
  setIsEditing,
}) => {
  const [answer, setAnswer] = useState({
    situation: answerId ? originalSituation : "",
    task: answerId ? originalTask : "",
    action: answerId ? originalAction : "",
    result: answerId ? originalResult : "",
  });
  const [answerValidation, setAnswerValidation] = useState({
    situation: answerId ? true : undefined,
    task: answerId ? true : undefined,
    action: answerId ? true : undefined,
    result: answerId ? true : undefined,
  });

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => {
      return { ...prevAnswer, [event.target.id]: event.target.value };
    });
    setAnswerValidation((prevAnswerValidation) => {
      return {
        ...prevAnswerValidation,
        [event.target.id]:
          event.target.value.trim().length > 10 &&
          event.target.value.trim().length < 500,
      };
    });
  };

  const queryClient = useQueryClient();

  const answerMutation = useMutation({
    mutationFn: () =>
      answerId
        ? putAnswer(questionId, answerId, answer)
        : postAnswer(questionId, answer),
    onSuccess: () => {
      queryClient.refetchQueries(["question", questionId]);
      setAnswer({
        situation: "",
        task: "",
        action: "",
        result: "",
      });
      setAnswerValidation({
        situation: undefined,
        task: undefined,
        action: undefined,
        result: undefined,
      });
      setTimeout(() => {
        if (answerId) {
          setIsEditing(false);
        } else {
          setShowAddAnswerForm((prev) => !prev);
        }
      }, 1000);
    },
  });

  const { isPending, isError, error, isSuccess } = answerMutation;

  const submitHandler = (event) => {
    event.preventDefault();
    Object.keys(answerValidation).forEach((key) => {
      if (answerValidation[key] === undefined) {
        setAnswerValidation((prevAnswerValidation) => {
          return { ...prevAnswerValidation, [key]: false };
        });
      }
    });
    const isFormValid = Object.values(answerValidation).every(
      (value) => value === true
    );
    if (!isFormValid) {
      return;
    }
    if (answerId) {
      if (
        answer.situation === originalSituation &&
        answer.task === originalTask &&
        answer.action === originalAction &&
        answer.result === originalResult
      ) {
        setIsEditing(false);
        return;
      }
    }
    answerMutation.mutate();
  };

  return (
    <Box
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
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <RateReviewRoundedIcon fontSize="medium" color="primary" />
            <Typography variant={"answerformtitle"} color={"primary"}>
              {answerId ? "Edit your Answer" : "Add your Answer"}
            </Typography>
          </Box>
          <Box display="flex" alignItems={"center"} gap={0.5} mt={1.5}>
            <ArrowForwardIosRoundedIcon fontSize={"small"} color={"primary"} />
            <Typography>Situation</Typography>
          </Box>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Situation"
            minRows={4}
            placeholder="Please carefully type out the Situation"
            value={answer.situation}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answerValidation.situation === false
                  ? "red"
                  : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answerValidation.situation === false && (
            <Typography color="error">
              Your Situation needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display="flex" alignItems={"center"} gap={0.5} mt={1.5}>
            <ArrowForwardIosRoundedIcon fontSize={"small"} color={"primary"} />
            <Typography>Task</Typography>
          </Box>
          <TextareaAutosize
            id="task"
            aria-label="Add your Task"
            minRows={4}
            placeholder="Please carefully type out the Task"
            value={answer.task}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answerValidation.task === false
                  ? "red"
                  : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answerValidation.task === false && (
            <Typography color="error">
              Your Task needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display="flex" alignItems={"center"} gap={0.5} mt={1.5}>
            <ArrowForwardIosRoundedIcon fontSize={"small"} color={"primary"} />
            <Typography>Action</Typography>
          </Box>
          <TextareaAutosize
            id="action"
            aria-label="Add your Action"
            minRows={4}
            placeholder="Please carefully type out the Action"
            value={answer.action}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answerValidation.action === false
                  ? "red"
                  : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answerValidation.action === false && (
            <Typography color="error">
              Your Action needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display="flex" alignItems={"center"} gap={0.5} mt={1.5}>
            <ArrowForwardIosRoundedIcon fontSize={"small"} color={"primary"} />
            <Typography>Result</Typography>
          </Box>
          <TextareaAutosize
            id="result"
            aria-label="Add your Result"
            minRows={4}
            placeholder="Please carefully type out the Result"
            value={answer.result}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answerValidation.result === false
                  ? "red"
                  : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answerValidation.result === false && (
            <Typography color="error">
              Your Result must be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} gap={1} mt={2}>
            <Button
              variant={"contained"}
              onClick={() =>
                answerId
                  ? setIsEditing(false)
                  : setShowAddAnswerForm((prev) => !prev)
              }>
              Cancel
            </Button>
            <Button
              variant={"contained"}
              type={"submit"}
              endIcon={<SendIcon />}
              disabled={
                isPending ||
                Object.values(answerValidation).some((value) => !value)
              }>
              Add Answer
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
                ✅ Your Answer was successfully added! Thank you
              </Typography>
            )}
            {isError && (
              <Typography
                mt={2}
                p={2}
                border={consistentBorder}
                borderRadius={consistentBorderRadius}
                bgcolor={consistentBgColor}>
                ❌ Error : {error.message}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default AnswerForm;
