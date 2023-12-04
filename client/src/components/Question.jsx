// version1 my code
import { useContext, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, Link, IconButton } from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { AuthContext } from "../context/AuthContext";
import deleteQuestion from "../api/deleteQuestion";
import formatDate from "../utils/formatDate";
import {
  consistentBorder,
  consistentBorderRadius,
  consistentBgColor,
  consistentBoxShadow,
  consistentBackdropFilter,
  consistentLinkColor,
} from "../themes/ConsistentStyles";
import QuestionForm from "./QuestionForm";
import SearchBar from "./SearchBar"; // Ensure the correct path

// Import your debouncedSearchQuestions function
import { debouncedSearchQuestions } from "../questions";

const Question = ({
  questionData,
  showAddAnswerForm,
  setShowAddAnswerForm,
}) => {
  const { authenticatedUser } = useContext(AuthContext);

  const [showUpdateQuestionForm, setShowUpdateQuestionForm] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  useEffect(() => {
    // Define a debounced function to handle the search
    const debouncedSearch = debounce(async () => {
      try {
        const result = await debouncedSearchQuestions(searchValue);
        setSearchResult(result);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    // Call the debounced function when the searchValue changes
    debouncedSearch();

    // Cleanup function to clear the timeout on unmount or when searchValue changes
    return () => clearTimeout(debouncedSearch);
  }, [searchValue]);

  const handleEdit = async () => {
    setShowUpdateQuestionForm(true);
  };

  const location = useLocation();

  let currentPage;
  if (location.pathname.includes("/questions/")) {
    currentPage = "individualQuestionPage";
  } else if (location.pathname.includes("/questions")) {
    currentPage = "allQuestionsPage";
  } else if (location.pathname.includes("/profile")) {
    currentPage = "profilePage";
  }

  const questionId = questionData.id;

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const deleteQuestionMutation = useMutation({
    mutationFn: () => deleteQuestion(questionId),
    onError: (error) => {
      console.log("deleteQuestionMutation onError");
      console.error(error);
    },
    onSuccess: () => {
      if (currentPage === "allQuestionsPage" || currentPage === "profilePage") {
        queryClient.refetchQueries(["questions"]);
      } else if (currentPage === "individualQuestionPage") {
        queryClient.removeQueries(["question", questionId]);
        navigate("/questions");
      }
    },
  });

  const handleDelete = async () => {
    deleteQuestionMutation.mutate();
  };

  return (
    <div>
      {/* Add the input field for search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />

      <SearchBar onSearchChange={handleSearchChange} />
      {/* Display your search results, e.g., using Result component */}
      {searchResult.map((result) => (
        <Result key={result.id} id={result.id} question={result.question} />
        // <div key={result.id}>{result.question}</div>
      ))}

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
            <Typography variant={"body2"}>| id: {questionData.id}</Typography>
            <Typography variant={"body2"}>
              | by userId: {questionData.userId}
            </Typography>
            <Typography variant={"body2"}>
              | Answers (
              {questionData?.answers?.length
                ? questionData.answers.length
                : "x"}
              )
            </Typography>
            <Typography variant={"body2"}>
              | Comments (
              {questionData?.answers?.comments?.length
                ? questionData?.answers?.comments?.length
                : "x"}
              )
            </Typography>
            <Box marginLeft={"auto"}>
              {questionData.userId === authenticatedUser.id && (
                <IconButton onClick={handleEdit} color="primary">
                  <EditOutlinedIcon />
                </IconButton>
              )}
              {questionData.userId === authenticatedUser.id && (
                <IconButton
                  onClick={() => handleDelete(questionData.id)}
                  color="primary">
                  <DeleteOutlineIcon />
                </IconButton>
              )}
            </Box>
          </Box>
          <Box mt={1}>
            {!showUpdateQuestionForm &&
              (currentPage === "allQuestionsPage" ||
                currentPage === "profilePage") && (
                <Link
                  component={RouterLink}
                  to={`/questions/${questionData.id}`}
                  color={consistentLinkColor}
                  variant="questionbody">
                  {questionData.question}
                </Link>
              )}
            {!showUpdateQuestionForm &&
              currentPage === "individualQuestionPage" && (
                <Typography variant={"questionbody"}>
                  {questionData.question}
                </Typography>
              )}
            {showUpdateQuestionForm && (
              <QuestionForm
                questionId={questionData.id}
                originalQuestion={questionData.question}
                setShowUpdateQuestionForm={setShowUpdateQuestionForm}
              />
            )}
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            gap={1}>
            <Box>
              {currentPage === "individualQuestionPage" && (
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
                updated {formatDate(questionData.updatedAt)}
              </Typography>
              <Typography variant={"body2"}>
                created {formatDate(questionData.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </div>
  );
};

export default Question;

// version original
// import { useContext, useState } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useLocation, useNavigate, Link as RouterLink } from "react-router-dom";
// import { Box, Typography, Button, Link, IconButton } from "@mui/material";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
// import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import { AuthContext } from "../context/AuthContext";
// import deleteQuestion from "../api/deleteQuestion";
// import formatDate from "../utils/formatDate";
// import {
//   consistentBorder,
//   consistentBorderRadius,
//   consistentBgColor,
//   consistentBoxShadow,
//   consistentBackdropFilter,
//   consistentLinkColor,
// } from "../themes/ConsistentStyles";
// import QuestionForm from "./QuestionForm";

// const Question = ({
//   questionData,
//   showAddAnswerForm,
//   setShowAddAnswerForm,
// }) => {
//   const { authenticatedUser } = useContext(AuthContext);

//   const [showUpdateQuestionForm, setShowUpdateQuestionForm] = useState(false);

//   const handleEdit = async () => {
//     setShowUpdateQuestionForm(true);
//   };

//   const location = useLocation();

//   let currentPage;
//   if (location.pathname.includes("/questions/")) {
//     currentPage = "individualQuestionPage";
//   } else if (location.pathname.includes("/questions")) {
//     currentPage = "allQuestionsPage";
//   } else if (location.pathname.includes("/profile")) {
//     currentPage = "profilePage";
//   }

//   const questionId = questionData.id;

//   const queryClient = useQueryClient();

//   const navigate = useNavigate();

//   const deleteQuestionMutation = useMutation({
//     mutationFn: () => deleteQuestion(questionId),
//     onError: (error) => {
//       console.log("deleteQuestionMutation onError");
//       console.error(error);
//     },
//     onSuccess: () => {
//       if (currentPage === "allQuestionsPage" || currentPage === "profilePage") {
//         queryClient.refetchQueries(["questions"]);
//       } else if (currentPage === "individualQuestionPage") {
//         queryClient.removeQueries(["question", questionId]);
//         navigate("/questions");
//       }
//     },
//   });

//   const handleDelete = async () => {
//     deleteQuestionMutation.mutate();
//   };

//   return (
//     <>
//       {questionData && (
//         <Box
//           display={"grid"}
//           p={2}
//           border={consistentBorder}
//           borderRadius={consistentBorderRadius}
//           bgcolor={consistentBgColor}
//           boxShadow={consistentBoxShadow}
//           sx={{
//             backdropFilter: consistentBackdropFilter,
//           }}>
//           <Box display={"flex"} alignItems={"center"} gap={0.5}>
//             <HelpOutlineOutlinedIcon fontSize={"medium"} color="primary" />
//             <Typography variant={"questiontitle"} color="primary">
//               Question
//             </Typography>
//             <Typography variant={"body2"}>| id: {questionData.id}</Typography>
//             <Typography variant={"body2"}>
//               | by userId: {questionData.userId}
//             </Typography>
//             <Typography variant={"body2"}>
//               | Answers (
//               {questionData?.answers?.length
//                 ? questionData.answers.length
//                 : "x"}
//               )
//             </Typography>
//             <Typography variant={"body2"}>
//               | Comments (
//               {questionData?.answers?.comments?.length
//                 ? questionData?.answers?.comments?.length
//                 : "x"}
//               )
//             </Typography>
//             <Box marginLeft={"auto"}>
//               {questionData.userId === authenticatedUser.id && (
//                 <IconButton onClick={handleEdit} color="primary">
//                   <EditOutlinedIcon />
//                 </IconButton>
//               )}
//               {questionData.userId === authenticatedUser.id && (
//                 <IconButton
//                   onClick={() => handleDelete(questionData.id)}
//                   color="primary">
//                   <DeleteOutlineIcon />
//                 </IconButton>
//               )}
//             </Box>
//           </Box>
//           <Box mt={1}>
//             {!showUpdateQuestionForm &&
//               (currentPage === "allQuestionsPage" ||
//                 currentPage === "profilePage") && (
//                 <Link
//                   component={RouterLink}
//                   to={`/questions/${questionData.id}`}
//                   color={consistentLinkColor}
//                   variant="questionbody">
//                   {questionData.question}
//                 </Link>
//               )}
//             {!showUpdateQuestionForm &&
//               currentPage === "individualQuestionPage" && (
//                 <Typography variant={"questionbody"}>
//                   {questionData.question}
//                 </Typography>
//               )}
//             {showUpdateQuestionForm && (
//               <QuestionForm
//                 questionId={questionData.id}
//                 originalQuestion={questionData.question}
//                 setShowUpdateQuestionForm={setShowUpdateQuestionForm}
//               />
//             )}
//           </Box>
//           <Box
//             display={"flex"}
//             justifyContent={"space-between"}
//             flexWrap={"wrap"}
//             gap={1}>
//             <Box>
//               {currentPage === "individualQuestionPage" && (
//                 <Box mt={1}>
//                   <Button
//                     variant="outlined"
//                     startIcon={<RateReviewOutlinedIcon />}
//                     onClick={() => setShowAddAnswerForm((prev) => !prev)}
//                     disabled={showAddAnswerForm}>
//                     Add an Answer
//                   </Button>
//                 </Box>
//               )}
//             </Box>
//             <Box
//               display={"flex"}
//               flexDirection={"column"}
//               justifyContent={"flex-end"}
//               alignItems={"flex-end"}>
//               <Typography variant={"body2"}>
//                 updated {formatDate(questionData.updatedAt)}
//               </Typography>
//               <Typography variant={"body2"}>
//                 created {formatDate(questionData.createdAt)}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </>
//   );
// };

// export default Question;
