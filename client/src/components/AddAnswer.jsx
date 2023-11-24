import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const AddAnswer = () => {
  const [answer, setAnswer] = useState({
    situation: "",
    task: "",
    action: "",
    result: "",
  });

  const [answerValidation, setAnswerValidation] = useState({
    situation: undefined,
    task: undefined,
    action: undefined,
    result: undefined,
  });

  const [status, setStatus] = useState({
    submitting: null,
    error: null,
    success: null,
    message: null,
  });

  const questionId = useParams().id;

  const validateIndividualTextarea = (key) => {
    console.log("validateIndividualTextarea key:", key);
    if (!answer[key] || answer[key].length < 50 || answer[key].length > 500) {
      setAnswerValidation((prevValidation) => ({
        ...prevValidation,
        [key]: false,
      }));
    } else {
      setAnswerValidation((prevValidation) => ({
        ...prevValidation,
        [key]: true,
      }));
    }
  };

  const validateAllTextareas = () => {
    const isValidated = Object.values(answerValidation).every(
      (value) => value === true
    );
    if (!isValidated) {
      return false;
    }
    return true;
  };

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => {
      if (event.target.value === undefined) {
        return { ...prevAnswer, [event.target.id]: undefined };
      } else {
        return { ...prevAnswer, [event.target.id]: event.target.value };
      }
    });
    validateIndividualTextarea(event.target.id);
    console.log("answer:", answer, "answerValidation", answerValidation);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateAllTextareas()) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There are issues in your Answers Form 🙁",
      });
      return;
    }
    postAnswer(questionId);
  };

  const postAnswer = async (questionId) => {
    try {
      setStatus({
        submitting: true,
        error: undefined,
        success: undefined,
        message: undefined,
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
            situation: answer.situation,
            task: answer.task,
            action: answer.action,
            result: answer.result,
          }),
        }
      );
      // console.log("AddAnswer postAnswer response:", response);

      if (!response.ok) {
        throw response;
      }

      // const data = await response.json();
      // console.log("AddAnswer postAnswer data:", data);

      setStatus({
        submitting: false,
        error: undefined,
        success: true,
        message: "Your answer was successfully added!😁 Thank you ⭐",
      });
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
    } catch (error) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There was an error sending the Form to the Server 😭",
      });
      console.error("AddAnswer postAnswer error:", error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginY={5}>
      <form onSubmit={submitHandler}>
        <FormControl>
          <Typography variant="h3">Add your STAR Answer</Typography>
          <Typography variant="h5" my={2}>
            Situation:
          </Typography>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Situation"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Situation"
            value={answer.situation}
            onChange={changeHandler}
            style={{
              border: `1px solid ${
                typeof answerValidation.situation === "boolean" &&
                !answerValidation.situation
                  ? "red"
                  : "black"
              }`,
            }}
          />
          {typeof answerValidation.situation === "boolean" &&
            !answerValidation.situation && (
              <Typography color="error">
                Your Situation needs to be between 50-500 Characters
              </Typography>
            )}
          <Typography variant="h5" my={2}>
            Result:
          </Typography>
          <TextareaAutosize
            id="task"
            aria-label="Add your Task"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Task"
            value={answer.task}
            onChange={changeHandler}
            style={{
              border: `1px solid ${
                typeof answerValidation.task === "boolean" &&
                answerValidation.task === false
                  ? "red"
                  : "black"
              }`,
            }}
          />
          {typeof answerValidation.task === "boolean" &&
            answerValidation.task === false && (
              <Typography color="error">
                Your Task needs to be between 50-500 Characters
              </Typography>
            )}
          <Typography variant="h5" my={2}>
            Result:
          </Typography>
          <TextareaAutosize
            id="action"
            aria-label="Add your Action"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Action"
            value={answer.action}
            onChange={changeHandler}
            style={{
              border: `1px solid ${
                typeof answerValidation.action === "boolean" &&
                answerValidation.action === false
                  ? "red"
                  : "black"
              }`,
            }}
          />
          {typeof answerValidation.action === "boolean" &&
            answerValidation.action === false && (
              <Typography color="error">
                Your Action needs to be between 50-500 Characters
              </Typography>
            )}
          <Typography variant="h5" my={2}>
            Result:
          </Typography>
          <TextareaAutosize
            id="result"
            aria-label="Add your Result"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Result"
            value={answer.result}
            onChange={changeHandler}
            style={{
              border: `1px solid ${
                typeof answerValidation.result === "boolean" &&
                answerValidation.result === false
                  ? "red"
                  : "black"
              }`,
            }}
          />
          {typeof answerValidation.result === "boolean" &&
            answerValidation.result === false && (
              <Typography color="error">
                Your Result must be between 10-500 Characters
              </Typography>
            )}
          <Box display={"flex"} gap={1} mt={2}>
            <Button variant="contained" component={NavLink} to={"/questions"}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
              disabled={status.submitting}>
              Send
            </Button>
          </Box>
          <Box>
            {status.submitting && (
              <Typography
                color={"info"}
                mt={2}
                py={0.5}
                px={1}
                borderRadius={1.5}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
                Submitting...
              </Typography>
            )}
            {status.success && (
              <Typography
                color={"success.main"}
                mt={2}
                py={0.5}
                px={1}
                borderRadius={1.5}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
                Success: {status.message}
              </Typography>
            )}
            {status.error && (
              <Typography
                color={"error"}
                mt={2}
                py={0.5}
                px={1}
                borderRadius={1.5}
                sx={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}>
                Error: {status.message}
              </Typography>
            )}
          </Box>
        </FormControl>
      </form>
    </Box>
  );
};

export default AddAnswer;
