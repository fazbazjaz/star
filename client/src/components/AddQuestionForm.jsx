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
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentFormFieldBackgroundColor,
  consistentFormFieldBorder,
} from "../themes/ConsistentStyles";

const AddQuestionForm = ({ setShowAddQuestionForm }) => {
  const [question, setQuestion] = useState("");
  const [questionValidation, setQuestionValidation] = useState(undefined);

  const changeHandler = (event) => {
    setQuestion(event.target.value);
    setQuestionValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const postQuestion = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/questions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ question }),
      }
    );
    console.log("postQuestion response", response);
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} : postQuestion failed`
      );
    }
    const data = await response.json();
    console.log("postQuestion data", data);
    return data;
  };

  const queryClient = useQueryClient();

  const addQuestionMutation = useMutation({
    mutationFn: postQuestion,
    onSuccess: () => {
      queryClient.refetchQueries(["questions"]);
      setQuestion("");
      setQuestionValidation(undefined);
      setTimeout(() => {
        setShowAddQuestionForm((prev) => !prev);
      }, 1500);
    },
  });

  const { isPending, isError, error, isSuccess } = addQuestionMutation;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (questionValidation === undefined) {
      setQuestion(false);
    }
    if (!questionValidation) {
      return;
    }
    if (questionValidation) {
      addQuestionMutation.mutate();
    }
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
              onClick={() => setShowAddQuestionForm((prev) => !prev)}>
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
                ✅ Your Comment was successfully added! Thank you
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

export default AddQuestionForm;
