// version pasted in from internet to modify

import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hideSuggestions, setHideSuggestions] = useState(true);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `https://dummyjson.com/products/search?q=${value}`
      );

      setSuggestions(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (value.trim() === "") {
      setHideSuggestions(true);
      return;
    }

    const timer = setTimeout(() => {
      fetchData();
      setHideSuggestions(false);
    }, 1000); // Adjust the delay as needed

    return () => clearTimeout(timer);
  }, [value]);

  const handleSelect = (title) => {
    setValue(title);
    setHideSuggestions(true);
    onSearch(title); // Pass the selected value to the parent component
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        className={styles.textbox}
        placeholder="Search data..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div
        className={`${styles.suggestions} ${hideSuggestions && styles.hidden}`}>
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.title}
            className={styles.suggestion}
            onClick={() => handleSelect(suggestion.title)}>
            {suggestion.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
