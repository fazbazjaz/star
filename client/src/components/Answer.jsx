// version4 my code. Here I did a commit push to repo. I need to import both questionData and userCookie.
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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

const Answer = ({ answerData, questionData, userCookie, answerDelete }) => {
  const {
    userCookie: { id: userId },
  } = useContext(AuthContext);
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);

  const handleDelete = async (questionId, answerId) => {
    try {
      // Assuming answerDelete makes a DELETE request to the server
      await answerDelete(questionId, answerId);

      // If the deletion is successful, you might want to update the UI accordingly.
      console.log("Answer deleted successfully.");

      // You may want to trigger a refresh or update the state to reflect the deleted answer.
      // For example, you could fetch updated data or modify the state in a way that
      // excludes the deleted answer.
    } catch (error) {
      console.error("Error deleting answer:", error);
      // Handle errors, such as displaying an error message to the user.
    }
  };

  const isValidAnswerData = answerData && answerData.userId !== undefined;

  return (
    <>
      {isValidAnswerData && (
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
              by userId: {answerData.userId}
            </Typography>
            <Box marginLeft={"auto"}>
              {answerData.userId === userId && (
                <IconButton
                  onClick={() =>
                    handleDelete(answerData.questionId, answerData.id)
                  }
                  color="primary"
                  sx={{ marginLeft: "auto" }}>
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>

          {/* Situation Box */}
          <Box
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{ backdropFilter: consistentBackdropFilter }}>
            {/* ... Situation Box content ... */}
          </Box>

          {/* Task Box */}
          <Box
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{ backdropFilter: consistentBackdropFilter }}>
            {/* ... Task Box content ... */}
          </Box>

          {/* Action Box */}
          <Box
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{ backdropFilter: consistentBackdropFilter }}>
            {/* ... Action Box content ... */}
          </Box>

          {/* Result Box */}
          <Box
            p={2}
            border={consistentBorder}
            borderRadius={consistentBorderRadius}
            bgcolor={consistentBgColor}
            boxShadow={consistentBoxShadow}
            sx={{ backdropFilter: consistentBackdropFilter }}>
            {/* ... Result Box content ... */}
          </Box>

          {/* Updated and Created Info */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"flex-end"}
            alignItems={"flex-end"}
            my={1}>
            <Typography variant={"caption"}>
              Created: {formatDate(answerData.createdAt)}
            </Typography>
            <Typography variant={"caption"}>
              Updated: {formatDate(answerData.updatedAt)}
            </Typography>
          </Box>

          {/* Comments */}
          {answerData.comments &&
            answerData.comments.map((commentData) => (
              <Comment key={commentData.id} commentData={commentData} />
            ))}

          {/* Action Buttons */}
          <Box mt={1.5} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              startIcon={<SmsOutlinedIcon />}
              onClick={() => setShowAddCommentForm(!showAddCommentForm)}>
              {showAddCommentForm ? "Cancel" : "Add Comment"}
            </Button>
            <Button
              variant="contained"
              endIcon={<ArrowForwardIosRoundedIcon />}
              color="primary">
              Share
            </Button>
          </Box>

          {/* Add Comment Form */}
          {showAddCommentForm && (
            <AddCommentForm
              onSubmit={(comment) => {
                // Handle comment submission
                console.log("Adding comment:", comment);
              }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default Answer;

// vesrion1 my code
// import { useState, useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { Box, Typography, Button, IconButton } from "@mui/material";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import PsychologyAltRoundedIcon from "@mui/icons-material/PsychologyAltRounded";
// import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
// import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
// import AddCommentForm from "./AddCommentForm";
// import Comment from "./Comment";
// import { formatDate } from "../utils/formatDate";
// import {
//   consistentBorder,
//   consistentBorderRadius,
//   consistentBgColor,
//   consistentBoxShadow,
//   consistentBackdropFilter,
// } from "../themes/ConsistentStyles";

// const Answer = ({ answerData, questionData, userCookie, answerDelete }) => {
//   const {
//     userCookie: { id: userId },
//   } = useContext(AuthContext);
//   const [showAddCommentForm, setShowAddCommentForm] = useState(false);

//   const handleDelete = async (questionId, answerId) => {
//     console.log(
//       "Delete answer with questionId:",
//       questionId,
//       "and answerId:",
//       answerId
//     );
//   };

//   return (
//     <>
//       {answerData && (
//         <Box
//           display={"grid"}
//           gridTemplateColumns={"auto"}
//           gridTemplateRows={"auto"}
//           p={3}
//           border={consistentBorder}
//           borderRadius={consistentBorderRadius}
//           bgcolor={consistentBgColor}
//           boxShadow={consistentBoxShadow}
//           sx={{
//             backdropFilter: consistentBackdropFilter,
//           }}>
//           <Box display={"flex"} gap={0.5} alignItems={"center"}>
//             <PsychologyAltRoundedIcon fontSize={"medium"} color="primary" />
//             <Typography variant={"answertitle"} color="primary">
//               Answer
//             </Typography>
//             <Typography variant={"body2"}>(id: {answerData.id})</Typography>
//             <Typography variant={"body2"}>
//               by userId: {answerData.userId}
//             </Typography>
//             <Box marginLeft={"auto"}>
//               {answerData.userId === userId && (
//                 <IconButton
//                   onClick={() =>
//                     handleDelete(answerData.questionId, answerData.id)
//                   }
//                   color="primary"
//                   sx={{ marginLeft: "auto" }}>
//                   <DeleteOutlineIcon />
//                 </IconButton>
//               )}
//             </Box>
//           </Box>

//           {/* Situation Box */}
//           <Box
//             p={2}
//             border={consistentBorder}
//             borderRadius={consistentBorderRadius}
//             bgcolor={consistentBgColor}
//             boxShadow={consistentBoxShadow}
//             sx={{ backdropFilter: consistentBackdropFilter }}>
//             <Box display="flex" alignItems={"center"} gap={0.5}>
//               <ArrowForwardIosRoundedIcon
//                 fontSize={"small"}
//                 color={"primary"}
//               />
//               <Typography>Situation</Typography>
//             </Box>
//             <Typography mt={1.5} variant={"answerbody"}>
//               {answerData.situation}
//             </Typography>
//           </Box>

//           {/* Task Box */}
//           <Box
//             p={2}
//             border={consistentBorder}
//             borderRadius={consistentBorderRadius}
//             bgcolor={consistentBgColor}
//             boxShadow={consistentBoxShadow}
//             sx={{ backdropFilter: consistentBackdropFilter }}>
//             <Box display="flex" alignItems={"center"} gap={0.5}>
//               <ArrowForwardIosRoundedIcon
//                 fontSize={"small"}
//                 color={"primary"}
//               />
//               <Typography>Task</Typography>
//             </Box>
//             <Typography mt={1.5} variant={"answerbody"}>
//               {answerData.task}
//             </Typography>
//           </Box>

//           {/* Action Box */}
//           <Box
//             p={2}
//             border={consistentBorder}
//             borderRadius={consistentBorderRadius}
//             bgcolor={consistentBgColor}
//             boxShadow={consistentBoxShadow}
//             sx={{ backdropFilter: consistentBackdropFilter }}>
//             <Box display="flex" alignItems={"center"} gap={0.5}>
//               <ArrowForwardIosRoundedIcon
//                 fontSize={"small"}
//                 color={"primary"}
//               />
//               <Typography>Action</Typography>
//             </Box>
//             <Typography mt={1.5} variant={"answerbody"}>
//               {answerData.action}
//             </Typography>
//           </Box>

//           {/* Result Box */}
//           <Box
//             p={2}
//             border={consistentBorder}
//             borderRadius={consistentBorderRadius}
//             bgcolor={consistentBgColor}
//             boxShadow={consistentBoxShadow}
//             sx={{ backdropFilter: consistentBackdropFilter }}>
//             <Box display="flex" alignItems={"center"} gap={0.5}>
//               <ArrowForwardIosRoundedIcon
//                 fontSize={"small"}
//                 color={"primary"}
//               />
//               <Typography fontSize={18}>Result</Typography>
//             </Box>
//             <Typography mt={1.5} variant={"answerbody"}>
//               {answerData.result}
//             </Typography>
//           </Box>

//           {/* Updated and Created Info */}
//           <Box
//             display={"flex"}
//             flexDirection={"column"}
//             justifyContent={"flex-end"}
//             alignItems={"flex-end"}
//             my={1}>
//             <Typography variant={"body2"}>
//               updated {formatDate(answerData.updatedAt)}
//             </Typography>
//             <Typography variant={"body2"}>
//               created {formatDate(answerData.createdAt)}
//             </Typography>
//           </Box>

//           {/* Comments */}
//           {answerData.comments &&
//             answerData.comments.map((commentData) => (
//               <Comment key={commentData.id} commentData={commentData} />
//             ))}

//           {/* Action Buttons */}
//           <Box mt={1.5}>
//             <Button
//               variant="outlined"
//               sx={{ display: "flex", gap: 0.5 }}
//               onClick={() => setShowAddCommentForm((prev) => !prev)}
//               disabled={showAddCommentForm}>
//               <SmsOutlinedIcon />
//               Add a Comment
//             </Button>
//             {showAddCommentForm && (
//               <AddCommentForm
//                 questionId={answerData.questionId}
//                 answerId={answerData.id}
//                 setShowAddCommentForm={setShowAddCommentForm}
//               />
//             )}
//             {questionData.userId === userCookie.id && (
//               <IconButton
//                 onClick={() => answerDelete(answerData.id)}
//                 color="primary"
//                 sx={{ marginLeft: "auto" }}>
//                 <DeleteOutlineIcon />
//               </IconButton>
//             )}
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default Answer;
