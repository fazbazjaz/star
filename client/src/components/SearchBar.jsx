import { useState, useEffect } from "react";
import { Box, TextField, List, ListItem, ListItemText } from "@mui/material";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  useEffect(() => {
    const debouncedSearch = setTimeout(async () => {
      try {
        if (searchValue.trim() === "") {
          setSearchResult([]);
          return;
        }

        const response = await fetch(
          `${
            import.meta.env.VITE_SERVER_URL
          }/api/questions/search?q=${searchValue}`,
          { credentials: "include" }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setSearchResult(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }, 2000);

    return () => clearTimeout(debouncedSearch);
  }, [searchValue]);

  return (
    <Box>
      <TextField
        variant="outlined"
        sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      {searchResult.length > 0 && (
        <List>
          {searchResult.map((result) => (
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
