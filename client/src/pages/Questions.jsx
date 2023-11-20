import { Box, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Questions = () => {
  return (
    <Box marginY={5}>
      <Button variant="contained" component={NavLink} to="/questions/add">
        Add Question
      </Button>
    </Box>
  );
};

export default Questions;
