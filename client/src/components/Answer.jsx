import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import AddCommentForm from "./AddCommentForm";
import Comment from "./Comment";
import { formatDate } from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
} from "../themes/ConsistentStyles";

const Answer = ({ answerData }) => {
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  return (
    <>
      {answerData && (
        <Box
          display={"grid"}
          gridTemplateColumns={"auto"}
          gridTemplateRows={"auto"}
          p={3}
          border={consistentBorder}
          borderRadius={consistentBorderRadius}
          bgcolor={consistentBgColor}
          boxShadow={consistentBoxShadow}
          sx={{
            backdropFilter: consistentBackdropFilter,
          }}>
          <Box display={"flex"} gap={0.5} alignItems={"center"}>
            <PsychologyAltRoundedIcon fontSize={"medium"} color="primary" />
            <Typography variant={"answertitle"} color="primary">
              Answer
            </Typography>
            <Typography variant={"body2"}>(id: {answerData.id})</Typography>
            <Typography variant={"body2"}>
              by [⚠️get the userId of the Answer]
            </Typography>
          </Box>
          <Box display={"grid"} gap={1} mt={1}>
            <Box
              p={2}
              border={consistentBorder}
              borderRadius={consistentBorderRadius}
              bgcolor={consistentBgColor}
              boxShadow={consistentBoxShadow}
              sx={{
                backdropFilter: consistentBackdropFilter,
              }}>
              <Box display="flex" alignItems={"center"} gap={0.5}>
                <ArrowForwardIosRoundedIcon
                  fontSize={"small"}
                  color={"primary"}
                />
                <Typography>Situation</Typography>
              </Box>
              <Typography mt={1.5} variant={"answerbody"}>
                {answerData.situation}
              </Typography>
            </Box>
            <Box
              p={2}
              border={consistentBorder}
              borderRadius={consistentBorderRadius}
              bgcolor={consistentBgColor}
              boxShadow={consistentBoxShadow}
              sx={{
                backdropFilter: consistentBackdropFilter,
              }}>
              <Box display="flex" alignItems={"center"} gap={0.5}>
                <ArrowForwardIosRoundedIcon
                  fontSize={"small"}
                  color={"primary"}
                />
                <Typography>Task</Typography>
              </Box>
              <Typography mt={1.5} variant={"answerbody"}>
                {answerData.task}
              </Typography>
            </Box>
            <Box
              p={2}
              border={consistentBorder}
              borderRadius={consistentBorderRadius}
              bgcolor={consistentBgColor}
              boxShadow={consistentBoxShadow}
              sx={{
                backdropFilter: consistentBackdropFilter,
              }}>
              <Box display="flex" alignItems={"center"} gap={0.5}>
                <ArrowForwardIosRoundedIcon
                  fontSize={"small"}
                  color={"primary"}
                />
                <Typography>Action</Typography>
              </Box>
              <Typography mt={1.5} variant={"answerbody"}>
                {answerData.action}
              </Typography>
            </Box>
            <Box
              p={2}
              border={consistentBorder}
              borderRadius={consistentBorderRadius}
              bgcolor={consistentBgColor}
              boxShadow={consistentBoxShadow}
              sx={{
                backdropFilter: consistentBackdropFilter,
              }}>
              <Box display="flex" alignItems={"center"} gap={0.5}>
                <ArrowForwardIosRoundedIcon
                  fontSize={"small"}
                  color={"primary"}
                />
                <Typography fontSize={18}>Result</Typography>
              </Box>
              <Typography mt={1.5} variant={"answerbody"}>
                {answerData.result}
              </Typography>
            </Box>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            my={1}>
            <Typography variant={"body2"}>
              updated {formatDate(answerData.updatedAt)}
            </Typography>
            <Typography variant={"body2"}>
              created {formatDate(answerData.createdAt)}
            </Typography>
          </Box>
          {answerData.comments &&
            answerData.comments.map((commentData) => (
              <Comment key={commentData.id} commentData={commentData} />
            ))}
          <Box mt={1.5}>
            <Button
              variant="outlined"
              sx={{ display: "flex", gap: 0.5 }}
              onClick={() => setShowAddCommentForm((prev) => !prev)}
              disabled={showAddCommentForm}>
              <SmsOutlinedIcon />
              Add a Comment
            </Button>
            {showAddCommentForm && (
              <AddCommentForm
                questionId={answerData.questionId}
                answerId={answerData.id}
                setShowAddCommentForm={setShowAddCommentForm}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default Answer;
