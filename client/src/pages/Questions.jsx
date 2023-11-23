// version working for list of questions
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Box, Button, Typography, List, ListItem } from "@mui/material";

// const Questions = () => {
//   const [questions, setQuestions] = useState(null);

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

//         setQuestions(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error.message);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   return (
//     <Box marginY={5}>
//       <Button variant="contained" component={NavLink} to="/questions/add">
//         Add Question
//       </Button>

//       <Box marginTop={3}>
//         <Typography variant="h4">List of Questions</Typography>
//         <List>
//           {questions &&
//             questions.map((question) => (
//               <ListItem key={question.id}>{question.question}</ListItem>
//             ))}
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default Questions;

// test version for delete question
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
