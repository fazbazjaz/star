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

const AddAnswerForm = ({ questionId, setShowAnswerForm }) => {
  const [answer, setAnswer] = useState({
    situation: { content: "", error: undefined },
    task: { content: "", error: undefined },
    action: { content: "", error: undefined },
    result: { content: "", error: undefined },
  });

  const [status, setStatus] = useState({
    submitting: false,
    error: false,
    success: false,
    message: null,
  });

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => {
      return {
        ...prevAnswer,
        [event.target.id]: {
          content: event.target.value,
          error:
            event.target.value.length < 10 || event.target.value.length > 500
              ? true
              : false,
        },
      };
    });
  };

  const validateAllTextareas = () => {
    return Object.values(answer).every((answer) => answer.error === false);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateAllTextareas()) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There are problems in your Answer Form 🙁",
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
        }/api/questions/${questionId}/answers`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // attach the HTTP-Only Cookie with customJWT
          body: JSON.stringify({
            situation: answer.situation.content,
            task: answer.task.content,
            action: answer.action.content,
            result: answer.result.content,
          }),
        }
      );
      // console.log("AddAnswer response:", response);

      if (!response.ok) {
        throw response;
      }

      // const data = await response.json();
      // console.log("AddAnswer postAnswer data:", data);

      setStatus({
        submitting: false,
        error: false,
        success: true,
        message: "Your Answer was successfully added!😁 Thank you ⭐",
      });

      setAnswer({
        situation: { content: "", error: undefined },
        task: { content: "", error: undefined },
        action: { content: "", error: undefined },
        result: { content: "", error: undefined },
      });
    } catch (error) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There was an error sending the Answer to the Server 😭",
      });
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
                answer.situation.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.situation.error && (
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
                answer.task.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.task.error && (
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
                answer.action.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.action.error && (
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
                answer.result.error ? "red" : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {answer.result.error && (
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
              disabled={status.submitting}>
              Add Answer
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

export default AddAnswerForm;
