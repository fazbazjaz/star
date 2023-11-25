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
    situation: false,
    task: false,
    action: false,
    result: false,
  });

  const [status, setStatus] = useState({
    submitting: null,
    error: null,
    success: null,
    message: null,
  });

  const questionId = useParams().id;

  const validateIndividualTextarea = (key) => {
    if (answer[key].length < 10 || answer[key].length > 500) {
      answerValidation[key] = true;
    } else {
      answerValidation[key] = false;
    }
  };

  const validateAllTextareas = () => {
    Object.keys(answer).forEach((key) => {
      validateIndividualTextarea(key);
    });

    const isValidated = Object.values(answerValidation).some((value) => value);

    if (isValidated) {
      return false;
    }
    return true;
  };

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => {
      return { ...prevAnswer, [event.target.id]: event.target.value };
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!validateAllTextareas()) {
      setStatus({
        submitting: false,
        error: true,
        success: false,
        message: "There are issues in your Answers Form 🙁",
      });
    } else {
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
        // console.log("AddAnswer response:", response);

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
    }
  };

  return (
    <Box mt={4}>
      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          justifyContent: "center",
        }}>
        <FormControl
          sx={{
            minWidth: "50%",
            py: 6,
            px: 6,
            borderRadius: 2,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
          }}>
          <Typography variant="h3">Add your Answer</Typography>
          <Typography variant="h5" my={2}>
            ⭐ Situation:
          </Typography>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Situation"
            minRows={7}
            placeholder="Please carefully type out the Situation"
            value={answer.situation}
            onChange={changeHandler}
            style={{
              fontSize: "16px",
              border: `1px solid ${
                answerValidation.situation ? "red" : "black"
              }`,
            }}
          />
          {answerValidation.situation && (
            <Typography color="error">
              Your Situation needs to be between 10-500 Characters
            </Typography>
          )}
          <Typography variant="h5" my={2}>
            ⭐ Task:
          </Typography>
          <TextareaAutosize
            id="task"
            aria-label="Add your Task"
            minRows={7}
            placeholder="Please carefully type out the Task"
            value={answer.task}
            onChange={changeHandler}
            style={{
              fontSize: "16px",
              border: `1px solid ${answerValidation.task ? "red" : "black"}`,
            }}
          />
          {answerValidation.task && (
            <Typography color="error">
              Your Task needs to be between 10-500 Characters
            </Typography>
          )}
          <Typography variant="h5" my={2}>
            ⭐ Action:
          </Typography>
          <TextareaAutosize
            id="action"
            aria-label="Add your Action"
            minRows={7}
            placeholder="Please carefully type out the Action"
            value={answer.action}
            onChange={changeHandler}
            style={{
              fontSize: "16px",
              border: `1px solid ${answerValidation.action ? "red" : "black"}`,
            }}
          />
          {answerValidation.action && (
            <Typography color="error">
              Your Action needs to be between 10-500 Characters
            </Typography>
          )}
          <Typography variant="h5" my={2}>
            ⭐ Result:
          </Typography>
          <TextareaAutosize
            id="result"
            aria-label="Add your Result"
            minRows={7}
            placeholder="Please carefully type out the Result"
            value={answer.result}
            onChange={changeHandler}
            style={{
              fontSize: "inherit",
              border: `1px solid ${answerValidation.result ? "red" : "black"}`,
            }}
          />
          {answerValidation.result && (
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

export default AddAnswer;
