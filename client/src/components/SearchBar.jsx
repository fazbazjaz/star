import { useState, useEffect, useCallback } from "react";
import { FormControl, TextField } from "@mui/material";
import {
  consistentBgColor,
  consistentBorder,
} from "../themes/ConsistentStyles";

const SearchBar = ({ setDebouncedSearchTerm }) => {
  // console.log("🔎🖌️ SearchBar RENDERED");

  const [searchTerm, setSearchTerm] = useState("");
  // console.log(`🔎 SearchBar searchTerm = ${searchTerm}`);

  const [isSearchPending, setIsSearchPending] = useState(false);
  // console.log(`🔎 SearchBar isSearchPending = ${isSearchPending}`);

  const handleSearch = useCallback(
    (event) => {
      // console.log("🔎🤚 SearchBar handleSearch RAN");
      const value = event.target.value;
      // console.log(`🔎🤚  SearchBar handleSearch value = ${value}`);
      setSearchTerm(value);
      console.log(`🔎🤚  SearchBar handleSearch setIsSearchPending = "true"`);
      setIsSearchPending(true);
    },
    [setIsSearchPending]
  );

  useEffect(() => {
    // console.log("🔎🔃 SearchBar useEffect RAN");

    // IS THIS THE RIGHT CONDITION ?
    if (searchTerm.trim()?.length === 0 && !isSearchPending) {
      console.log("🔎🔃 SearchBar useEffect IF BLOCK 1️⃣");

      // console.log(
      //   `🔎🔃🟠 SearchBar useEffect SETTING setDebouncedSearchTerm = ""`
      // );
      // setDebouncedSearchTerm("");

      return;
    }

    const timerId = setTimeout(async () => {
      console.log("🔎🔃 SearchBar useEffect NEXT BLOCK 2️⃣");

      console.log(
        `🔎🔃🟢 SearchBar useEffect SETTING setDebounceSearchTerm = ${searchTerm}`
      );
      setDebouncedSearchTerm(searchTerm);

      console.log(
        `🔎🔃🟢 SearchBar useEffect SETTING setIsSearchPending = ${false} `
      );
      setIsSearchPending(false);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [searchTerm, setDebouncedSearchTerm, setIsSearchPending]);

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
        // inputRef={(input) => input && input.focus()}
      />
    </FormControl>
  );
};

export default SearchBar;
