import { useState } from "react";
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
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AddAnswerForm = ({ questionId, setShowAnswerForm }) => {
  const [answer, setAnswer] = useState({
    situation: { content: "", isValid: undefined },
    task: { content: "", isValid: undefined },
    action: { content: "", isValid: undefined },
    result: { content: "", isValid: undefined },
  });

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => {
      return {
        ...prevAnswer,
        [event.target.id]: {
          content: event.target.value,
          isValid:
            event.target.value.length < 10 || event.target.value.length > 500
              ? false
              : true,
        },
      };
    });
  };

  const postAnswer = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}/answers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          situation: answer.situation.content,
          task: answer.task.content,
          action: answer.action.content,
          result: answer.result.content,
        }),
      }
    );
    console.log("postAnswer response", response);
    if (!response.ok) {
      throw new Error(response);
    }
    const data = await response.json();
    console.log("postAnswer data", data);
    return data;
  };

  const queryClient = useQueryClient();

  const addAnswerMutation = useMutation({
    mutationFn: postAnswer,
    // onMutate: () => {},
    onSuccess: () => {
      // Invalidate the Query Key
      // queryClient.invalidateQueries({ queryKey: ["question", questionId] });
      // Refetch the Query Key
      queryClient.refetchQueries(["question", questionId]);
      // Reset the Answer State
      setAnswer({
        situation: { content: "", isValid: undefined },
        task: { content: "", isValid: undefined },
        action: { content: "", isValid: undefined },
        result: { content: "", isValid: undefined },
      });
    },
    // onError: () => {},
    // onSettled: () => {},
  });

  const { isPending, isError, error, isSuccess } = addAnswerMutation;

  const submitHandler = (event) => {
    event.preventDefault();
    const isFormValid = Object.values(answer).every(
      (answer) => answer.isValid === true
    );
    if (!isFormValid) {
      return;
    }
    if (isFormValid) {
      addAnswerMutation.mutate();
    }
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
              Add your Answer
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
            value={answer.situation.content}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answer.situation.isValid ? consistentFormFieldBorder : "red"
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.situation.isValid === false && (
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
            value={answer.task.content}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answer.task.isValid ? consistentFormFieldBorder : "red"
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.task.isValid === false && (
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
            value={answer.action.content}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answer.action.isValid ? consistentFormFieldBorder : "red"
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.action.isValid === false && (
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
            value={answer.result.content}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                answer.result.isValid ? consistentFormFieldBorder : "red"
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.result.isValid === false && (
            <Typography color="error">
              Your Result must be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} gap={1} mt={2}>
            <Button
              variant="contained"
              onClick={() => setShowAnswerForm((prev) => !prev)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
              disabled={isPending}>
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
                ❌ Error: {error.toString()}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddAnswerForm;
