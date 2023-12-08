import { useEffect } from "react";
import { FormControl, TextField } from "@mui/material";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  isSearchPending,
  setIsSearchPending,
}) => {
  useEffect(() => {
    if (!isSearchPending) {
      return;
    }
    const timerId = setTimeout(async () => {
      if (searchTerm.trim()?.length === 0) {
        return;
      }
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isSearchPending, searchTerm, setIsSearchPending]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    setIsSearchPending(true);
  };

  return (
    <FormControl>
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
        inputRef={(input) => input && input.focus()}
      />
    </FormControl>
  );
};

export default SearchBar;
