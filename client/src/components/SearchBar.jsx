import { useState, useEffect } from "react";
import { Box, TextField, List, ListItem, ListItemText } from "@mui/material";
import getQuestionsBySearch from "../api/getQuestionsBySearch";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchPending, setIsSearchPending] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (!isSearchPending) {
      return;
    }

    const timerId = setTimeout(async () => {
      if (searchTerm.trim().length === 0) {
        setSearchResults([]);
        return;
      }
      const data = await getQuestionsBySearch(searchTerm);
      setSearchResults(data);
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isSearchPending, searchTerm]);

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
      {searchResults && searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => (
            <ListItem key={result.id}>
              <ListItemText primary={result.question} />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;
