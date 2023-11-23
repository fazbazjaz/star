import { database } from "../database/connection";
import { questions, users } from "../database/schema";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";

export const addQuestion = async (req: Request, res: Response) => {
  try {
    const user = req.customJWTPayload;

    if (!user) {
      return res.status(500).json({ error: "No User attached to the Request" });
    }

    const question = req.body.question;

    if (!question) {
      return res.status(400).json({ error: "No Question on the Request Body" });
    }

    const userGoogleId = user.google_id;

    const userQuery = await database
      .selectDistinct({ id: users.id })
      .from(users)
      .where(eq(users.google_id, userGoogleId))
      .limit(1);

    const userId = userQuery[0].id;

    const insertQuestionQuery = await database
      .insert(questions)
      .values({ userId, question })
      .returning();

    const data = insertQuestionQuery[0];

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const query = await database.select().from(questions);
    const data = query;
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = req.params.id;

    if (!questionId) {
      return res.status(400).json({ error: "No questionId provided" });
    }

    // Convert questionId to number
    const questionIdNumber = parseInt(questionId, 10);

    if (isNaN(questionIdNumber)) {
      return res.status(400).json({ error: "Invalid questionId format" });
    }

    await database.delete(questions).where(eq(questions.id, questionIdNumber));

    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};

// version delete with delete icon
// import { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";
// import { Box, Button, Typography, List, ListItem, IconButton } from "@mui/material";
// import DeleteIcon from "@mui/icons-material/Delete";

// const Questions = () => {
//   const [questions, setQuestions] = useState(null);

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
//         setQuestions(data);
//       } catch (error) {
//         console.error("Error fetching questions:", error.message);
//       }
//     };
//     fetchQuestions();
//   }, []);

//   const handleDelete = async (questionId) => {
//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_SERVER_URL}/api/questions/${questionId}`,
//         {
//           method: "DELETE",
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete question");
//       }

//       // Update the local state after successful deletion
//       setQuestions((prevQuestions) =>
//         prevQuestions.filter((question) => question.id !== questionId)
//       );
//     } catch (error) {
//       console.error("Error deleting question:", error.message);
//     }
//   };

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
//               <ListItem key={question.id}>
//                 {question.question}
//                 <IconButton
//                   aria-label="delete"
//                   onClick={() => handleDelete(question.id)}
//                 >
//                   <DeleteIcon />
//                 </IconButton>
//               </ListItem>
//             ))}
//         </List>
//       </Box>
//     </Box>
//   );
// };

// export default Questions;
