// version2 with tablerow includes my delete function
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Questions = () => {
  const [questionsData, setQuestionsData] = useState(null);

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
        setQuestionsData(data);
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };
    fetchQuestions();
  }, []);

  const questionsBackgroundImage = "/images/background-001.jpg";

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

      setQuestionsData((prevQuestions) =>
        prevQuestions.filter((q) => q.id !== questionId)
      );
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  };

  return (
    <Box
      minHeight={"50vh"}
      p={3}
      color="white"
      border={1}
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${questionsBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}>
      <Button variant="contained" component={NavLink} to="/questions/add">
        Add Question
      </Button>
      <Box marginTop={3}>
        {questionsData && questionsData.length > 0 && (
          <>
            <Typography variant="h4" mb={2}>
              All Questions ({questionsData.length})
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Question</TableCell>
                    <TableCell>Created At</TableCell>
                    <TableCell>Modified At</TableCell>
                    <TableCell>Action</TableCell> {/* New column for action */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {questionsData.map((question) => (
                    <TableRow
                      hover
                      style={{ textDecoration: "none" }}
                      key={question.id}
                      component={NavLink}
                      to={`/questions/${question.id}`}>
                      <TableCell>{question.id}</TableCell>
                      <TableCell>{question.question}</TableCell>
                      <TableCell>
                        {new Date(question.createdAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        {new Date(question.updatedAt).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => handleDelete(question.id)}
                          color="secondary">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Questions;
