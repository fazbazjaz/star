import { useState, useEffect, useCallback } from "react";
import { FormControl, TextField } from "@mui/material";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";

const Search = ({ setDebouncedSearchTerm }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const [isSearchPending, setIsSearchPending] = useState(false);

  const handleSearch = useCallback(
    (event) => {
      const value = event.target.value;
      setSearchTerm(value);
      setIsSearchPending(true);
    },
    [setIsSearchPending]
  );

  useEffect(() => {
    if (searchTerm.trim()?.length === 0 && !isSearchPending) {
      return;
    }

    const timerId = setTimeout(async () => {
      setDebouncedSearchTerm(searchTerm);
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm, setDebouncedSearchTerm, isSearchPending, setIsSearchPending]);

  return (
    <FormControl sx={{ width: "200px" }}>
      <TextField
        type="text"
        variant={"outlined"}
        size={"small"}
        placeholder="Search Questions..."
        value={searchTerm}
        onChange={handleSearch}
        sx={{
          bgcolor: consistentBgColor,
          borderRadius: 1,
          border: consistentBorder,
        }}
        // inputRef={(input) => input && input.focus()}
      />
    </FormControl>
  );
};

export default Search;
