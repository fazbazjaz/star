import { useState, useEffect, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Box, TextField } from "@mui/material";
import { SortContext } from "../context/SortContext";
import getQuestionsBySearch from "../api/getQuestionsBySearch";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);

  const { sortQuestions } = useContext(SortContext);

  const searchQuery = useQuery({
    queryKey: ["questions", sortQuestions, searchTerm],
    queryFn: () => getQuestionsBySearch(searchTerm, sortQuestions),
    onSuccess: () => {},
  });

  useEffect(() => {
    if (!isSearchPending) {
      return;
    }

    const timerId = setTimeout(async () => {
      if (searchTerm.trim().length === 0) {
        return;
      }
      searchMutation.mutate();
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isSearchPending, searchTerm, searchMutation]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsSearchPending(true);
  };

  return (
    <Box component={"form"}>
      <TextField
        type="text"
        variant={"outlined"}
        size={"small"}
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          bgcolor: consistentBgColor,
          borderRadius: 1,
          border: consistentBorder,
        }}
      />
    </Box>
  );
};

export default SearchBar;
