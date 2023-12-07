import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { SortContext } from "../context/SortContext";

const Sort = () => {
  const { sortQuestions, setSortQuestions, sortAnswers, setSortAnswers } =
    useContext(SortContext);

  const location = useLocation();

  let currentPage;

  if (location.pathname.includes("/questions/")) {
    currentPage = "individualQuestionPage";
  } else if (location.pathname.includes("/questions")) {
    currentPage = "allQuestionsPage";
  } else if (location.pathname.includes("/profile")) {
    currentPage = "profilePage";
  }

  console.log("Sort Component currentPage:", currentPage);

  const sortValue =
    currentPage === "individualQuestionPage" ? sortAnswers : sortQuestions;

  console.log("Sort Component sortValue:", sortValue);

  const setSortFunction =
    currentPage === "individualQuestionPage"
      ? setSortAnswers
      : setSortQuestions;

  return (
    <FormControl variant="filled" size="small">
      <InputLabel id="sort" label="sort" sx={{ color: "white" }}>
        Sort
      </InputLabel>
      <Select
        id="sort"
        value={sortValue}
        label="Sort"
        onChange={(event) => setSortFunction(event.target.value)}>
        <MenuItem value="popular" sx={{ color: "black" }}>
          Most Upvoted
        </MenuItem>
        <MenuItem value="recentlyCreated" sx={{ color: "black" }}>
          Recently Added
        </MenuItem>
        <MenuItem value="recentlyUpdated" sx={{ color: "black" }}>
          Recently Updated
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
