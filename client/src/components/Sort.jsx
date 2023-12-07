import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, MenuItem, Select, InputLabel } from "@mui/material";
import { SortContext } from "../context/SortContext";

const Sort = () => {
  const {
    sortQuestions,
    setSortQuestions,
    sortAnswers,
    setSortAnswers,
    sortProfileQuestions,
    setSortProfileQuestions,
  } = useContext(SortContext);

  const location = useLocation();

  let sortValue;
  let setSortFunction;

  if (location.pathname.includes("/questions/")) {
    sortValue = sortAnswers;
    setSortFunction = setSortAnswers;
  } else if (location.pathname.includes("/questions")) {
    sortValue = sortQuestions;
    setSortFunction = setSortQuestions;
  } else if (location.pathname.includes("/profile")) {
    sortValue = sortProfileQuestions;
    setSortFunction = setSortProfileQuestions;
  }

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
          Most Likes
        </MenuItem>
        <MenuItem value="recentlyCreated" sx={{ color: "black" }}>
          Recently Created
        </MenuItem>
        <MenuItem value="recentlyUpdated" sx={{ color: "black" }}>
          Recently Updated
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sort;
