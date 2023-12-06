// version6 my code
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
          // If search value is empty, clear results
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

    // Clear timeout on unmount or when searchValue changes
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

// version5 my code this code is white does not include list, listitem, list, listitemtext
// import { useState, useEffect } from "react";
// import { Box, TextField } from "@mui/material";

// const SearchBar = () => {
//   const [searchResult, setSearchResult] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setSearchValue(value);
//   };

//   useEffect(() => {
//     // Create a debounced search function to avoid making too many requests in a short time
//     const debouncedSearch = setTimeout(async () => {
//       try {
//         // Check if the search value is empty, and clear results if so
//         if (searchValue.trim() === "") {
//           setSearchResult([]);
//           return;
//         }

//         const response = await fetch(
//           `${
//             import.meta.env.VITE_SERVER_URL
//           }/api/questions/search?q=${searchValue}`,
//           { credentials: "include" }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setSearchResult(data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     }, 2000);

//     // Clear timeout on unmount or when searchValue changes
//     return () => clearTimeout(debouncedSearch);
//   }, [searchValue, searchResult]);

//   return (
//     <Box>
//       <TextField
//         variant="outlined"
//         sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
//         type="text"
//         placeholder="Search..."
//         value={searchValue}
//         onChange={handleSearchChange}
//       />
//       {searchResult &&
//         searchResult.length > 0 &&
//         searchResult.map((result) => (
//           <Box key={result.id}>{result.question}</Box>
//         ))}
//     </Box>
//   );
// };

// export default SearchBar;

// version4 my code attempts to solve debounce issues. does not display my searches
// import { useState, useEffect } from "react";
// import { Box, TextField } from "@mui/material";

// const SearchBar = () => {
//   const [searchResult, setSearchResult] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const handleSearchChange = (event) => {
//     const { value } = event.target;
//     setSearchValue(value);
//   };

//   useEffect(() => {
//     const debouncedSearch = setTimeout(async () => {
//       try {
//         if (searchValue.trim() === "") {
//           // If search value is empty, clear results
//           setSearchResult([]);
//           return;
//         }

//         const response = await fetch(
//           `${
//             import.meta.env.VITE_SERVER_URL
//           }/api/questions/search?q=${searchValue}`,
//           { credentials: "include" }
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setSearchResult(data);
//       } catch (error) {
//         console.error("Error fetching search results:", error);
//       }
//     }, 2000);

//     // Clear timeout on unmount or when searchValue changes
//     return () => clearTimeout(debouncedSearch);
//   }, [searchValue]);

//   return (
//     <Box>
//       <TextField
//         variant="outlined"
//         sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
//         type="text"
//         placeholder="Search..."
//         value={searchValue}
//         onChange={handleSearchChange}
//       />
//       {searchResult &&
//         searchResult.length > 0 &&
//         searchResult.map((result) => (
//           <Box key={result.id}>{result.question}</Box>
//         ))}
//     </Box>
//   );
// };

// export default SearchBar;

// version3 my code this version works but gives multiple queries during 2 seconds
// import { useState, useEffect } from "react";
// import { Box, TextField } from "@mui/material";

// // Debounce function used to be below export default SearchBar.
// function debounce(func, delay) {
//   let timeoutId;
//   return function () {
//     const args = arguments;
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => func.apply(null, args), delay);
//   };
// }

// const SearchBar = () => {
//   const [searchResult, setSearchResult] = useState([]);
//   const [searchValue, setSearchValue] = useState("");

//   const handleSearchChange = (event) => {
//     console.log("handleSearchChange RAN");
//     const { value } = event.target;
//     console.log("handleSearchChange value", value);
//     setSearchValue(value);
//   };

//   useEffect(() => {
//     const debouncedSearch = debounce(async () => {
//       try {
//         console.log("debouncedSearch RAN");
//         // here you have to make a request to the backend
//         // on a route you have created
//         // give it the search term
//         const response = await fetch(
//           `${
//             import.meta.env.VITE_SERVER_URL
//           }/api/questions/search?q=${searchValue}`,
//           { credentials: "include" }
//         );
//         // get back all questions that contain that search term
//         const data = await response.json();
//         // set them into React state "searchResults"
//         setSearchResult(data);
//       } catch (error) {
//         console.error(error);
//       }
//     }, 2000);

//     debouncedSearch();

//     return () => clearTimeout(debouncedSearch);
//   }, [searchValue]);

//   return (
//     <Box>
//       {/* Add the input field for search */}
//       <TextField
//         variant="outlined"
//         sx={{ bgcolor: "rgba(255,255,255,0.8)" }}
//         type="text"
//         placeholder="Search..."
//         value={searchValue}
//         onChange={handleSearchChange}
//       />
//       {/* Display your search results, e.g., using Result component */}
//       {searchResult &&
//         searchResult.length > 0 &&
//         searchResult.map((result) => (
//           <Box key={result.id}>{result.question}</Box>
//         ))}
//     </Box>
//   );
// };

// export default SearchBar;

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
