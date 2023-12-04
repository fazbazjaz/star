// version3
import { useState, useEffect } from "react";
import { debouncedSearchQuestions } from "../questions";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const debouncedSearch = debounce(async () => {
      try {
        const result = await debouncedSearchQuestions(searchValue);
        setSearchResult(result);
      } catch (error) {
        console.error(error);
      }
    }, 1000);

    debouncedSearch();

    return () => clearTimeout(debouncedSearch);
  }, [searchValue]);

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <div>
      {/* Add the input field for search */}
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      {/* Display your search results, e.g., using Result component */}
      {searchResult.map((result) => (
        <div key={result.id}>{result.question}</div>
      ))}
    </div>
  );
};

// Debounce function used to be below export default SearchBar.
function debounce(func, delay) {
  let timeoutId;
  return function () {
    const args = arguments;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(null, args), delay);
  };
}

export default SearchBar;

// version2 my code
// import { useState, useEffect } from "react";
// // import Question from "./Question"; // Replace with the correct path

// // Import your debouncedSearchQuestions function
// import { debouncedSearch } from "../questions";

// const Question = () => {
//   const [searchResult, setSearchResult] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   useEffect(() => {
//     // Define a debounced function to handle the search
//     const debouncedSearch = debounce(async () => {
//       try {
//         const result = await debouncedSearch(searchValue);
//         setSearchResult(result);
//       } catch (error) {
//         console.error(error);
//       }
//     }, 1000);

//     // Call the debounced function when the searchValue changes
//     debouncedSearch();

//     // Cleanup function to clear the timeout on unmount or when searchValue changes
//     return () => clearTimeout(debouncedSearch);
//   }, [searchValue]);

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setSearchValue(value);
//   };

//   return (
//     <div>
//       <SearchBar onSearchChange={handleSearchChange} />
//       {/* Display your search results, e.g., using Result component */}
//       {searchResult.map((result) => (
//         // Render your search result components here
//         // Example: <Result key={result.id} {...result} />
//         <div key={result.id}>{result.question}</div>
//       ))}
//       {/* Add your existing Question component code here */}
//     </div>
//   );
// };

// export default SearchBar;

// // Debounce function
// function debounce(func, delay) {
//   let timeoutId;
//   return function () {
//     const args = arguments;
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// }

// version1 my code
// import { useState } from "react";

// // import { debouncedSearchQuestions } from "../helpers/questions";
// import { debouncedSearchQuestions } from "../questions";

// const Question = () => {
//   const [searchResult, setSearchResult] = useState([]);

//   const handleSearch = async (searchValue) => {
//     try {
//       const result = await debouncedSearchQuestions(searchValue);
//       setSearchResult(result);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <SearchBar onSearch={handleSearch} />
//       {/* Display your search results, e.g., using Result component */}
//       {searchResult.map((result) => (
//         // Render your search result components here
//         // Example: <Result key={result.id} {...result} />
//         <div key={result.id}>{result.question}</div>
//       ))}
//       {/* Add your existing Question component code here */}
//     </div>
//   );
// };

// export default SearchBar;

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
