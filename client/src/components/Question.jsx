import { useContext, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Link, IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import { formatDate } from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentLinkColor,
} from "../themes/ConsistentStyles";
import EditQuestionForm from "./EditQuestionForm";

const Question = ({
  questionData,
  questionAsLink,
  showAddAnswerForm,
  setShowAddAnswerForm,
}) => {
  // get the userCookie from AuthContext
  const { userCookie } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = async () => {
    setIsEditing(true);
  };

  // TO DO: Convert this to use TanStack Query Mutations
  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );
      // console.log("handleDelete response:", response);
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      const data = await response.json();
      console.log("handleDelete data:", data);

      // TO DO: We need to Synchronise State HERE!
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <>
      {questionData && (
        <Box
          display={"grid"}
          p={2}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box display={"flex"} alignItems={"center"} gap={0.5}>
            <HelpOutlineOutlinedIcon fontSize={"medium"} color="primary" />
            <Typography variant={"questiontitle"} color="primary">
              Question
            </Typography>
            <Typography variant={"body2"}>(id: {questionData.id})</Typography>
            <Typography variant={"body2"}>
              by userId: {questionData.userId}
            </Typography>
            <Box marginLeft={"auto"}>
              {questionData.userId === userCookie.id && (
                <IconButton
                  onClick={() => handleEdit(questionData.id)}
                  color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {questionData.userId === userCookie.id && (
                <IconButton
                  onClick={() => handleDelete(questionData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box mt={1}>
            {isEditing ? (
              <EditQuestionForm
                questionId={questionData.id}
                originalQuestion={questionData.question}
                setIsEditing={setIsEditing}
              />
            ) : questionAsLink ? (
              <Link
                component={RouterLink}
                to={`/questions/${questionData.id}`}
                color={consistentLinkColor}
                variant="questionbody">
                {questionData.question}
              </Link>
            ) : (
              <Typography variant={"questionbody"}>
                {questionData.question}
              </Typography>
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={1}>
            <Box>
              {!questionAsLink && (
                <Box mt={1}>
                  <Button
                    variant="outlined"
                    startIcon={<RateReviewOutlinedIcon />}
                    onClick={() => setShowAddAnswerForm((prev) => !prev)}
                    disabled={showAddAnswerForm}>
                    Add an Answer
                  </Button>
                </Box>
              )}
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}>
              <Typography variant={"body2"}>
                Question updated {formatDate(questionData.updatedAt)}
              </Typography>
              <Typography variant={"body2"}>
                Question created {formatDate(questionData.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Question;
