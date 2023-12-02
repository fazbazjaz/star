// version1 my code
import { useState } from "react";
import SearchBar from "./SearchBar";
// import { debouncedSearchQuestions } from "../helpers/questions";
import { debouncedSearchQuestions } from "../questions";

const Question = () => {
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (searchValue) => {
    try {
      const result = await debouncedSearchQuestions(searchValue);
      setSearchResult(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {/* Display your search results, e.g., using Result component */}
      {searchResult.map((result) => (
        // Render your search result components here
        // Example: <Result key={result.id} {...result} />
        <div key={result.id}>{result.question}</div>
      ))}
      {/* Add your existing Question component code here */}
    </div>
  );
};

export default Question;

// version pasted in from internet to modify
// import { useState, useEffect } from "react";
// import axios from "axios";
// import styles from "./SearchBar.module.css";

// const SearchBar = ({ onSearch }) => {
//   const [value, setValue] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [hideSuggestions, setHideSuggestions] = useState(true);

//   const fetchData = async () => {
//     try {
//       const { data } = await axios.get(
//         `https://dummyjson.com/products/search?q=${value}`
//       );

//       setSuggestions(data.products);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (value.trim() === "") {
//       setHideSuggestions(true);
//       return;
//     }

//     const timer = setTimeout(() => {
//       fetchData();
//       setHideSuggestions(false);
//     }, 1000); // Adjust the delay as needed

//     return () => clearTimeout(timer);
//   }, [value]);

//   const handleSelect = (title) => {
//     setValue(title);
//     setHideSuggestions(true);
//     onSearch(title); // Pass the selected value to the parent component
//   };

//   return (
//     <div className={styles.container}>
//       <input
//         type="text"
//         className={styles.textbox}
//         placeholder="Search data..."
//         value={value}
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <div
//         className={`${styles.suggestions} ${hideSuggestions && styles.hidden}`}>
//         {suggestions.map((suggestion) => (
//           <div
//             key={suggestion.title}
//             className={styles.suggestion}
//             onClick={() => handleSelect(suggestion.title)}>
//             {suggestion.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;
