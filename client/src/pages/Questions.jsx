// version1
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// const Questions = () => {
//   const [questionsData, setQuestionsData] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_SERVER_URL}/api/questions`,
//           { credentials: "include" }
//         );
//         // console.log("fetchQuestions response:", response);

//         if (!response.ok) {
//           throw new Error("Failed to fetch questions");
//         }

//         const data = await response.json();
//         // console.log("fetchQuestions data:", data);

//         setQuestionsData(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error.message);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const questionsBackgroundImage = "/images/background-001.jpg";

//   return (
//     <Box
//       minHeight={"50vh"}
//       p={3}
//       color="white"
//       border={1}
//       sx={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${questionsBackgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//         overflow: "hidden",
//       }}>
//       <Button variant="contained" component={NavLink} to="/questions/add">
//         Add Question
//       </Button>
//       <Box marginTop={3}>
//         {questionsData && questionsData.length > 0 && (
//           <>
//             <Typography variant="h4" mb={2}>
//               All Questions ({questionsData.length})
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Question</TableCell>
//                     <TableCell>Created At</TableCell>
//                     <TableCell>Modified At</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {questionsData.map((question) => (
//                     <TableRow
//                       hover
//                       style={{ textDecoration: "none" }}
//                       key={question.id}
//                       component={NavLink}
//                       to={`/questions/${question.id}`}>
//                       <TableCell key={`${question.id}1`}>
//                         {question.id}
//                       </TableCell>
//                       <TableCell key={`${question.id}2`}>
//                         {question.question}
//                       </TableCell>
//                       <TableCell key={`${question.id}3`}>
//                         {new Date(question.createdAt).toLocaleString()}
//                       </TableCell>
//                       <TableCell key={`${question.id}4`}>
//                         {new Date(question.updatedAt).toLocaleString()}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Questions;

// version2 this one worked
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Box, Button, Typography, List, ListItem } from "@mui/material";

const Questions = () => {
  const [questions, setQuestions] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/questions`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }

        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };
    fetchQuestions();
  }, []);

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      // Remove the deleted question from the state
      setQuestions((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <Box marginY={5}>
      <Button variant="contained" component={NavLink} to="/questions/add">
        Add Question
      </Button>

      <Box marginTop={3}>
        <Typography variant="h4">List of Questions</Typography>
        <List>
          {questions &&
            questions.map((question) => (
              <ListItem key={question.id}>
                {question.question}
                <Button onClick={() => handleDelete(question.id)}>
                  Delete
                </Button>
              </ListItem>
            ))}
        </List>
      </Box>
    </Box>
  );
};

export default Questions;

// version3
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Typography,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from "@mui/material";

// const Questions = () => {
//   const [questionsData, setQuestionsData] = useState(null);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `${import.meta.env.VITE_SERVER_URL}/api/questions`,
//           { credentials: "include" }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch questions");
//         }

//         const data = await response.json();
//         setQuestionsData(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error.message);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/questions/${id}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete question");
//       }

//       // Fetch updated questions after deletion
//       fetchQuestions();
//     } catch (error) {
//       console.error("Error deleting question:", error.message);
//     }
//   };

//   const questionsBackgroundImage = "/images/background-001.jpg";

//   return (
//     <Box
//       minHeight={"50vh"}
//       p={3}
//       color="white"
//       border={1}
//       sx={{
//         backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${questionsBackgroundImage})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center center",
//         backgroundRepeat: "no-repeat",
//         overflow: "hidden",
//       }}>
//       <Button variant="contained" component={NavLink} to="/questions/add">
//         Add Question
//       </Button>
//       <Box marginTop={3}>
//         {questionsData && questionsData.length > 0 && (
//           <>
//             <Typography variant="h4" mb={2}>
//               All Questions ({questionsData.length})
//             </Typography>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>ID</TableCell>
//                     <TableCell>Question</TableCell>
//                     <TableCell>Created At</TableCell>
//                     <TableCell>Modified At</TableCell>
//                     <TableCell>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {questionsData.map((question) => (
//                     <TableRow
//                       hover
//                       style={{ textDecoration: "none" }}
//                       key={question.id}
//                       component={NavLink}
//                       to={`/questions/${question.id}`}>
//                       <TableCell key={`${question.id}1`}>
//                         {question.id}
//                       </TableCell>
//                       <TableCell key={`${question.id}2`}>
//                         {question.question}
//                       </TableCell>
//                       <TableCell key={`${question.id}3`}>
//                         {new Date(question.createdAt).toLocaleString()}
//                       </TableCell>
//                       <TableCell key={`${question.id}4`}>
//                         {new Date(question.updatedAt).toLocaleString()}
//                       </TableCell>
//                       <TableCell key={`${question.id}5`}>
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => handleDelete(question.id)}>
//                           Delete
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default Questions;
