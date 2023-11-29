import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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

const EditQuestionForm = ({ questionId, originalQuestion, setIsEditing }) => {
  const [editedQuestion, setEditedQuestion] = useState(originalQuestion);
  const [editedQuestionValidation, setEditedQuestionValidation] =
    useState(undefined);

  const changeHandler = (event) => {
    setEditedQuestion(event.target.value);
    setEditedQuestionValidation(
      event.target.value.trim().length > 10 &&
        event.target.value.trim().length < 500
    );
  };

  const putQuestion = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: editedQuestion }),
      }
    );
    // console.log("putQuestion response:", response);
    if (!response.ok) {
      throw new Error(
        `${response.status} ${response.statusText} : editedQuestion failed`
      );
    }
    const data = await response.json();
    // console.log("putQuestion data:", data);
    return data;
  };

  const queryClient = useQueryClient();

  const editQuestionMutation = useMutation({
    mutationFn: putQuestion,
    onSuccess: () => {
      queryClient.refetchQueries(["question", questionId]);
      setEditedQuestionValidation(undefined);
      setTimeout(() => {
        setIsEditing(false);
      }, 1500);
    },
  });

  const { isPending, isError, error, isSuccess } = editQuestionMutation;

  const submitHandler = async (event) => {
    event.preventDefault();
    if (editedQuestionValidation === undefined) {
      setEditedQuestionValidation(false);
    }
    if (!editedQuestionValidation) {
      return;
    }
    if (editedQuestionValidation) {
      editQuestionMutation.mutate();
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
      <form
        onSubmit={submitHandler}
        style={{
          display: "grid",
        }}>
        <FormControl>
          <TextareaAutosize
            aria-label="Edit your question"
            minRows={2}
            value={editedQuestion}
            onChange={changeHandler}
            style={{
              padding: "0.5rem",
              backgroundColor: consistentFormFieldBackgroundColor,
              border: `1px solid ${
                editedQuestionValidation === false
                  ? "red"
                  : consistentFormFieldBorder
              }`,
              borderRadius: "0.5rem",
              fontSize: "1rem",
              fontFamily: "inherit",
              resize: "none",
            }}
          />
          {editedQuestionValidation === false && (
            <Typography color="error">
              Your Question needs to be between 10-500 Characters
            </Typography>
          )}
          <Box display={"flex"} alignItems={"center"} gap={1} mt={1}>
            <Button variant="contained" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isPending || !editedQuestionValidation}>
              Save <SaveAsRoundedIcon />
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
                ✅ Your Question was successfully updated! Thank you
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

export default EditQuestionForm;
