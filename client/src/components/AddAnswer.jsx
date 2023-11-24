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
  console.log("AddAnswer RENDERED");
  const [answer, setAnswer] = useState({
    situation: "",
    task: "",
    action: "",
    result: "",
  });
  const [validation, setValidation] = useState({
    situation: true,
    task: true,
    action: true,
    result: true,
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const questionId = useParams().id;
  // console.log("AddAnswer questionId:", questionId);

  const validateIndividualTextarea = (key) => {
    if (!answer[key] || answer[key].length < 10 || answer[key].length > 500) {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [key]: false,
      }));
    } else {
      setValidation((prevValidation) => ({
        ...prevValidation,
        [key]: true,
      }));
    }
  };

  const validateAllTextareas = () => {
    // Loop through the Answer object
    Object.keys(answer).forEach((key) => {
      validateIndividualTextarea(key);
    });

    // check if all the values in the Answer object are true
    const isValidated = Object.values(answer).every((value) => value === true);

    if (isValidated) {
      // console.log("isValidated true");
      return true;
    }
    // console.log("isValidated false");
    return false;
  };

  const changeHandler = (event) => {
    setAnswer((prevAnswer) => ({
      ...prevAnswer,
      [event.target.id]: event.target.value,
    }));
    validateIndividualTextarea(event.target.id);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    console.log("submitHandler validation", validation);
    validateAllTextareas();
    postAnswer(questionId);
  };

  const postAnswer = async (questionId) => {
    if (validateAllTextareas()) {
      try {
        setSubmitting(true);
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

        if (response.ok) {
          setSuccessMessage("Your answer was successfully added! Thank you ⭐");
          setAnswer({});
        }
      } catch (error) {
        console.error("AddAnswer postAnswer error:", error);
      } finally {
        setSubmitting(false);
        setAnswer({
          situation: "",
          task: "",
          action: "",
          result: "",
        });
        setValidation({
          situation: false,
          task: false,
          action: false,
          result: false,
        });
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" marginY={5}>
      <form onSubmit={submitHandler}>
        <FormControl>
          <Typography variant="h2">Add your Answer</Typography>
          <Typography mb={1}>Please provide your STAR Answer</Typography>
          <TextareaAutosize
            id="situation"
            aria-label="Add your Situation"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Situation"
            value={answer.situation}
            onChange={changeHandler}
            style={{
              border: `1px solid ${!validation.situation ? "red" : "black"}`,
            }}
          />
          {!validation.situation && (
            <Typography color="error">Your situation is not valid</Typography>
          )}
          <TextareaAutosize
            id="task"
            aria-label="Add your Task"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Task"
            value={answer.task}
            onChange={changeHandler}
            style={{
              border: `1px solid ${!validation.task ? "red" : "black"}`,
            }}
          />
          {!validation.result && (
            <Typography color="error">Your result is not valid</Typography>
          )}
          <TextareaAutosize
            id="action"
            aria-label="Add your Action"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Action"
            value={answer.action}
            onChange={changeHandler}
            style={{
              border: `1px solid ${!validation.action ? "red" : "black"}`,
            }}
          />
          {!validation.result && (
            <Typography color="error">Your action is not valid</Typography>
          )}
          <TextareaAutosize
            id="result"
            aria-label="Add your Result"
            padding={5}
            minRows={7}
            placeholder="Please carefully type out the Result"
            value={answer.result}
            onChange={changeHandler}
            style={{
              border: `1px solid ${!validation.result ? "red" : "black"}`,
            }}
          />
          {!validation.result && (
            <Typography color="error">Your result is not valid</Typography>
          )}
          <Box display={"flex"} gap={1} mt={2}>
            <Button variant="contained" component={NavLink} to={"/questions"}>
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              endIcon={<SendIcon />}
              disabled={submitting}>
              Send
            </Button>
          </Box>
          {successMessage && (
            <Typography color={"success.main"} mt={1}>
              {successMessage}
            </Typography>
          )}
        </FormControl>
      </form>
    </Box>
  );
};

export default AddAnswer;
