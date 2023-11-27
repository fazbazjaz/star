import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { consistentPageBackgroundImage } from "../themes/ConsistentStyles";

const AddQuestionPage = () => {
  const [question, setQuestion] = useState("");
  const [validationError, setValidationError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  const validate = (question) => {
    if (!question || question.length < 10 || question.length > 500) {
      setValidationError(
        "Your Question should be between 10 to 500 characters."
      );
      return false;
    } else {
      setValidationError(null);
      return true;
    }
  };

  const changeHandler = (event) => {
    const { value } = event.target;
    setQuestion(value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setSuccessMessage("");
    if (validate(question)) {
      try {
        setSubmitting(true);
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions/add`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // attach the HTTP-Only Cookie with customJWT
            body: JSON.stringify({ question }),
          }
        );
        // console.log("AddQuestion submitHandler response", response);

        if (!response.ok) {
          throw response;
        }

        const data = await response.json();
        console.log("AddQuestion submitHandler data", data);

        setSuccessMessage("Your question was successfully added! Thank you ⭐");
        setQuestion("");
      } catch (error) {
        console.error("AddQuestion submitHandler error:", error);
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Box
      p={3}
      color="white"
      sx={{
        backgroundImage: consistentPageBackgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Box display="flex" justifyContent="center" marginY={5}>
        <form onSubmit={submitHandler}>
          <FormControl>
            <Typography variant="h2">Add a Question</Typography>
            <Typography mb={1}>
              Please provide the full question you were asked in your Interview
            </Typography>
            <TextareaAutosize
              id="question"
              aria-label="Add a question"
              padding={5}
              minRows={7}
              placeholder="Please carefully type out the Question"
              value={question}
              onChange={changeHandler}
              style={{
                border: `1px solid ${validationError ? "red" : "black"}`,
              }}
            />
            {validationError && (
              <Typography color="error">{validationError}</Typography>
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
    </Box>
  );
};

export default AddQuestionPage;
